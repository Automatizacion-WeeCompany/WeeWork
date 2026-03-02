use tauri::{AppHandle, Emitter};

pub fn init() {
    println!("Logs initialized");
}

pub fn emit(app: &AppHandle, message: &str) {
    println!("Log: {}", message);
    if let Err(e) = app.emit("log", message) {
        eprintln!("Error emitting log event: {}", e);
    }
}
