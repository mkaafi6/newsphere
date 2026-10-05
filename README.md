# NewsSphere

A lightweight **news kiosk browser** for Android — opens 5 trusted news sources
in a clean, fullscreen in-app viewer with a bottom navigation bar.

Built with **Tauri v2** (Rust). APKs are compiled in the cloud via GitHub
Actions, so nothing heavy runs on the phone.

## 🌐 Frontend (also the app's home screen)

Published to GitHub Pages from `src/`:

**https://mkaafi6.github.io/newsphere/**

## 📦 Download the app

1. Open the repo's **Actions** tab → the latest **Build Android APK** run.
2. Download the **`NewsSphere-debug-apk`** artifact and install it on Android
   (enable "Install unknown apps" for your browser/file manager).

## ✏️ Managing sources (developer-side)

All sources live in **`src/sites.json`**:

```json
{ "label": "BBC News", "url": "https://www.bbc.com/news", "icon": "🌍", "tag": "World" }
```

Edit that file, commit, and push to `main`. Both the **live site** and the
**APK** rebuild automatically. The end user never edits anything.

## 🗂️ Layout

- `src/` — the frontend (launcher UI, `main.js`, `style.css`, `sites.json`). Deployed to Pages and bundled into the app.
- `src-tauri/` — the Rust/Tauri shell (`Cargo.toml`, `tauri.conf.json`, `capabilities/`).
- `.github/workflows/` — `deploy-pages.yml` (frontend) and `build-apk.yml` (APK).

## 💻 Local preview

```bash
cd newsphere
npm run serve      # static preview at http://localhost:5500
```

Building the APK locally requires the Android SDK/NDK — use the cloud build instead.

## Notes / roadmap

- v1 ships a **debug APK** (auto-signed, sideloadable). Release signing can be added later.
- Ad-blocking is **not** included yet: Tauri's mobile webview can't do network-level
  filtering from Rust. A local proxy or cosmetic injection is the follow-up path.
- The bottom bar lives on the launcher; Android's back button returns home from a source.
