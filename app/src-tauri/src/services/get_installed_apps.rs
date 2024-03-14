use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

// TODO - Migrate to this PWsh script
// https://github.com/oliverschwendener/ueli/blob/main/src/main/Extensions/ApplicationSearch/Windows/usePowershellScripts.ts
#[tauri::command(async)]
pub async fn get_installed_apps(app: AppHandle) -> String {
    let result = app.shell().command("powershell.exe")
        .args(["$startApps = Get-StartApps; foreach($startApp in $startApps) { echo $startApp.Name; echo $startApp.AppId }"])
        .output()
        .await.unwrap();

    return String::from_utf8(result.stdout).expect("error");
}
