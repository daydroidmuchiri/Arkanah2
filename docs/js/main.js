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

    /* Lightbox */
    const box = $("#lightbox");
    const boxImg = $("#lightbox img");
    const galImgs = $$(".gal-item img", track);
    let galIndex = 0;
    const showInBox = (i) => {
      galIndex = (i + galImgs.length) % galImgs.length;
      const img = galImgs[galIndex];
      /* data-full = full-res JPEG, so the zoom view never shows the small srcset pick */
      boxImg.src = img.dataset.full || img.currentSrc || img.src;
      boxImg.alt = img.alt;
    };
    track.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      showInBox(galImgs.indexOf(img));
      box.showModal();
    });
    $(".lightbox-close").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => {
      if (e.target === box) box.close();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") showInBox(galIndex + 1);
      if (e.key === "ArrowLeft") showInBox(galIndex - 1);
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

  /* ---------- Contact details, read once from the page ----------
     index.html stays the single place to update when the real number/email
     arrive (see brief.md). Hoisted out of the enquiry-form block because the
     lead strip and docked bar hand off the same way. */
  const waNumber = (($(".wa-float")?.getAttribute("href") || "").match(/wa\.me\/(\d+)/) || [])[1] || "";
  const salesEmail = ($('.contact-rows a[href^="mailto:"]')?.getAttribute("href") || "mailto:").slice(7).split("?")[0];

  /* ---------- Enquiry form → WhatsApp / email handoff ---------- */
  const form = $("#enquiry-form");
  if (form) {
    const status = $(".form-status");
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

  /* ============================================================
     EXPERIMENT — 88 Nairobi-inspired conversion layer
     Branch: experiment/88-inspired-conversion. Not on main.
     ============================================================ */

  /* ---------- Lead forms: strip + docked bar (rec 1) ----------
     Same backend-free handoff as the main enquiry form: three fields, then
     straight to WhatsApp. Nothing is stored on this site. */
  $$("[data-lead-form]").forEach((lead) => {
    const status = $(".lead-status", lead.parentElement);
    lead.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      for (const el of lead.querySelectorAll("[required]")) {
        const valid = el.checkValidity();
        el.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      }
      if (!ok) {
        if (status) status.textContent = "Please complete the highlighted fields.";
        return;
      }
      const d = new FormData(lead);
      const msg = [
        "Hello Nomad Twin Towers,",
        "",
        `My name is ${d.get("name")} and I'd like to register my interest.`,
        "",
        `Phone: ${d.get("phone")}`,
        `Email: ${d.get("email")}`,
      ].join("\n");
      open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      if (status) status.textContent = "Opening WhatsApp — we'll be in touch.";
      lead.reset();
      lead.dispatchEvent(new CustomEvent("lead:sent"));
    });
  });

  /* ---------- Docked lead bar visibility (rec 1b) ----------
     Visible only in the middle of the page: after the hero is behind you, and
     never while the real enquiry form is on screen. Dismissal lasts the tab
     session, so it can't nag someone who has already said no. */
  const dock = $("[data-dock]");
  if (dock && !sessionStorage.getItem("dock-dismissed")) {
    let pastHero = false;
    let atForm = false;
    /* Publish the bar's real height so the WhatsApp float can sit clear of it
       — it changes with breakpoint and with how the preview notice wraps. */
    const measure = () => {
      document.documentElement.style.setProperty("--dock-h", `${dock.offsetHeight}px`);
    };
    const sync = () => {
      dock.hidden = !pastHero || atForm;
      if (!dock.hidden) measure();
    };
    addEventListener("resize", () => {
      if (!dock.hidden) measure();
    }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        ([en]) => {
          pastHero = !en.isIntersecting;
          sync();
        },
        { threshold: 0.15 }
      ).observe($(".hero"));
      new IntersectionObserver(
        ([en]) => {
          atForm = en.isIntersecting;
          sync();
        },
        { threshold: 0.1 }
      ).observe($("#enquire"));
    }
    $("[data-dock-close]").addEventListener("click", () => {
      dock.hidden = true;
      sessionStorage.setItem("dock-dismissed", "1");
    });
    /* A lead that actually went through shouldn't keep being asked for. */
    $("[data-lead-form]", dock).addEventListener("lead:sent", () => {
      setTimeout(() => {
        dock.hidden = true;
        sessionStorage.setItem("dock-dismissed", "1");
      }, 1200);
    });
  }

  /* ---------- Progress bar fill (rec 5) ----------
     Runs in step with the percentage count-up next to it. The inline width in
     the markup keeps the bar correct when JS never arrives. */
  const bar = $("[data-bar-fill]");
  if (bar && !reducedMotion && "IntersectionObserver" in window) {
    const target = `${bar.dataset.barFill}%`;
    bar.style.width = "0";
    bar.style.transition = "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)";
    const bio = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        bar.style.width = target;
        bio.disconnect();
      },
      { threshold: 0.6 }
    );
    bio.observe(bar.closest(".progress-bar-wrap"));
  }

  /* ---------- Testimonial track (rec 4) ---------- */
  const quotes = $(".quote-track");
  if (quotes) {
    const qPrev = $("[data-quote-prev]");
    const qNext = $("[data-quote-next]");
    const qStep = (dir) => {
      const item = quotes.querySelector(".quote");
      const gap = parseFloat(getComputedStyle(quotes).columnGap) || 16;
      quotes.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: reducedMotion ? "auto" : "smooth" });
    };
    qPrev.addEventListener("click", () => qStep(-1));
    qNext.addEventListener("click", () => qStep(1));
    const qSync = () => {
      qPrev.disabled = quotes.scrollLeft < 10;
      qNext.disabled = quotes.scrollLeft > quotes.scrollWidth - quotes.clientWidth - 10;
    };
    quotes.addEventListener("scroll", qSync, { passive: true });
    qSync();
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
