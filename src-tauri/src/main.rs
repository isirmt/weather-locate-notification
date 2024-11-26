#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn send_notice(message: &str) {
    println!("{message}");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_http::init())
        .invoke_handler(tauri::generate_handler![send_notice])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
