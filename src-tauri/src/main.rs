#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::error::Error;
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    App, Manager, Window,
};

fn setup(app: &mut App) -> Result<(), Box<dyn Error>> {
    let show_i = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

    let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => app.exit(0),
            "show" => app.get_webview_window("main").unwrap().show().unwrap(),
            _ => {}
        })
        .build(app)?;
    Ok(())
}

fn on_window_event(app: &Window, event: &tauri::WindowEvent) {
    match event {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            let _ = app.hide();
            api.prevent_close();
        }
        _ => {}
    }
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
        .invoke_handler(tauri::generate_handler![background_task])
        .invoke_handler(tauri::generate_handler![send_notice])
        .setup(setup)
        .on_window_event(on_window_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn background_task() -> String {
    println!("Print from background");
    "From Backend to Frontend".to_string()
}

#[tauri::command]
fn send_notice(message: &str) {
    println!("{message}");
}
