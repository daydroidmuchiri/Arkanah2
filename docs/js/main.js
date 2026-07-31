/* Nomad Twin Towers — vanilla JS, no dependencies.
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
  const closeNav = (refocus = false) => {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    header.classList.remove("menu-open");
    document.body.style.overflow = "";
    if (refocus) toggle.focus();
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("is-open", !open);
    /* .site-header's backdrop-filter (added once scrolled) creates a new
       containing block for fixed-position descendants, so the fullscreen
       nav's `position: fixed; inset: 0` would size itself to the header's
       own small box instead of the viewport — drop the filter while open. */
    header.classList.toggle("menu-open", !open);
    document.body.style.overflow = open ? "" : "hidden";
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) closeNav(true);
    /* keep keyboard focus inside the fullscreen nav while it is open */
    if (e.key === "Tab" && links.classList.contains("is-open")) {
      const focusables = [toggle, ...$$("a", links)];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
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

  /* ---------- Residence cards: photo / floor plan toggle ---------- */
  $$(".res-toggle").forEach((toggle) => {
    const figure = toggle.closest("figure");
    const buttons = $$("button", toggle);
    const images = $$("img[data-view-img]", figure);
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        images.forEach((img) => (img.hidden = img.dataset.viewImg !== view));
      });
    });
  });

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

    /* Lightbox — shared by the Amenities highlights and the Gallery (2026-07-31).
       Both feed one sequence in document order, so the arrow keys walk the whole
       set rather than stopping at the end of whichever section was clicked. */
    const box = $("#lightbox");
    const boxImg = $("#lightbox img");
    const galImgs = $$(".amen-highlight img, .gal-item img");
    let galIndex = 0;
    const FADE_MS = 240; /* keep in step with the .lightbox img transition */

    const showInBox = (i, instant) => {
      galIndex = (i + galImgs.length) % galImgs.length;
      const img = galImgs[galIndex];
      /* data-full = full-res JPEG, so the zoom view never shows the small srcset pick */
      const src = img.dataset.full || img.currentSrc || img.src;
      const apply = () => {
        boxImg.src = src;
        boxImg.alt = img.alt;
      };
      if (instant || reducedMotion) {
        boxImg.classList.remove("is-swapping");
        apply();
        return;
      }
      boxImg.classList.add("is-swapping");
      /* Wait for the fade-out AND the decode. Without the timer, a cached image
         resolves instantly and swaps mid-fade, which looks like a hard cut. */
      const decoded = new Promise((res) => {
        const pre = new Image();
        pre.onload = pre.onerror = res;
        pre.src = src;
      });
      const faded = new Promise((res) => setTimeout(res, FADE_MS));
      Promise.all([decoded, faded]).then(() => {
        apply();
        /* decode() resolves once the new frame is paintable, so the fade-in
           never reveals the previous image. Falls back cleanly if it rejects —
           an unremoved .is-swapping would leave the photo invisible. */
        const settle = () => boxImg.classList.remove("is-swapping");
        (boxImg.decode ? boxImg.decode().catch(() => {}) : Promise.resolve()).then(settle);
      });
    };

    const openAt = (img) => {
      showInBox(galImgs.indexOf(img), true);
      box.showModal();
    };
    /* Delegated from the document so both sections are covered by one handler. */
    document.addEventListener("click", (e) => {
      const img = e.target.closest(".amen-highlight img, .gal-item img");
      if (img) openAt(img);
    });
    /* The triggers are plain <img>, so give them keyboard equivalence rather
       than leaving 24 images mouse-only. */
    galImgs.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openAt(img);
        }
      });
    });

    $(".lightbox-close").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => {
      if (e.target === box) box.close();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") showInBox(galIndex + 1);
      if (e.key === "ArrowLeft") showInBox(galIndex - 1);
    });
    /* Focus the tile currently being viewed — which after arrowing is not the
       one that opened the box — so keyboard users land where they left off
       instead of at the top of the document. */
    box.addEventListener("close", () => {
      galImgs[galIndex]?.focus({ preventScroll: true });
    });
  }

  /* ---------- Map facade: load iframe only on request ---------- */
  const mapBtn = $("[data-load-map]");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      const facade = mapBtn.closest(".map-facade");
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://www.openstreetmap.org/export/embed.html?bbox=36.8389%2C-1.2882%2C36.8589%2C-1.2732&layer=mapnik&marker=-1.280676%2C36.848874";
      iframe.title = "Map of Nomad Twin Towers, Eastleigh, Nairobi";
      iframe.loading = "lazy";
      facade.innerHTML = "";
      facade.appendChild(iframe);
    });
  }

  /* ---------- Enquiry form → WhatsApp / email handoff ---------- */
  const form = $("#enquiry-form");
  if (form) {
    const status = $(".form-status");
    /* Contact details are read from the page so index.html is the single
       place to update when the real number/email arrive (see brief.md). */
    const waNumber = (($(".wa-float")?.getAttribute("href") || "").match(/wa\.me\/(\d+)/) || [])[1] || "";
    const salesEmail = ($('.contact-rows a[href^="mailto:"]')?.getAttribute("href") || "mailto:").slice(7).split("?")[0];
    const buildMessage = () => {
      const d = new FormData(form);
      return [
        "Hello Nomad Twin Towers,",
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
      location.href = `mailto:${salesEmail}?subject=${encodeURIComponent(
        "Enquiry — Nomad Twin Towers"
      )}&body=${encodeURIComponent(buildMessage())}`;
      status.textContent = "Opening your email app…";
    });
    $("[data-send-wa]").addEventListener("click", () => {
      if (!validate()) return;
      open(`https://wa.me/${waNumber}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp…";
    });
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
