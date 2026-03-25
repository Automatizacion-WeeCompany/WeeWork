// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::Local;
use serde::Serialize;
use sqlx::sqlite::SqlitePool;
use std::collections::HashSet;
use std::fs;
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use std::path::Path;
use std::path::PathBuf;
use std::process::Command;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use tauri::Emitter;
use tauri::Manager;
use tauri::Window;

fn validate_project_name(name: &str) -> Result<(), String> {
    if name.is_empty() || name.len() > 80 {
        return Err("Nombre de proyecto inválido".into());
    }
    if !name
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
    {
        return Err("El nombre solo puede contener letras, números, guion y guion bajo".into());
    }
    Ok(())
}

struct TestProcess {
    pid: Arc<Mutex<Option<u32>>>,
    current_project_path: Arc<Mutex<Option<std::path::PathBuf>>>,
    is_cancelled: Arc<AtomicBool>,
}

#[derive(Serialize)]
struct Suite {
    suite: String,
    tests: Vec<TestInfo>,
}

#[derive(serde::Serialize)]
struct TestInfo {
    id: String,
    name: String,
}

#[derive(serde::Serialize)]
struct HealthStatus {
    node_installed: bool,
    node_modules_exists: bool,
    playwright_browsers_installed: bool,
    project_ready: bool,
}

#[derive(serde::Serialize)]
struct TestExecutionRecord {
    id: i32,
    project_name: String,
    test_names: String,
    execution_date: String,
    total_tests: i32,
    passed: i32,
    failed: i32,
    duration: f64,
    report_path: Option<String>,
}

// --- FUNCIÓN CENTRALIZADA PARA LA RUTA DE LA DB ---
// Esto asegura que la DB siempre se cree en Documentos con permisos totales
fn get_db_url(app_handle: &tauri::AppHandle) -> Result<String, String> {
    let mut path = app_handle
        .path()
        .document_dir()
        .map_err(|e| e.to_string())?;
    path.push("QA_Automation_Workspace");

    if !path.exists() {
        std::fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    }

    path.push("test_tool.db");
    Ok(format!("sqlite://{}", path.to_string_lossy()))
}

#[tauri::command]
async fn get_test_history(
    app_handle: tauri::AppHandle,
) -> Result<Vec<TestExecutionRecord>, String> {
    use sqlx::Row;

    let db_url = get_db_url(&app_handle)?;
    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| format!("Error de conexión: {}", e))?;

    let rows = sqlx::query("SELECT id, project_name, report_path, test_names, execution_date, total_tests, passed, failed, duration FROM test_history ORDER BY id DESC")
        .fetch_all(&pool)
        .await
        .map_err(|e| format!("Error en query: {}", e))?;

    let history = rows
        .into_iter()
        .map(|row| TestExecutionRecord {
            id: row.try_get("id").unwrap_or(0),
            project_name: row.try_get("project_name").unwrap_or_default(),
            test_names: row
                .try_get("test_names")
                .unwrap_or_else(|_| "N/A".to_string()),
            execution_date: row.try_get("execution_date").unwrap_or_default(),
            total_tests: row.try_get("total_tests").unwrap_or(0),
            passed: row.try_get("passed").unwrap_or(0),
            failed: row.try_get("failed").unwrap_or(0),
            duration: row.try_get("duration").unwrap_or(0.0),
            report_path: row.try_get("report_path").ok(),
        })
        .collect();

    pool.close().await;
    Ok(history)
}

#[tauri::command]
async fn save_test_execution(
    app_handle: tauri::AppHandle,
    project_name: String,
    project_path: String,
    test_names: String,
    total_tests: i32,
    passed: i32,
    failed: i32,
    duration: f64,
) -> Result<(), String> {
    let mut reports_storage = app_handle
        .path()
        .document_dir()
        .map_err(|e| e.to_string())?;
    reports_storage.push("QA_Automation_Workspace");
    reports_storage.push("history_reports");

    if !reports_storage.exists() {
        fs::create_dir_all(&reports_storage).map_err(|e| e.to_string())?;
    }

    let source_report = Path::new(&project_path).join("playwright-report");
    let timestamp = chrono::Local::now().format("%Y%m%d_%H%M%S").to_string();
    let dest_folder_name = format!("{}_{}", project_name.replace(" ", "_"), timestamp);
    let dest_report = reports_storage.join(&dest_folder_name);

    let mut saved_report_path: Option<String> = None;

    if source_report.exists() {
        let dest_clone = dest_report.clone();
        let copy_result = tauri::async_runtime::spawn_blocking(move || copy_dir_all(&source_report, &dest_clone))
            .await
            .unwrap_or_else(|e| Err(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())));

        match copy_result {
            Ok(_) => {
                let final_html = dest_report.join("index.html");
                saved_report_path = Some(final_html.to_string_lossy().to_string());
            }
            Err(e) => println!("No se pudo copiar el reporte: {}", e),
        }
    }

    let db_url = get_db_url(&app_handle)?;
    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| e.to_string())?;

    let _ = sqlx::query("ALTER TABLE test_history ADD COLUMN report_path TEXT")
        .execute(&pool)
        .await;

    let fecha_actual = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let query = "
        INSERT INTO test_history (project_name, test_names, execution_date, total_tests, passed, failed, duration, report_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";

    sqlx::query(query)
        .bind(project_name)
        .bind(test_names)
        .bind(fecha_actual)
        .bind(total_tests)
        .bind(passed)
        .bind(failed)
        .bind(duration)
        .bind(saved_report_path)
        .execute(&pool)
        .await
        .map_err(|e| e.to_string())?;

    pool.close().await;
    Ok(())
}

fn copy_dir_all(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> std::io::Result<()> {
    fs::create_dir_all(&dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir_all(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }
    Ok(())
}

#[tauri::command]
async fn open_history_report(report_path: String) -> Result<(), String> {
    let path = Path::new(&report_path);

    if path.exists() {
        #[cfg(target_os = "windows")]
        {
            let mut cmd = Command::new("cmd");
            cmd.args(["/C", "start", "", &report_path]);
            use std::os::windows::process::CommandExt;
            cmd.creation_flags(0x08000000);
            cmd.spawn().map_err(|e| e.to_string())?;
        }

        #[cfg(not(target_os = "windows"))]
        {
            open::that(report_path).map_err(|e| e.to_string())?;
        }

        Ok(())
    } else {
        Err("El archivo de reporte ya no existe.".to_string())
    }
}

#[tauri::command]
async fn check_environment(project_path: String) -> Result<HealthStatus, String> {
    let path = Path::new(&project_path);

    // Node check (Rápido)
    let mut node_cmd = Command::new("node");
    node_cmd.arg("-v");
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        node_cmd.creation_flags(0x08000000);
    }
    let node_installed = node_cmd.output().is_ok();

    // node_modules check (Rápido)
    let node_modules_exists = path.join("node_modules").exists();

    // Playwright check (Rápido: solo verificamos que el ejecutable esté ahí)
    let playwright_bin = if cfg!(target_os = "windows") {
        path.join("node_modules")
            .join(".bin")
            .join("playwright.cmd")
    } else {
        path.join("node_modules").join(".bin").join("playwright")
    };

    let browsers_installed = playwright_bin.exists();

    Ok(HealthStatus {
        node_installed,
        node_modules_exists,
        playwright_browsers_installed: browsers_installed,
        project_ready: node_installed && node_modules_exists && browsers_installed,
    })
}

#[tauri::command]
fn repair_environment(window: tauri::Window, project_path: String) -> Result<(), String> {
    std::thread::spawn(move || {
        let _ = window.emit("repair-status", "Instalando dependencias (npm install)...");

        let npm_cmd = if cfg!(target_os = "windows") { "npm.cmd" } else { "npm" };
        let mut npm_proc = Command::new(npm_cmd);
        npm_proc.arg("install").current_dir(&project_path);

        #[cfg(target_os = "windows")]
        {
            use std::os::windows::process::CommandExt;
            npm_proc.creation_flags(0x08000000);
        }
        let _ = npm_proc.status();

        let _ = window.emit("repair-status", "Instalando navegadores de Playwright...");

        let playwright_bin = if cfg!(target_os = "windows") {
            "node_modules\\.bin\\playwright.cmd"
        } else {
            "./node_modules/.bin/playwright"
        };
        let mut pw_proc = Command::new(playwright_bin);
        pw_proc.arg("install").current_dir(&project_path);

        #[cfg(target_os = "windows")]
        {
            use std::os::windows::process::CommandExt;
            pw_proc.creation_flags(0x08000000);
        }
        let _ = pw_proc.status();

        let _ = window.emit("repair-finished", "Entorno reparado con éxito");
    });
    Ok(())
}

#[tauri::command]
async fn list_playwright_tests(project_path: String) -> Result<Vec<Suite>, String> {
    println!("📂 Escaneando tests en: {}", project_path);

    let path = std::path::Path::new(&project_path);
    let playwright_bin = if cfg!(target_os = "windows") {
        path.join("node_modules")
            .join(".bin")
            .join("playwright.cmd")
    } else {
        path.join("node_modules").join(".bin").join("playwright")
    };

    if !playwright_bin.exists() {
        return Err(
            "No se encontró el binario de Playwright. Ejecuta la reparación de entorno."
                .to_string(),
        );
    }

    let mut cmd = std::process::Command::new(&playwright_bin);
    cmd.args(["test", "--list"]).current_dir(&project_path);

    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(0x08000000);
    }

    let output = cmd
        .output()
        .map_err(|e| format!("Fallo al ejecutar escaneo: {}", e))?;

    if !output.status.success() {
        let err_msg = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Error de Playwright: {}", err_msg));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);

    use std::collections::{HashMap, HashSet};
    let mut suites_map: HashMap<String, HashSet<String>> = HashMap::new();

    for line in stdout.lines() {
        let line = line.trim();
        // Playwright --list usa el carácter '›' para separar niveles
        if line.contains('›') {
            let parts: Vec<&str> = line.split('›').map(|s| s.trim()).collect();

            if parts.len() >= 2 {
                // El último elemento es siempre el nombre del test
                let test_name = parts.last().unwrap().to_string();

                // Intentamos tomar la penúltima parte como el nombre de la "Suite" (o el archivo)
                let mut suite_name = parts[parts.len() - 2].to_string();

                // Si el nombre de la suite contiene ":", es probablemente un archivo con línea (ej: login.spec.ts:10)
                // Lo limpiamos para que se vea bien en la UI
                if suite_name.contains(':') && suite_name.contains(".spec.") {
                    suite_name = suite_name
                        .split(':')
                        .next()
                        .unwrap_or(&suite_name)
                        .to_string();
                }

                suites_map.entry(suite_name).or_default().insert(test_name);
            }
        }
    }

    let suites: Vec<Suite> = suites_map
        .into_iter()
        .map(|(suite, tests)| Suite {
            suite,
            tests: tests
                .into_iter()
                .map(|name| TestInfo {
                    id: name.clone(),
                    name,
                })
                .collect(),
        })
        .collect();

    if suites.is_empty() {
        return Err(
            "No se encontraron tests. Asegúrate de tener archivos .spec.ts o .spec.js".to_string(),
        );
    }

    println!(
        "✅ Escaneo finalizado. {} suites encontradas.",
        suites.len()
    );
    Ok(suites)
}

#[tauri::command]
fn run_playwright_tests(
    window: Window,
    project_path: String,
    grep: String,
    browser: String,
    state: tauri::State<TestProcess>,
) -> Result<(), String> {
    use std::fs;

    let project_path_buf = std::path::PathBuf::from(&project_path);

    if !project_path_buf.exists() {
        return Err(format!("No se encontró la carpeta: {}", project_path));
    }

    let results_path = project_path_buf.join("results.json");
    let report_dir = project_path_buf.join("playwright-report");

    if results_path.exists() {
        let _ = fs::remove_file(&results_path);
    }
    if report_dir.exists() {
        let _ = fs::remove_dir_all(&report_dir);
    }

    // Validación básica para evitar shells y navegadores no soportados
    let browser_norm = browser.to_lowercase();
    let allowed = ["chromium", "firefox", "webkit"];
    if !allowed.contains(&browser_norm.as_str()) {
        return Err("Navegador no soportado".to_string());
    }

    // Evitar patrones peligrosos en grep; se usa Command::new (sin shell) pero limitamos longitud.
    if grep.len() > 200 {
        return Err("Patrón de grep demasiado largo".into());
    }

    let playwright_bin = if cfg!(target_os = "windows") {
        std::path::Path::new("node_modules")
            .join(".bin")
            .join("playwright.cmd")
    } else {
        std::path::Path::new("node_modules")
            .join(".bin")
            .join("playwright")
    };

    {
        let mut guard = state.current_project_path.lock().unwrap();
        *guard = Some(project_path_buf.clone());
    }

    // Reiniciamos la bandera de cancelación al empezar una nueva prueba
    state.is_cancelled.store(false, Ordering::SeqCst);

    let pid_state = state.pid.clone();
    let is_cancelled_state = state.is_cancelled.clone(); // Clonamos para el hilo
    let window_clone = window.clone();
    let browser_arg = browser_norm.clone();
    let grep_arg = grep.clone();
    let project_dir = project_path.clone();

    std::thread::spawn(move || {
        let mut command = std::process::Command::new(&playwright_bin);

        command
            .args([
                "test",
                "--project",
                &browser_arg,
                "--grep",
                &grep_arg,
                "--reporter=json,html",
            ])
            .env("PLAYWRIGHT_JSON_OUTPUT_NAME", "results.json")
            .env("PLAYWRIGHT_HTML_OPEN", "never")
            .env("CI", "true")
            .current_dir(&project_dir)
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped());

        #[cfg(target_os = "windows")]
        {
            use std::os::windows::process::CommandExt;
            command.creation_flags(0x08000000);
        }

        let mut child = match command.spawn() {
            Ok(child) => child,
            Err(e) => {
                let _ = window_clone.emit("test-error", format!("Error al iniciar: {}", e));
                return;
            }
        };

        {
            let mut guard = pid_state.lock().unwrap();
            *guard = Some(child.id());
        }

        let stdout = child.stdout.take();
        let win_out = window_clone.clone();
        std::thread::spawn(move || {
            if let Some(stdout) = stdout {
                let reader = std::io::BufReader::new(stdout);
                for line in std::io::BufRead::lines(reader).flatten() {
                    let _ = win_out.emit("test-output", line);
                }
            }
        });

        // Esperamos a que el proceso termine (ya sea natural o por taskkill)
        let _ = child.wait();

        {
            let mut guard = pid_state.lock().unwrap();
            *guard = None;
        }

        std::thread::sleep(std::time::Duration::from_millis(1000));

        // --- LA MAGIA: VERIFICAMOS SI FUE CANCELADO ---
        if is_cancelled_state.load(Ordering::SeqCst) {
            println!("Proceso cancelado, ignorando resultados.");
            // Emitimos un evento especial o simplemente no emitimos "test-finished"
            let _ = window_clone.emit("test-cancelled", "");
            return; // Salimos del hilo prematuramente
        }

        // Si no fue cancelado, procesamos normalmente
        if results_path.exists() {
            if let Ok(json) = fs::read_to_string(&results_path) {
                let _ = window_clone.emit("test-finished", json);
            }
        } else {
            let _ = window_clone.emit("test-finished", "");
        }
    });

    Ok(())
}

#[tauri::command]
fn list_projects(app_handle: tauri::AppHandle) -> Result<Vec<(String, String)>, String> {
    let mut projects_dir = app_handle
        .path()
        .document_dir()
        .map_err(|e| format!("Error: {}", e))?;
    projects_dir.push("QA_Automation_Workspace");

    if !projects_dir.exists() {
        fs::create_dir_all(&projects_dir).map_err(|e| e.to_string())?;
        return Ok(Vec::new());
    }

    let mut projects = Vec::new();
    let entries = fs::read_dir(&projects_dir).map_err(|e| format!("Error: {}", e))?;

    for entry in entries.flatten() {
        let path = entry.path();
        if path.is_dir() {
            let package_json = path.join("package.json");
            if package_json.exists() {
                if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
                    projects.push((name.to_string(), path.to_string_lossy().to_string()));
                }
            }
        }
    }

    Ok(projects)
}

#[tauri::command]
fn cancel_tests(state: tauri::State<TestProcess>) -> Result<(), String> {
    // 1. Marcamos que la prueba fue cancelada
    state.is_cancelled.store(true, Ordering::SeqCst);

    let pid = {
        let guard = state.pid.lock().unwrap();
        *guard
    };

    if let Some(pid) = pid {
        if cfg!(target_os = "windows") {
            let mut cmd = Command::new("taskkill");
            cmd.args(["/PID", &pid.to_string(), "/T", "/F"]);

            #[cfg(target_os = "windows")]
            {
                use std::os::windows::process::CommandExt;
                cmd.creation_flags(0x08000000);
            }

            cmd.spawn().map_err(|e| e.to_string())?;
        } else {
            let mut cmd = Command::new("kill");
            cmd.args(["-TERM", &pid.to_string()]);
            cmd.spawn().map_err(|e| e.to_string())?;
        }
    }
    Ok(())
}

#[tauri::command]
fn open_html_report(state: tauri::State<TestProcess>) -> Result<(), String> {
    let project_path = {
        let guard = state.current_project_path.lock().unwrap();
        guard.clone()
    };

    let project_path = project_path.ok_or("No se ha seleccionado ningún proyecto")?;
    let playwright_bin = if cfg!(target_os = "windows") {
        project_path
            .join("node_modules")
            .join(".bin")
            .join("playwright.cmd")
    } else {
        project_path.join("node_modules").join(".bin").join("playwright")
    };
    let report_folder = project_path.join("playwright-report");

    if !playwright_bin.exists() {
        return Err("Binario no encontrado.".to_string());
    }

    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        let _ = Command::new("cmd")
            .args([
                "/C",
                "taskkill /IM node.exe /F /FI \"WINDOWTITLE eq Playwright Test Report\"",
            ])
            .creation_flags(0x08000000)
            .output();
    }

    let mut cmd = Command::new(&playwright_bin);
    cmd.args([
        "show-report",
        report_folder.to_str().unwrap(),
        "--port",
        "0",
    ])
    .current_dir(&project_path);

    // --- AQUÍ TAMBIÉN FALTABA EL FLAG ---
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(0x08000000);
    }

    cmd.spawn()
        .map_err(|e| format!("Error al iniciar el servidor: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn delete_history_records(app_handle: tauri::AppHandle, ids: Vec<i32>) -> Result<(), String> {
    use sqlx::Row;

    let db_url = get_db_url(&app_handle)?;
    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| format!("Error: {}", e))?;

    for id in ids {
        let row = sqlx::query("SELECT report_path FROM test_history WHERE id = ?")
            .bind(id)
            .fetch_optional(&pool)
            .await
            .map_err(|e| e.to_string())?;

        if let Some(row) = row {
            let report_path: Option<String> = row.try_get("report_path").ok();

            if let Some(path) = report_path {
                let path_obj = Path::new(&path);
                if let Some(folder_path) = path_obj.parent() {
                    if folder_path.exists() && folder_path.is_dir() {
                        if folder_path.to_string_lossy().contains("history_reports") {
                            let _ = fs::remove_dir_all(folder_path);
                        }
                    }
                }
            }
        }

        sqlx::query("DELETE FROM test_history WHERE id = ?")
            .bind(id)
            .execute(&pool)
            .await
            .map_err(|e| e.to_string())?;
    }

    pool.close().await;
    Ok(())
}

#[tauri::command]
async fn sync_project(
    app_handle: tauri::AppHandle,
    repo_url: String,
    project_name: String,
    role: Option<String>,
) -> Result<String, String> {
    if role.as_deref() != Some("admin") {
        return Err("No autorizado para clonar proyectos".into());
    }

    validate_project_name(&project_name)?;

    let repo_url = repo_url.trim();
    let project_name = project_name.trim();

    if repo_url.is_empty() || project_name.is_empty() {
        return Err("La URL y el nombre no pueden estar vacíos.".into());
    }

    let mut workspace_path = app_handle
        .path()
        .document_dir()
        .map_err(|_| "Error del sistema".to_string())?;
    workspace_path.push("QA_Automation_Workspace");

    let normalized_new_url = repo_url.trim_end_matches(".git").to_lowercase();

    if workspace_path.exists() {
        if let Ok(entries) = std::fs::read_dir(&workspace_path) {
            for entry in entries.flatten() {
                let project_dir = entry.path();
                if project_dir.is_dir() {
                    let mut cmd = Command::new("git");
                    cmd.current_dir(&project_dir)
                        .args(["config", "--get", "remote.origin.url"]);

                    #[cfg(target_os = "windows")]
                    {
                        use std::os::windows::process::CommandExt;
                        cmd.creation_flags(0x08000000);
                    }

                    if let Ok(output) = cmd.output() {
                        let existing_url =
                            String::from_utf8_lossy(&output.stdout).trim().to_string();
                        let normalized_existing =
                            existing_url.trim_end_matches(".git").to_lowercase();
                        if !normalized_existing.is_empty()
                            && normalized_existing == normalized_new_url
                        {
                            return Err(format!(
                                "Repositorio ya clonado en '{}'.",
                                entry.file_name().to_string_lossy()
                            ));
                        }
                    }
                }
            }
        }
    }

    let mut path = workspace_path.clone();
    path.push(project_name);

    if path.exists() {
        return Err(format!("Ya existe la carpeta '{}'.", project_name));
    }

    let mut command = Command::new("git");
    command.args(["clone", repo_url, &path.to_string_lossy()]);

    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000);
    }

    let output = command
        .output()
        .map_err(|e| format!("Error ejecutando Git: {}", e))?;

    if !output.status.success() {
        return Err(format!(
            "Error de Git: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    Ok("Proyecto clonado con éxito".into())
}

#[tauri::command]
async fn delete_project(
    app_handle: tauri::AppHandle,
    project_name: String,
    role: Option<String>,
) -> Result<String, String> {
    if role.as_deref() != Some("admin") {
        return Err("No autorizado para eliminar proyectos".into());
    }
    validate_project_name(&project_name)?;

    let mut path = app_handle
        .path()
        .document_dir()
        .map_err(|_| "Error".to_string())?;
    path.push("QA_Automation_Workspace");
    path.push(&project_name);

    if path.exists() {
        fs::remove_dir_all(&path).map_err(|e| format!("Error al eliminar: {}", e))?;
        Ok("Proyecto eliminado.".into())
    } else {
        Err("El proyecto no existe.".into())
    }
}

#[tauri::command]
fn get_app_version() -> serde_json::Value {
    serde_json::json!({
        "version": env!("CARGO_PKG_VERSION"),
        "build": env!("BUILD_DATE")
    })
}

#[tauri::command]
fn get_full_version() -> Result<serde_json::Value, String> {
    let build_date = option_env!("BUILD_DATE").unwrap_or("unknown");
    Ok(serde_json::json!({
        "version": env!("CARGO_PKG_VERSION").to_string(),
        "build_date": build_date
    }))
}

#[tauri::command]
fn get_changelog(handle: tauri::AppHandle) -> Result<String, String> {
    let resource_path = handle
        .path()
        .resource_dir()
        .map_err(|e| format!("Error: {}", e))?
        .join("CHANGELOG.md");
    if !resource_path.exists() {
        return Err(format!("No existe: {:?}", resource_path));
    }
    fs::read_to_string(&resource_path).map_err(|e| format!("Error: {}", e))
}

#[tauri::command]
async fn get_unique_projects(app_handle: tauri::AppHandle) -> Result<Vec<String>, String> {
    use sqlx::Row;

    // 1. Obtenemos la URL de la base de datos centralizada
    let db_url = get_db_url(&app_handle)?;
    // 2. Nos conectamos a la base de datos
    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| format!("Error de conexión: {}", e))?;

    // 3. Ejecutamos la query para obtener todos los project_name, sin orden específico ya que usaremos un HashSet
    let rows = sqlx::query("SELECT DISTINCT project_name FROM test_history")
        .fetch_all(&pool)
        .await
        .map_err(|e| format!("Error en query: {}", e))?;

    // 4. Usamos un HashSet para recopilar nombres de proyectos únicos
    let mut unique_projects = HashSet::new();
    for row in rows {
        if let Ok(project_name) = row.try_get::<String, _>("project_name") {
            unique_projects.insert(project_name);
        }
    }

    // 5. Convertimos el HashSet a un Vec ordenado alfabéticamente
    let mut projects: Vec<String> = unique_projects.into_iter().collect();
    projects.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));

    // 6. Cerramos la conexión y devolvemos la lista
    pool.close().await;
    Ok(projects)
}

#[derive(serde::Serialize)]
pub struct LoginResponse {
    pub success: bool,
    pub role: String, // "admin" o "viewer"
}
#[tauri::command]
fn validate_login(username: String, password: String) -> Result<LoginResponse, String> {
    // Definimos los usuarios
    let users = vec![
        ("admin", "adminQA*", "admin"),
        ("tester_1", "QA123", "admin"),
        ("tester_2", "QA123", "admin"),
        ("powee_1", "poweeNeg*", "viewer"),
        ("powee_2", "poweeNeg*", "viewer"),
    ];

    // .iter() crea referencias, por eso usamos *u y *p para comparar correctamente
    let found = users
        .iter()
        .find(|&(u, p, _r)| *u == username && *p == password);

    match found {
        Some((_u, _p, role)) => {
            // Importante: Ok con O mayúscula
            Ok(LoginResponse {
                success: true,
                role: role.to_string(),
            })
        }
        None => Err("Credenciales incorrectas".into()),
    }
}

#[tauri::command]
async fn replace_excel_file(
    app_handle: tauri::AppHandle,
    project_path: String,
    source_path: String,
    role: Option<String>,
) -> Result<String, String> {
    if role.as_deref() != Some("admin") {
        return Err("No autorizado para reemplazar la matriz".into());
    }

    // Validamos que el proyecto viva dentro del workspace
    let mut workspace = app_handle
        .path()
        .document_dir()
        .map_err(|e| format!("Error al resolver workspace: {}", e))?;
    workspace.push("QA_Automation_Workspace");
    let canonical_workspace = workspace.canonicalize().unwrap_or(workspace.clone());
    let canonical_project = PathBuf::from(&project_path)
        .canonicalize()
        .map_err(|e| format!("Ruta de proyecto inválida: {}", e))?;
    if !canonical_project.starts_with(&canonical_workspace) {
        return Err("Ruta de proyecto fuera del workspace permitido".into());
    }

    // 1. Construir la ruta de destino: <project_path>/src/datos
    let dest_dir = PathBuf::from(&project_path).join("src").join("datos");

    // 2. Asegurarnos de que la carpeta exista (por si acaso)
    if !dest_dir.exists() {
        fs::create_dir_all(&dest_dir)
            .map_err(|e| format!("Error al crear carpetas destino: {}", e))?;
    }

    // 3. Agregar el nombre del archivo final
    let dest_file = dest_dir.join("SuitePruebas.xlsx");

    // 4. Ejecutar la copia (esto sobreescribe si ya existe)
    fs::copy(&source_path, &dest_file).map_err(|e| format!("Error al copiar archivo: {}", e))?;

    Ok("Matriz de pruebas actualizada con éxito".into())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        // --- INICIALIZACIÓN NATIVA DE SQLITE ---
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                if let Ok(db_url) = get_db_url(&handle) {
                    let db_path = db_url.replace("sqlite://", "");
                    // Creamos el archivo físico si no existe
                    if !Path::new(&db_path).exists() {
                        let _ = fs::File::create(&db_path);
                    }

                    // Ejecutamos la migración inicial manualmente y sin conflictos
                    if let Ok(pool) = SqlitePool::connect(&db_url).await {
                        let _ = sqlx::query(
                            "CREATE TABLE IF NOT EXISTS test_history (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                project_name TEXT,
                                test_names TEXT,
                                execution_date TEXT,
                                total_tests INTEGER,
                                passed INTEGER,
                                failed INTEGER,
                                duration REAL,
                                report_path TEXT
                            );",
                        )
                        .execute(&pool)
                        .await;
                        pool.close().await;
                    }
                }
            });
            Ok(())
        })
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            list_projects,
            get_app_version,
            list_playwright_tests,
            sync_project,
            run_playwright_tests,
            cancel_tests,
            open_html_report,
            check_environment,
            repair_environment,
            save_test_execution,
            get_test_history,
            open_history_report,
            delete_history_records,
            get_full_version,
            get_changelog,
            delete_project,
            get_unique_projects,
            validate_login,
            replace_excel_file,
        ])
        .manage(TestProcess {
            pid: Arc::new(Mutex::new(None)),
            current_project_path: Arc::new(Mutex::new(None)),
            is_cancelled: Arc::new(AtomicBool::new(false)),
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
