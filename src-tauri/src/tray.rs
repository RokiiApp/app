use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

use crate::toggle_window_visibility;

pub fn create_tray_menu() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let toggle = CustomMenuItem::new("toggle".to_string(), "Show/Hide Rokii");

    let tray_menu = SystemTrayMenu::new()
        .add_item(toggle)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

pub fn system_tray_event_handler(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            toggle_window_visibility(app.get_window("main").unwrap())
        }

        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => std::process::exit(0),
            "toggle" => toggle_window_visibility(app.get_window("main").unwrap()),
            _ => {}
        },
        _ => {}
    }
}
