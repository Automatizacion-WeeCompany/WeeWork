use chrono::Local;
use serde::Serialize;
use sqlx::sqlite::SqlitePool;
use std::env;
use std::fs;
use std::io::{BufRead, BufReader};
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use std::path::Path;
use std::process::Command;
use std::process::Stdio;
use std::sync::{Arc, Mutex};
use std::thread;
//use tauri::api::path::app_config_dir;
use tauri::Emitter;
use tauri::Manager;
use tauri::Window;
use tauri_plugin_sql::{Migration, MigrationKind};
struct TestProcess {
    pid: Arc<Mutex<Option<u32>>>,
    current_project_path: Arc<Mutex<Option<std::path::PathBuf>>>,
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

#[tauri::command]
async fn get_test_history(
    app_handle: tauri::AppHandle,
) -> Result<Vec<TestExecutionRecord>, String> {
    use sqlx::Row;

    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_dir.join("test_tool.db");
    let db_url = format!("sqlite://{}", db_path.to_string_lossy());

    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| format!("Error de conexión: {}", e))?;

    // Forzamos el SELECT con nombres explícitos para evitar confusiones
    let rows = sqlx::query("SELECT id, project_name,report_path, test_names, execution_date, total_tests, passed, failed, duration FROM test_history ORDER BY id DESC")
        .fetch_all(&pool)
        .await
        .map_err(|e| format!("Error en query: {}", e))?;

    let history = rows
        .into_iter()
        .map(|row| {
            let raw_path: Option<String> = row.try_get("report_path").ok();
            println!("Ruta en DB: {:?}", raw_path);
            TestExecutionRecord {
                id: row.try_get("id").unwrap_or(0),
                project_name: row.try_get("project_name").unwrap_or_default(),
                // Usamos try_get con un valor por defecto para que NUNCA cause un pánico
                test_names: row
                    .try_get("test_names")
                    .unwrap_or_else(|_| "N/A".to_string()),
                execution_date: row.try_get("execution_date").unwrap_or_default(),
                total_tests: row.try_get("total_tests").unwrap_or(0),
                passed: row.try_get("passed").unwrap_or(0),
                failed: row.try_get("failed").unwrap_or(0),
                duration: row.try_get("duration").unwrap_or(0.0),
                report_path: row.try_get("report_path").ok(),
            }
        })
        .collect();

    pool.close().await;
    Ok(history)
}

#[tauri::command]
async fn save_test_execution(
    app_handle: tauri::AppHandle,
    projectName: String,
    projectPath: String, // <--- Necesitamos la ruta del proyecto para buscar el reporte original
    testNames: String,
    totalTests: i32,
    passed: i32,
    failed: i32,
    duration: f64,
) -> Result<(), String> {
    use std::fs;
    use std::path::Path;

    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_dir.join("test_tool.db");
    let reports_storage = app_dir.join("history_reports"); // Carpeta donde guardaremos las copias

    // 1. Crear carpeta de almacenamiento si no existe
    if !reports_storage.exists() {
        fs::create_dir_all(&reports_storage).map_err(|e| e.to_string())?;
    }

    // 2. Definir rutas de origen y destino
    // Asumimos que Playwright genera el reporte en /playwright-report dentro del proyecto
    let source_report = Path::new(&projectPath).join("playwright-report");

    // Creamos un nombre único basado en fecha y hora para no sobrescribir
    let timestamp = chrono::Local::now().format("%Y%m%d_%H%M%S").to_string();
    let dest_folder_name = format!("{}_{}", projectName.replace(" ", "_"), timestamp);
    let dest_report = reports_storage.join(&dest_folder_name);

    let mut saved_report_path: Option<String> = None;

    // 3. Copiar el reporte (Si existe)
    if source_report.exists() {
        // En Windows, copiar carpetas recursivamente con std::fs es complejo.
        // Usaremos un comando de sistema simple y robusto (robocopy o powershell)
        // O una implementación manual simple:
        match copy_dir_all(&source_report, &dest_report) {
            Ok(_) => {
                // Guardamos la ruta al index.html dentro de la nueva carpeta
                let final_html = dest_report.join("index.html");
                saved_report_path = Some(final_html.to_string_lossy().to_string());
            }
            Err(e) => println!("No se pudo copiar el reporte: {}", e),
        }
    }

    // 4. Conectar a BD
    let db_url = format!("sqlite://{}", db_path.to_string_lossy());
    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| e.to_string())?;

    // 5. Migración "al vuelo" (Agregar columna si falta)
    let _ = sqlx::query("ALTER TABLE test_history ADD COLUMN report_path TEXT")
        .execute(&pool)
        .await;

    // 6. Insertar registro
    let fecha_actual = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let query = "
        INSERT INTO test_history (project_name, test_names, execution_date, total_tests, passed, failed, duration, report_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";

    sqlx::query(query)
        .bind(projectName)
        .bind(testNames)
        .bind(fecha_actual)
        .bind(totalTests)
        .bind(passed)
        .bind(failed)
        .bind(duration)
        .bind(saved_report_path) // <--- Guardamos la ruta
        .execute(&pool)
        .await
        .map_err(|e| e.to_string())?;

    pool.close().await;
    Ok(())
}

// Función auxiliar para copiar carpetas recursivamente (Agrégala al final de main.rs)
fn copy_dir_all(
    src: impl AsRef<std::path::Path>,
    dst: impl AsRef<std::path::Path>,
) -> std::io::Result<()> {
    use std::fs;
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

fn get_workspace_dir(app_handle: &tauri::AppHandle) -> std::path::PathBuf {
    // Usamos la carpeta de Documentos del usuario para que los archivos sean visibles y editables
    let mut path = app_handle
        .path()
        .document_dir()
        .unwrap_or_else(|_| std::path::PathBuf::from("."));
    path.push("QA_Automation_Workspace");

    if !path.exists() {
        let _ = std::fs::create_dir_all(&path);
    }
    path
}

#[tauri::command]
async fn open_history_report(report_path: String) -> Result<(), String> {
    let path = std::path::Path::new(&report_path);

    if path.exists() {
        #[cfg(target_os = "windows")]
        {
            // El comando 'start' de Windows es muy fiable para abrir HTMLs con rutas largas
            std::process::Command::new("cmd")
                .args(["/C", "start", "", &report_path])
                .spawn()
                .map_err(|e| e.to_string())?;
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

    // 1. Verificar Node.js
    let node_check = Command::new("node")
        .arg("-v")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output();
    let node_installed = node_check.is_ok();

    // 2. Verificar node_modules
    let node_modules_exists = path.join("node_modules").exists();

    // 3. Verificar navegadores de Playwright
    // Intentamos listar los navegadores instalados mediante su CLI local
    let playwright_bin = path
        .join("node_modules")
        .join(".bin")
        .join("playwright.cmd");

    let mut browsers_installed = false;
    if playwright_bin.exists() {
        // Ejecutamos 'playwright install --dry-run' que es rápido y nos dice si falta algo
        let pw_check = Command::new("cmd")
            .args([
                "/C",
                playwright_bin.to_str().unwrap(),
                "install",
                "--dry-run",
            ])
            .current_dir(path)
            .creation_flags(0x08000000)
            .output();

        if let Ok(output) = pw_check {
            // Si el output está vacío en dry-run, suele significar que ya están
            browsers_installed = output.status.success();
        }
    }

    let project_ready = node_installed && node_modules_exists && browsers_installed;

    Ok(HealthStatus {
        node_installed,
        node_modules_exists,
        playwright_browsers_installed: browsers_installed,
        project_ready,
    })
}

#[tauri::command]
fn repair_environment(window: tauri::Window, project_path: String) -> Result<(), String> {
    std::thread::spawn(move || {
        let (shell, flag) = if cfg!(target_os = "windows") {
            ("cmd", "/C")
        } else {
            ("sh", "-c")
        };

        let _ = window.emit("repair-status", "Instalando dependencias (npm install)...");

        // 1. Ejecutar npm install
        let npm_cmd = if cfg!(target_os = "windows") {
            "npm.cmd"
        } else {
            "npm"
        };
        let mut npm_proc = Command::new(shell);
        npm_proc
            .args([flag, npm_cmd, "install"])
            .current_dir(&project_path);

        #[cfg(target_os = "windows")]
        {
            use std::os::windows::process::CommandExt;
            npm_proc.creation_flags(0x08000000);
        }
        let _ = npm_proc.status();

        let _ = window.emit("repair-status", "Instalando navegadores de Playwright...");

        // 2. Ejecutar playwright install
        let playwright_bin = if cfg!(target_os = "windows") {
            "node_modules\\.bin\\playwright.cmd"
        } else {
            "./node_modules/.bin/playwright"
        };

        let mut pw_proc = Command::new(shell);
        pw_proc
            .args([flag, &format!("{} install", playwright_bin)])
            .current_dir(&project_path);

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
fn list_playwright_tests(project_path: String) -> Result<Vec<Suite>, String> {
    println!("📂 Ejecutando en: {}", project_path);

    let output = Command::new("cmd")
        .args(["/C", "npx", "playwright", "test", "--list"])
        .current_dir(&project_path)
        .output()
        .map_err(|e| e.to_string())?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    let stdout = String::from_utf8_lossy(&output.stdout);

    use std::collections::{HashMap, HashSet};
    let mut suites_map: HashMap<String, HashSet<String>> = HashMap::new();

    for line in stdout.lines() {
        if line.contains("›") && line.contains(".spec.ts") {
            let parts: Vec<&str> = line.split('›').collect();

            // Formato:
            // [0] Browser
            // [1] archivo.spec.ts
            // [2] Suite
            // [3] Test

            if parts.len() >= 4 {
                let suite_name = parts[2].trim().to_string();
                let test_name = parts[3].trim().to_string();

                suites_map.entry(suite_name).or_default().insert(test_name); //HashSet elimina duplicados (Chromium/Firefox)
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

    // 1. Limpieza de reportes anteriores
    let results_path = project_path_buf.join("results.json");
    let report_dir = project_path_buf.join("playwright-report");

    if results_path.exists() {
        let _ = fs::remove_file(&results_path);
    }
    if report_dir.exists() {
        let _ = fs::remove_dir_all(&report_dir);
    }

    // 2. Configuración dinámica según el OS
    let (shell, flag) = if cfg!(target_os = "windows") {
        ("cmd", "/C")
    } else {
        ("sh", "-c")
    };

    let playwright_bin = if cfg!(target_os = "windows") {
        "node_modules\\.bin\\playwright.cmd"
    } else {
        "./node_modules/.bin/playwright"
    };

    // Guardar estado
    {
        let mut guard = state.current_project_path.lock().unwrap();
        *guard = Some(project_path_buf.clone());
    }

    let pid_state = state.pid.clone();
    let window_clone = window.clone();

    thread::spawn(move || {
        let grep_argument = format!("{}", grep);

        // Construimos el comando base
        let mut command = Command::new(shell);
        command
            .args([
                flag,
                &format!(
                    "{} test --project {} --grep \"{}\" --reporter=json,html",
                    playwright_bin,
                    browser.to_lowercase(),
                    grep_argument
                ),
            ])
            .env("PLAYWRIGHT_JSON_OUTPUT_NAME", "results.json")
            .env("PLAYWRIGHT_HTML_OPEN", "never")
            .env("CI", "true")
            .current_dir(&project_path)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped());

        // Solo en Windows: Ocultar ventana de consola
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

        // Registrar PID
        {
            let mut guard = pid_state.lock().unwrap();
            *guard = Some(child.id());
        }

        // Lectura de STDOUT/STDERR (Tu lógica de hilos se mantiene igual...)
        let stdout = child.stdout.take();
        let win_out = window_clone.clone();
        thread::spawn(move || {
            if let Some(stdout) = stdout {
                let reader = BufReader::new(stdout);
                for line in reader.lines().flatten() {
                    let _ = win_out.emit("test-output", line);
                }
            }
        });

        let status = child.wait();

        // Limpiar PID y procesar resultados
        {
            let mut guard = pid_state.lock().unwrap();
            *guard = None;
        }

        thread::sleep(std::time::Duration::from_millis(1000));

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
    use std::fs;

    // 1. Buscamos la carpeta de Documentos del usuario de forma segura
    let mut projects_dir = app_handle
        .path()
        .document_dir()
        .map_err(|e| format!("No se encontró la carpeta Documentos: {}", e))?;

    // 2. Definimos nuestra subcarpeta de trabajo
    projects_dir.push("QA_Automation_Workspace");

    println!("Buscando proyectos en: {:?}", projects_dir);

    // Si la carpeta base no existe, la creamos (primera vez)
    if !projects_dir.exists() {
        fs::create_dir_all(&projects_dir).map_err(|e| e.to_string())?;
        return Ok(Vec::new()); // Retorna lista vacía si acaba de ser creada
    }

    let mut projects = Vec::new();

    let entries = fs::read_dir(&projects_dir)
        .map_err(|e| format!("Error al leer la carpeta de proyectos: {}", e))?;

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
    let pid = {
        let guard = state.pid.lock().unwrap();
        *guard
    };

    if let Some(pid) = pid {
        Command::new("taskkill")
            .args(["/PID", &pid.to_string(), "/T", "/F"])
            .spawn()
            .map_err(|e| e.to_string())?;

        Ok(())
    } else {
        Ok(())
    }
}

#[tauri::command]
fn open_html_report(state: tauri::State<TestProcess>) -> Result<(), String> {
    let project_path = {
        let guard = state.current_project_path.lock().unwrap();
        guard.clone()
    };

    let project_path = project_path.ok_or("No se ha seleccionado ningún proyecto")?;
    let playwright_bin = project_path
        .join("node_modules")
        .join(".bin")
        .join("playwright.cmd");
    let report_folder = project_path.join("playwright-report");

    if !playwright_bin.exists() {
        return Err("Binario de Playwright no encontrado.".to_string());
    }

    // --- PASO DE ROBUSTEZ: Matar procesos previos en Windows ---
    // Esto asegura que el puerto 9323 quede libre antes de iniciar el nuevo server
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;

        let _ = Command::new("cmd")
            .args([
                "/C",
                "taskkill /IM node.exe /F /FI \"WINDOWTITLE eq Playwright Test Report\"",
            ])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW para que no parpadee una consola
            .output();
    }

    // Ejecutamos show-report
    // Usamos el flag --port para tener control total
    let status = Command::new(&playwright_bin)
        .args([
            "show-report",
            report_folder.to_str().unwrap(),
            "--port",
            "0",
        ])
        .current_dir(&project_path)
        .spawn();

    match status {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error al iniciar el servidor de reporte: {}", e)),
    }
}

#[tauri::command]
async fn delete_history_records(app_handle: tauri::AppHandle, ids: Vec<i32>) -> Result<(), String> {
    use sqlx::Row;
    use std::fs;
    // 1. Obtener la ruta de la base de datos (igual que en get_test_history)
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_dir.join("test_tool.db");
    let db_url = format!("sqlite://{}", db_path.to_string_lossy());

    let pool = SqlitePool::connect(&db_url)
        .await
        .map_err(|e| format!("Error de conexión: {}", e))?;

    for id in ids {
        // 2. Obtener la ruta del reporte antes de borrar el registro de la BD
        let row = sqlx::query("SELECT report_path FROM test_history WHERE id = ?")
            .bind(id)
            .fetch_optional(&pool) // Usamos fetch_optional por seguridad
            .await
            .map_err(|e| e.to_string())?;

        if let Some(row) = row {
            let report_path: Option<String> = row.try_get("report_path").ok();

            // 3. Borrar carpeta de evidencias físicamente
            if let Some(path) = report_path {
                let path_obj = std::path::Path::new(&path);
                // Obtenemos el padre porque el path guardado es el index.html,
                // queremos borrar la carpeta completa que lo contiene.
                if let Some(folder_path) = path_obj.parent() {
                    if folder_path.exists() && folder_path.is_dir() {
                        // Verificamos por seguridad que estemos dentro de history_reports
                        if folder_path.to_string_lossy().contains("history_reports") {
                            let _ = fs::remove_dir_all(folder_path);
                            println!("Evidencia eliminada: {:?}", folder_path);
                        }
                    }
                }
            }
        }

        // 4. Borrar el registro de la base de datos
        sqlx::query("DELETE FROM test_history WHERE id = ?")
            .bind(id)
            .execute(&pool)
            .await
            .map_err(|e| format!("Error al eliminar ID {}: {}", id, e))?;
    }

    // 5. Cerrar el pool
    pool.close().await;
    Ok(())
}

#[tauri::command]
async fn sync_project(
    app_handle: tauri::AppHandle,
    repo_url: String,
    project_name: String,
) -> Result<String, String> {
    let repo_url = repo_url.trim();
    let project_name = project_name.trim();

    if repo_url.is_empty() || project_name.is_empty() {
        return Err("La URL y el nombre del proyecto no pueden estar vacíos.".into());
    }

    let mut workspace_path = app_handle.path().document_dir().map_err(|_| {
        "Error del sistema: No se pudo acceder a la carpeta de Documentos.".to_string()
    })?;
    workspace_path.push("QA_Automation_Workspace");

    // --- NUEVA VALIDACIÓN: URL DUPLICADA ---
    // Normalizamos la URL (quitamos .git al final y la pasamos a minúsculas para comparar bien)
    let normalized_new_url = repo_url.trim_end_matches(".git").to_lowercase();

    if workspace_path.exists() {
        if let Ok(entries) = std::fs::read_dir(&workspace_path) {
            for entry in entries.flatten() {
                let project_dir = entry.path();
                if project_dir.is_dir() {
                    // Consultamos a Git cuál es la URL de esta carpeta
                    let mut cmd = std::process::Command::new("git");
                    cmd.current_dir(&project_dir);
                    cmd.args(["config", "--get", "remote.origin.url"]);

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

                        // Si las URLs coinciden, bloqueamos el proceso
                        if !normalized_existing.is_empty()
                            && normalized_existing == normalized_new_url
                        {
                            return Err(format!(
                                "Este repositorio ya se encuentra clonado en la carpeta '{}'.",
                                entry.file_name().to_string_lossy()
                            ));
                        }
                    }
                }
            }
        }
    }
    // ---------------------------------------

    let mut path = workspace_path.clone();
    path.push(project_name);

    // Validación de nombre duplicado (la que ya teníamos)
    if path.exists() {
        return Err(format!("Ya existe una carpeta llamada '{}'.", project_name));
    }

    let mut command = std::process::Command::new("git");
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
        let error_msg = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Error de Git: {}", error_msg));
    }

    Ok("Proyecto clonado con éxito".into())
}

#[tauri::command]
async fn delete_project(
    app_handle: tauri::AppHandle,
    project_name: String,
) -> Result<String, String> {
    let mut path = app_handle
        .path()
        .document_dir()
        .map_err(|_| "Error del sistema".to_string())?;
    path.push("QA_Automation_Workspace");
    path.push(&project_name);

    if path.exists() {
        // Borramos el directorio y todo su contenido
        std::fs::remove_dir_all(&path).map_err(|e| format!("No se pudo eliminar: {}", e))?;
        Ok("Proyecto eliminado con éxito.".into())
    } else {
        Err("El proyecto no existe en el sistema.".into())
    }
}

#[tauri::command]
fn get_app_version() -> serde_json::Value {
    serde_json::json!({
        "version": env!("CARGO_PKG_VERSION"),
        "build": env!("BUILD_DATE") // Aquí usamos la variable que creamos en build.rs
    })
}

#[tauri::command]
fn get_full_version() -> Result<serde_json::Value, String> {
    let version = env!("CARGO_PKG_VERSION").to_string();

    // In a real scenario, you might get the build date from an environment
    // variable injected during the build process. For this example, we'll
    // mock it or try to find a compile-time stamp.
    let build_date = "2026.03.03"; // Placeholder. See note below.

    Ok(serde_json::json!({
        "version": version,
        "build_date": build_date
    }))
}

// Command to read the changelog (CA02)
#[tauri::command]
fn get_changelog(handle: tauri::AppHandle) -> Result<String, String> {
    // En Tauri v2 usamos path().resource_dir()
    let resource_path = handle
        .path()
        .resource_dir()
        .map_err(|e| format!("Error al localizar carpeta de recursos: {}", e))?
        .join("CHANGELOG.md");

    if !resource_path.exists() {
        return Err(format!("El archivo no existe en: {:?}", resource_path));
    }

    fs::read_to_string(&resource_path).map_err(|e| format!("Error al leer el archivo: {}", e))
}

fn main() {
    //Se define la estrutura de la base de datos
    let migrations = vec![Migration {
        version: 1,
        description: "Create test history table",
        sql: "CREATE TABLE IF NOT EXISTS test_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_name TEXT,
                execution_date TEXT,
                total_tests INTEGER,
                passed INTEGER,
                failed INTEGER,
                duration REAL
            );",
        kind: MigrationKind::Up,
    }];
    tauri::Builder::default()
        .setup(|app| {
            // Esto asegura que la carpeta de datos exista al arrancar
            let app_dir = app.path().app_data_dir()?;
            if !app_dir.exists() {
                std::fs::create_dir_all(&app_dir)?;
            }
            Ok(())
        })
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test_tool.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            list_projects,
            get_app_version,
            list_playwright_tests,
            sync_project,
            // run_playwright_with_config,
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
        ])
        .manage(TestProcess {
            pid: Arc::new(Mutex::new(None)),
            current_project_path: Arc::new(Mutex::new(None)),
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
