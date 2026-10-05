// NewsSphere frontend — renders the developer-managed source list and
// handles the bottom navigation bar.
(function () {
  "use strict";

  var listEl = document.getElementById("sources");
  var hintEl = document.getElementById("hint");
  var aboutEl = document.getElementById("about");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
      hintEl.textContent = "No sources configured.";
      return;
    }
    listEl.innerHTML = sources
      .map(function (s) {
        return (
          '<button class="src" data-url="' + esc(s.url) + '" data-label="' + esc(s.label) + '">' +
            '<span class="emoji">' + (s.icon || "🔗") + "</span>" +
            '<span class="meta">' +
              '<span class="name">' + esc(s.label) + "</span>" +
              '<span class="sub">' + esc(s.tag || s.url) + "</span>" +
            "</span>" +
            '<span class="chev">›</span>' +
          "</button>"
        );
      })
      .join("");
    hintEl.textContent = sources.length + " sources · tap to open";
  }

  function load() {
    fetch("sites.json", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) { render(data.sources); })
      .catch(function (err) {
        hintEl.textContent = "Could not load sources: " + err.message;
      });
  }

  // Open a source in the in-app webview.
  listEl.addEventListener("click", function (e) {
    var card = e.target.closest(".src");
    if (!card) return;
    var url = card.getAttribute("data-url");
    if (url) window.location.href = url;
  });

  // Bottom navigation.
  document.querySelector(".bottombar").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "home") {
      window.location.href = "index.html";
    } else if (action === "refresh") {
      window.location.reload();
    } else if (action === "back") {
      if (window.history.length > 1) window.history.back();
    } else if (action === "share") {
      var payload = { title: "NewsSphere", text: "NewsSphere", url: window.location.href };
      if (navigator.share) {
        navigator.share(payload).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).catch(function () {});
      }
    } else if (action === "about") {
      if (aboutEl && aboutEl.showModal) aboutEl.showModal();
    }
  });

  if (aboutEl) {
    aboutEl.addEventListener("click", function (e) {
      if (e.target.closest('[data-action="close-about"]') || e.target === aboutEl) {
        aboutEl.close();
      }
    });
  }

  // Highlight the Home tab by default.
  var homeBtn = document.querySelector('.navbtn[data-action="home"]');
  if (homeBtn) homeBtn.classList.add("is-active");

  document.addEventListener("DOMContentLoaded", load);
  if (document.readyState !== "loading") load();
})();
