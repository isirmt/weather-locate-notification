#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn send_notice(message: &str) {
  println!("{message}");
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![send_notice])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
