use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

#[tauri::command(async)]
pub async fn open_app_by_id(app: AppHandle, app_id: String) {
    let arg = "'shell:AppsFolder\\".to_string() + &app_id + "'";

    app.shell()
        .command("powershell.exe")
        .args(["start", &arg])
        .output()
        .await
        .expect("failed to execute process");
}
