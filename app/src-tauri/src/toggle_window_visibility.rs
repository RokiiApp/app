use tauri::WebviewWindow;

#[tauri::command]
pub fn toggle_window_visibility(window: WebviewWindow) {
    if window.is_visible().unwrap() {
        window.hide().unwrap();
    } else {
        window.show().unwrap();
        window.set_focus().unwrap();
    }
}
