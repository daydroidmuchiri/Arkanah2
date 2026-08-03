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

  /* ---------- Hero parallax ----------
     The render drifts at 82% of scroll speed as the hero leaves, so the tower
     separates from the copy on the way out. The rest of the scroll-linked
     motion is pure CSS (see "Scroll-linked motion" in main.css); this one is in
     JS because it is the piece you actually notice, and CSS scroll-driven
     animation is still missing in Firefox.

     Pure translate, no scale: the art is inset:0 on a hero that clips, and
     shifting it down by 0.18 × scrollY always leaves the top edge at -0.82 ×
     scrollY — still above the hero's top — so no gap can open, and the phone
     crop is not tightened (which would undo the point of the hero rework). */
  const hero = $(".hero");
  const heroArt = $(".hero-art");
  if (hero && heroArt && !reducedMotion) {
    let queued = false;
    const applyParallax = () => {
      queued = false;
      const limit = hero.offsetHeight;
      const y = Math.min(scrollY, limit); /* stop once the hero is fully past */
      heroArt.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
    };
    addEventListener(
      "scroll",
      () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(applyParallax);
      },
      { passive: true }
    );
    applyParallax();
  }

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

  /* ---------- Film: click the poster to play ----------
     With preload="none" and native controls, only the small play button at
     bottom-left starts playback — clicking the middle of a 992px cinematic
     poster does nothing, which is where most people click first (confirmed in
     a real browser 2026-07-31: readyState stayed 0). This toggles play on a
     click anywhere except the native control strip, which is left alone so the
     scrubber, volume and fullscreen keep working. */
  const film = $(".film");
  if (film) {
    const CONTROLS_H = 48; /* native control strip, approx */
    film.addEventListener("click", (e) => {
      const r = film.getBoundingClientRect();
      if (e.clientY > r.bottom - CONTROLS_H) return;
      if (film.paused) film.play().catch(() => {}); /* rejects if the browser blocks it */
      else film.pause();
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
        /* The article lives in the <option value>, not here — "a Retail Shop"
           but "the Investment Portfolio". Hardcoding "a" produced "a Investment
           Portfolio", and before 2026-08-03 the select could not name a shop or
           a hotel suite at all, so those enquiries arrived labelled as whichever
           residence happened to be first in the list. */
        `My name is ${d.get("name")}. I would like to enquire about ${d.get("unit")}.`,
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

    /* Each product card's CTA carries data-unit, so arriving at the form from
       "Request Shop Details" preselects Retail Shop rather than leaving the
       buyer on the first option. Matches on the option's value, and only sets
       what actually exists — an unmatched data-unit leaves the select alone
       rather than blanking it. */
    const unitField = $("#f-unit");
    if (unitField) {
      for (const trigger of document.querySelectorAll("a[data-unit]")) {
        trigger.addEventListener("click", () => {
          const wanted = trigger.getAttribute("data-unit");
          if ([...unitField.options].some((o) => o.value === wanted)) unitField.value = wanted;
        });
      }
    }
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
