// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod services;
mod toggle_window_visibility;

use tauri_plugin_autostart::MacosLauncher;

use crate::services::get_file_icon::get_file_icon;
use crate::services::get_installed_apps::get_installed_apps;
use crate::services::open_app_by_id::open_app_by_id;

use tauri::{generate_handler, Manager};
use toggle_window_visibility::toggle_window_visibility;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_global_shortcut::Builder::default().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit_to("main", "single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec![""]),
        ))
        .invoke_handler(generate_handler![
            toggle_window_visibility,
            get_installed_apps,
            open_app_by_id,
            get_file_icon
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
