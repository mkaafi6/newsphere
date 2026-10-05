# Session Notes — NewsSphere

> Project memory / worklog. Update as the project evolves.

**Created:** 2026-10-05
**Local path:** `/root/newsphere`
**Repo:** https://github.com/mkaafi6/newsphere *(to be created)*
**Live frontend:** https://mkaafi6.github.io/newsphere/

---

## What it is

- A **news kiosk browser** for Android: fullscreen in-app webview showing 5
  trusted news sources, with a bottom navigation bar (Home / Refresh / Back /
  Share / About).
- **Tauri v2** (Rust) shell + static frontend.
- **Cloud-built** via GitHub Actions so no Android NDK runs on the phone.

## Sources (v1, legal only)

- BBC News, Reuters, AP News, NPR, Al Jazeera — in `src/sites.json`.
- Managed **developer-side only**: edit `src/sites.json` → push to `main`.

## Architecture decisions

- Frontend (`src/`) is published to **GitHub Pages** *and* bundled into the app.
- Tapping a source navigates the in-app webview (`window.location`); no custom
  IPC commands needed.
- Bottom bar is on the launcher; Android back button returns from a source.

## Plan corrections made (vs. the initial draft)

1. **Ad-blocking dropped from v1** — Tauri's Android webview can't intercept
   network requests from Rust, so `adblock-rs` wouldn't block anything in-app.
   Follow-up path: local proxy or cosmetic CSS/scriptlet injection.
2. **APK build fixed** — needs `tauri android init` + NDK setup; CLI via
   `@tauri-apps/cli` (npm), not `cargo install`.
3. **Debug APK** (auto-signed) instead of unsigned release.
4. **No iframe embedding** — news sites block framing; bundled launcher instead.
5. **Mobile ignores desktop window config** (fullscreen set at Android level).

## How to resume

```bash
cd /root/newsphere
npm run serve            # preview the frontend at http://localhost:5500
# edit src/sites.json, then:
git add -A && git commit -m "..." && git push   # rebuilds site + APK in CI
```

## TODO

- [ ] Create the GitHub repo + enable Pages; confirm both workflows pass.
- [ ] Confirm the debug APK installs and the webview navigates to the sources.
- [ ] Add an injected floating "Home" button over third-party pages (optional).
- [ ] Optional: release signing keystore; ad-block via local proxy.
- [ ] User updates the source list; ask me to notify when it's time.
