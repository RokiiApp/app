use tauri::api::process::Command;

#[tauri::command(async)]
pub async fn get_installed_apps() -> Vec<String> {
    let result = Command::new("powershell.exe")
        .args(["Get-StartApps | Format-Table -Wrap -Autosize"])
        .output()
        .expect("failed to execute process");

    // separate the stdout in lines

    let mut lines: Vec<String> = result.stdout.lines().map(|line| line.to_string()).collect();

    // remove first 6 lines

    for _ in 0..6 {
        lines.remove(0);
    }

    // filter empty lines

    lines = lines
        .into_iter()
        .filter(|line| line.len() > 0)
        .collect::<Vec<String>>();

    return lines;
}

#[tauri::command(async)]
pub async fn open_app_by_id(app_id: String) {
    let arg = "'shell:AppsFolder\\".to_string() + &app_id + "'";

    Command::new("powershell.exe")
        .args(["start", &arg])
        .output()
        .expect("failed to execute process");
}

// TODO - Use this to get the icon of the app, then do a match with the app name to get the icon
// $loc = Get-ChildItem HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall
// $names = $loc |foreach-object {Get-ItemProperty $_.PsPath}
// foreach ($name in $names)
// {
//      Write-Host $name.Displayname
//      Write-Host $name.DisplayIcon
// }
