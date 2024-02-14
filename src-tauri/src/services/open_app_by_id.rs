use tauri::api::process::Command;

#[tauri::command(async)]
pub async fn open_app_by_id(app_id: String) {
    let arg = "'shell:AppsFolder\\".to_string() + &app_id + "'";

    Command::new("powershell.exe")
        .args(["start", &arg])
        .output()
        .expect("failed to execute process");
}
