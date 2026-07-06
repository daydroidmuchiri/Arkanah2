/* Nomad Towers — vanilla JS, no dependencies.
   Everything is progressive enhancement: the page is fully usable without it. */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header state ---------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("is-open", !open);
    document.body.style.overflow = open ? "" : "hidden";
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Reveal on scroll ---------- */
  if (!reducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Stat count-up ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-KE");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counters = $$("[data-count]");
  if (counters.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      counters.forEach((el) => (el.textContent = parseFloat(el.dataset.count).toLocaleString("en-KE")));
    } else {
      const cio = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              animateCount(en.target);
              cio.unobserve(en.target);
            }
          }
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
    }
  }

  /* ---------- Gallery: snap carousel + buttons ---------- */
  const track = $(".gallery-track");
  if (track) {
    const prev = $("[data-gal-prev]");
    const next = $("[data-gal-next]");
    const stepBy = (dir) => {
      const item = track.querySelector(".gal-item");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      track.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: reducedMotion ? "auto" : "smooth" });
    };
    prev.addEventListener("click", () => stepBy(-1));
    next.addEventListener("click", () => stepBy(1));
    const syncBtns = () => {
      prev.disabled = track.scrollLeft < 10;
      next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 10;
    };
    track.addEventListener("scroll", syncBtns, { passive: true });
    syncBtns();

    /* Lightbox */
    const box = $("#lightbox");
    const boxImg = $("#lightbox img");
    track.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      box.showModal();
    });
    $(".lightbox-close").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => {
      if (e.target === box) box.close();
    });
  }

  /* ---------- Map facade: load iframe only on request ---------- */
  const mapBtn = $("[data-load-map]");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      const facade = mapBtn.closest(".map-facade");
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://www.openstreetmap.org/export/embed.html?bbox=36.795%2C-1.272%2C36.815%2C-1.258&layer=mapnik&marker=-1.265%2C36.805";
      iframe.title = "Map of Westlands, Nairobi";
      iframe.loading = "lazy";
      facade.innerHTML = "";
      facade.appendChild(iframe);
    });
  }

  /* ---------- Enquiry form → WhatsApp / email handoff ---------- */
  const form = $("#enquiry-form");
  if (form) {
    const status = $(".form-status");
    const buildMessage = () => {
      const d = new FormData(form);
      return [
        "Hello Nomad Towers,",
        "",
        `My name is ${d.get("name")}. I would like to enquire about a ${d.get("unit")}.`,
        d.get("message") ? `\n${d.get("message")}` : "",
        "",
        `Phone: ${d.get("phone")}`,
        `Email: ${d.get("email")}`,
      ].join("\n");
    };
    const validate = () => {
      let ok = true;
      for (const el of form.querySelectorAll("[required]")) {
        const valid = el.checkValidity();
        el.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      }
      if (!ok) status.textContent = "Please complete the highlighted fields.";
      return ok;
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      location.href = `mailto:sales@nomadtowers.co.ke?subject=${encodeURIComponent(
        "Enquiry — Nomad Towers"
      )}&body=${encodeURIComponent(buildMessage())}`;
      status.textContent = "Opening your email app…";
    });
    $("[data-send-wa]").addEventListener("click", () => {
      if (!validate()) return;
      open(`https://wa.me/254700000000?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp…";
    });
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
