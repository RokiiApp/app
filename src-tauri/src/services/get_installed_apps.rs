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
