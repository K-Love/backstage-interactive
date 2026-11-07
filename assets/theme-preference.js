/* Backstage Interactive reading-theme preference.
   A small shared controller for the editorial/legal and thank-you pages.
   The homepage currently uses the same storage key with its own controls.
*/
(function () {
  "use strict";
  var root = document.documentElement;
  var key = "backstage-theme";
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var saved = null;
  try { saved = window.localStorage.getItem(key); } catch (error) {}
  var manual = saved === "dark" || saved === "light" ? saved : null;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#07070f" : "#f7f5f0");
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      var button = toggles[i];
      var nextLight = theme === "dark";
      button.setAttribute("aria-label", nextLight ? "Switch to light mode" : "Switch to dark mode");
      var label = button.querySelector(".theme-label");
      var symbol = button.querySelector(".theme-symbol");
      if (label) label.textContent = nextLight ? "Light mode" : "Dark mode";
      if (symbol) symbol.textContent = nextLight ? "☼" : "☾";
    }
  }

  apply(manual || (media && media.matches ? "dark" : "light"));

  function bind() {
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        manual = next;
        try { window.localStorage.setItem(key, next); } catch (error) {}
        apply(next);
      });
    }
    apply(root.getAttribute("data-theme") || "dark");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  if (media) {
    var changed = function (event) {
      if (!manual) apply(event.matches ? "dark" : "light");
    };
    if (media.addEventListener) media.addEventListener("change", changed);
    else if (media.addListener) media.addListener(changed);
  }
})();
