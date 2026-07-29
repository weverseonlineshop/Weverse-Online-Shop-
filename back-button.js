(function () {
  "use strict";

  var path = window.location.pathname;
  if (path === "/" || path === "/index.html") return;

  function goBack(e) {
    if (e) e.preventDefault();
    if (window.history.length > 1) {
      var navigated = false;
      var onHide = function () { navigated = true; };
      window.addEventListener("pagehide", onHide);
      window.addEventListener("unload", onHide);
      window.history.back();
      setTimeout(function () {
        if (!navigated) window.location.href = "/";
      }, 300);
    } else {
      window.location.href = "/";
    }
  }

  function createBackButton() {
    var existing = document.getElementById("back-to-home");
    if (existing) {
      existing.addEventListener("click", goBack);
      return;
    }
    if (document.getElementById("kco-back-btn")) return;

    var btn = document.createElement("button");
    btn.id = "kco-back-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Go back");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .25s ease">' +
      '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg><span>Back</span>';

    btn.style.cssText = [
      "position:fixed",
      "top:4.75rem",
      "left:1rem",
      "z-index:45",
      "display:inline-flex",
      "align-items:center",
      "gap:.5rem",
      "padding:.5rem .85rem",
      "border-radius:9999px",
      "border:1px solid rgba(59,130,246,.25)",
      "background:rgba(10,17,36,.8)",
      "backdrop-filter:blur(12px)",
      "-webkit-backdrop-filter:blur(12px)",
      "color:#93c5fd",
      "font-family:Inter,system-ui,-apple-system,sans-serif",
      "font-size:.8rem",
      "font-weight:600",
      "cursor:pointer",
      "box-shadow:0 4px 16px rgba(0,0,0,.35)",
      "transition:background .25s ease,color .25s ease,border-color .25s ease,transform .2s ease,box-shadow .25s ease",
      "-webkit-tap-highlight-color:transparent",
      "outline:none",
      "white-space:nowrap"
    ].join(";");

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "rgba(59,130,246,.15)";
      btn.style.borderColor = "rgba(96,165,250,.5)";
      btn.style.color = "#fff";
      btn.style.boxShadow = "0 6px 22px rgba(59,130,246,.25)";
      btn.style.transform = "translateX(-2px)";
      var svg = btn.querySelector("svg");
      if (svg) svg.style.transform = "translateX(-3px)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "rgba(10,17,36,.8)";
      btn.style.borderColor = "rgba(59,130,246,.25)";
      btn.style.color = "#93c5fd";
      btn.style.boxShadow = "0 4px 16px rgba(0,0,0,.35)";
      btn.style.transform = "translateX(0)";
      var svg = btn.querySelector("svg");
      if (svg) svg.style.transform = "translateX(0)";
    });
    btn.addEventListener("mousedown", function () { btn.style.transform = "scale(.96)"; });
    btn.addEventListener("mouseup", function () { btn.style.transform = "translateX(-2px)"; });
    btn.addEventListener("click", goBack);

    function adjustPosition() {
      var sidebar = document.querySelector("aside#sidebar");
      var isDesktop = window.innerWidth >= 1024;
      var isMobile = window.innerWidth <= 640;

      if (isMobile) {
        btn.style.top = "4.25rem";
        btn.style.left = ".85rem";
        btn.style.padding = ".45rem .7rem";
        btn.style.fontSize = ".75rem";
        var s1 = btn.querySelector("svg");
        if (s1) { s1.setAttribute("width", "16"); s1.setAttribute("height", "16"); }
      } else {
        btn.style.top = "4.75rem";
        btn.style.padding = ".5rem .85rem";
        btn.style.fontSize = ".8rem";
        var s2 = btn.querySelector("svg");
        if (s2) { s2.setAttribute("width", "18"); s2.setAttribute("height", "18"); }
        if (sidebar && isDesktop) {
          btn.style.left = "17rem";
        } else {
          btn.style.left = "1rem";
        }
      }
    }

    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createBackButton);
  } else {
    createBackButton();
  }
})();
