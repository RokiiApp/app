use tauri::{Manager, Window};

#[tauri::command]
pub fn open_devtools(window: Window) {
    window.get_webview_window("main").unwrap().open_devtools();
}
