(function () {
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");

    var groups = [
      document.querySelectorAll(".fitur-card"),
      document.querySelectorAll(".spec-card"),
      document.querySelectorAll(".unduh-card")
    ];

    for (var g = 0; g < groups.length; g++) {
      var list = groups[g];
      for (var i = 0; i < list.length; i++) {
        list[i].classList.add("reveal");
        list[i].style.setProperty("--i", String(i % 6));
      }
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting) {
          entries[e].target.classList.add("is-in");
          obs.unobserve(entries[e].target);
        }
      }
    }, {
      threshold: 0.01,
      rootMargin: "0px 0px 120px 0px"
    });

    var reveals = document.querySelectorAll(".reveal");
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var r = 0; r < reveals.length; r++) {
      var rect = reveals[r].getBoundingClientRect();
      if (rect.top < vh + 120) {
        reveals[r].classList.add("is-in");
      } else {
        observer.observe(reveals[r]);
      }
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    var boxes = document.querySelectorAll(".code-box");
    for (var b = 0; b < boxes.length; b++) {
      (function (box) {
        var pre = box.querySelector("pre");
        if (!pre) return;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = "Copy";
        btn.setAttribute("aria-label", "Copy code to clipboard");

        btn.addEventListener("click", function () {
          var text = (pre.textContent || "").trim();
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = "Copied";
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.textContent = "Copy";
              btn.classList.remove("is-copied");
            }, 1800);
          });
        });

        box.appendChild(btn);
      })(boxes[b]);
    }
  }
})();

// hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!toggleBtn || !primaryNav) return;

  const setMenuState = (open) => {
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    primaryNav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (e) => {
    if (!primaryNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenuState(false);
  });
});
