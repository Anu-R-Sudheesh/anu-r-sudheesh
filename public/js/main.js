/* ==========================================================================
   Page behaviour
   - Renders project cards from window.SITE_CONTENT (js/content.js)
   - Syncs contact links with content.js
   - Sticky nav state, active section highlight, scroll reveals
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var content = window.SITE_CONTENT || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Project cards ---------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderProjects() {
    var grid = document.getElementById("work-grid");
    if (!grid || !content.projects) return;

    grid.innerHTML = content.projects.map(function (p) {
      var tags = (p.tags || []).map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("");
      return (
        '<li class="card reveal">' +
          '<a class="card__link" href="' + escapeHtml(p.url) + '" target="_blank" rel="noopener">' +
            '<div class="card__media">' +
              '<img src="' + escapeHtml(p.cover) + '" alt="' + escapeHtml(p.alt || p.title) + '" width="800" height="600" loading="lazy" decoding="async" />' +
            "</div>" +
            '<div class="card__body">' +
              (tags ? '<ul class="card__tags" role="list">' + tags + "</ul>" : "") +
              '<h3 class="card__title">' + escapeHtml(p.title) + "</h3>" +
              '<p class="card__desc">' + escapeHtml(p.description) + "</p>" +
              '<span class="card__cta">View on Behance <span class="card__arrow" aria-hidden="true">↗</span>' +
              '<span class="sr-only">(opens in a new tab)</span></span>' +
            "</div>" +
          "</a>" +
        "</li>"
      );
    }).join("");

    // Cursor-following glow on each card
    if (!reduceMotion) {
      grid.querySelectorAll(".card__link").forEach(function (card) {
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", e.clientX - r.left + "px");
          card.style.setProperty("--my", e.clientY - r.top + "px");
        });
      });
    }
  }

  /* ---------- Contact + Behance links ---------- */
  function syncLinks() {
    var c = content.contact || {};
    var set = function (id, href) { var el = document.getElementById(id); if (el && href) el.href = href; };

    set("behance-all", content.behanceProfile);
    set("contact-behance", content.behanceProfile);
    set("contact-linkedin", c.linkedin);
    if (c.email) {
      set("contact-email", "mailto:" + c.email);
      document.querySelector('[data-field="email"]').textContent = c.email;
    }
    if (c.phone) {
      set("contact-phone", "tel:" + (c.phoneHref || c.phone).replace(/\s+/g, ""));
      document.querySelector('[data-field="phone"]').textContent = c.phone;
    }
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Nav: background on scroll + active link ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!("IntersectionObserver" in window)) return;
    var links = document.querySelectorAll(".nav__links a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var active = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("is-active", active);
          if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  }

  renderProjects();
  syncLinks();
  initNav();
  initReveal();
})();
