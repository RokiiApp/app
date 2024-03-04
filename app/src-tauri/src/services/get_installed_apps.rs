use tauri::api::process::Command;

// TODO - Migrate to this PWsh script
// https://github.com/oliverschwendener/ueli/blob/main/src/main/Extensions/ApplicationSearch/Windows/usePowershellScripts.ts
#[tauri::command(async)]
pub async fn get_installed_apps() -> String {
    let result = Command::new("powershell.exe")
        .args(["$startApps = Get-StartApps; foreach($startApp in $startApps) { echo $startApp.Name; echo $startApp.AppId }"])
        .output()
        .expect("failed to execute process");


    return result.stdout;
}
