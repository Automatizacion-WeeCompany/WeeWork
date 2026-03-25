use chrono::Local;

fn main() {
    // Captura la fecha actual en cualquier SO (sin shell externo)
    let date = Local::now().format("%Y.%m.%d").to_string();

    // Le pasa esta fecha a Rust como una variable de entorno llamada BUILD_DATE
    println!("cargo:rustc-env=BUILD_DATE={}", date);

    tauri_build::build()
}
