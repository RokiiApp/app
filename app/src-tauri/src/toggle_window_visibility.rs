use tauri::Window;

#[tauri::command]
pub fn toggle_window_visibility(window: Window) {
    if window.is_visible().unwrap() {
        window.hide().unwrap();
    } else {
        window.show().unwrap();
        window.set_focus().unwrap();
    }
}
