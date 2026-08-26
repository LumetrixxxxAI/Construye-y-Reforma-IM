(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  var WHATSAPP_NUMBER = "34657662637"; // 657 66 26 37

  /* ---------- Header on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu movil ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  var mobileClose = document.querySelector(".mobile-menu-close");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---------- Reveal al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Contadores animados ---------- */
  var counters = document.querySelectorAll(".counter .num");
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.querySelector(".num-value").textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.querySelector(".num-value").textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  /* ---------- Antes / despues: cambio automático ---------- */
  var BA_INTERVAL = 3500; // ms que se muestra cada foto

  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    slider.style.setProperty("--ba-duration", BA_INTERVAL + "ms");
    var showingAfter = false;

    function tick() {
      showingAfter = !showingAfter;
      slider.classList.toggle("show-after", showingAfter);

      // reinicia la barra de progreso
      slider.classList.remove("animate");
      // eslint-disable-next-line no-unused-expressions
      slider.offsetWidth; // fuerza reflow para reiniciar la animación
      slider.classList.add("animate");
    }

    slider.classList.add("animate");
    setInterval(tick, BA_INTERVAL);
  });

  /* ---------- Carrusel de opiniones ---------- */
  var track = document.querySelector(".testi-slides");
  if (track) {
    var slides = track.querySelectorAll(".testi-slide");
    var dotsWrap = document.querySelector(".testi-dots");
    var current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", "Ver opinión " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dotsWrap.querySelectorAll("button").forEach(function (d, idx) {
        d.classList.toggle("active", idx === current);
      });
    }

    setInterval(function () { goTo(current + 1); }, 5500);
  }

  /* ---------- Formulario de presupuesto -> WhatsApp ---------- */
  var budgetForm = document.querySelector("#budget-form");
  if (budgetForm) {
    budgetForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = budgetForm.nombre.value.trim();
      var telefono = budgetForm.telefono.value.trim();
      var tipo = budgetForm.tipo.value;
      var mensaje = budgetForm.mensaje.value.trim();

      var texto =
        "Hola, soy " + nombre + ". Quiero pedir presupuesto para: " + tipo +
        ". Mi teléfono es " + telefono +
        (mensaje ? ". Detalles: " + mensaje : "") + ".";

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank");
    });
  }

  /* ---------- Banner de cookies ---------- */
  var cookieBanner = document.querySelector("#cookie-banner");
  if (cookieBanner) {
    var KEY = "cri_cookie_consent";
    if (!localStorage.getItem(KEY)) {
      setTimeout(function () { cookieBanner.classList.add("is-visible"); }, 900);
    }
    cookieBanner.querySelectorAll("[data-cookie]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem(KEY, btn.getAttribute("data-cookie"));
        cookieBanner.classList.remove("is-visible");
      });
    });
  }

  /* ---------- Año en footer ---------- */
  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
