#[tauri::command(async)]
pub async fn get_file_icon(file_path: String) -> Vec<u8> {
    return systemicons::get_icon(&file_path, 64).unwrap();
}
