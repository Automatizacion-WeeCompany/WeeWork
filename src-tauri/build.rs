use std::process::Command;

fn main() {
    // Captura la fecha actual del sistema
    let output = Command::new("powershell")
        .args(&["-Command", "Get-Date -Format 'yyyy.MM.dd'"])
        .output()
        .expect("Fallo al obtener fecha");

    let date = String::from_utf8_lossy(&output.stdout).trim().to_string();

    // Le pasa esta fecha a Rust como una variable de entorno llamada BUILD_DATE
    println!("cargo:rustc-env=BUILD_DATE={}", date);

    tauri_build::build()
}
