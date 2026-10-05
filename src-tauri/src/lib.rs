// NewsSphere — Tauri v2 backend.
//
// The app is a lightweight kiosk reader: the bundled frontend (in ../src,
// also published to GitHub Pages) lists trusted sources, and tapping one
// navigates the in-app webview. Navigation is handled in the frontend via
// window.location, so no custom IPC commands are required here.

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running NewsSphere");
}
