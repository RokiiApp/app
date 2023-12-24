// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod get_file_icon;
mod get_installed_apps;
mod toggle_window_visibility;
mod tray;

use tauri_plugin_autostart::MacosLauncher;

use get_file_icon::get_file_icon;
use get_installed_apps::{get_installed_apps, open_app_by_id};
use tauri::Manager;
use toggle_window_visibility::toggle_window_visibility;
use tray::{create_tray_menu, system_tray_event_handler};

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    let tray = create_tray_menu();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            toggle_window_visibility::toggle_window_visibility,
            get_file_icon,
            get_installed_apps,
            open_app_by_id
        ])
        .system_tray(tray)
        .on_system_tray_event(system_tray_event_handler)
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_fs_extra::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec![""]),
        ))
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
