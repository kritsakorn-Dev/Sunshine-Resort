/* ============================================================
   The Sunshine Resort — interactions
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => $("#loader")?.classList.add("done"), 900);
  });

  /* ---------- Scroll progress + nav state ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = scrolled * 100 + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 40);
    parallax();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Parallax ---------- */
  const parallaxEls = $$("[data-parallax]");
  function parallax() {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const speed = parseFloat(el.dataset.parallax);
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
    });
  }
  parallax();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    io.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const counters = $$(".count");
  const cObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        const isFloat = String(el.dataset.target).includes(".") || suffix === ".4";
        let cur = 0;
        const step = target / 60;
        const tick = () => {
          cur += step;
          if (cur >= target) {
            el.textContent = (suffix === ".4" ? "9.4" : target) + (suffix && suffix !== ".4" ? suffix : "");
            return;
          }
          el.textContent = Math.floor(cur) + (suffix && suffix !== ".4" ? suffix : "");
          requestAnimationFrame(tick);
        };
        tick();
        cObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => cObserver.observe(c));

  /* ---------- Active nav link via section observer ---------- */
  const navLinks = $$(".nav-links a");
  const sections = navLinks
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = "#" + e.target.id;
          navLinks.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const links = $("#navLinks");
  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      burger.classList.remove("open");
      links.classList.remove("open");
    }
  });

  /* ---------- Custom cursor ---------- */
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  if (window.matchMedia("(hover:hover)").matches) {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    window.addEventListener("mousemove", (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
    });
    const follow = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(follow);
    };
    follow();
    $$("a,button,[data-tilt],.g-item,[data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("grow"));
      el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
    });
  }

  /* ---------- 3D tilt on room cards ---------- */
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  $$("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      lightboxImg.src = el.dataset.lightbox;
      lightbox.classList.add("open");
    });
  });
  const closeLB = () => lightbox.classList.remove("open");
  $("#lightboxClose")?.addEventListener("click", closeLB);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLB());

  /* ---------- Toast helper ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  /* ---------- Booking logic ---------- */
  const checkin = $("#checkin");
  const checkout = $("#checkout");
  const today = new Date().toISOString().split("T")[0];
  if (checkin) checkin.min = today;
  if (checkout) checkout.min = today;
  checkin?.addEventListener("change", () => {
    checkout.min = checkin.value;
    if (checkout.value && checkout.value < checkin.value) checkout.value = checkin.value;
  });

  $("#checkBtn")?.addEventListener("click", () => {
    const room = $("#roomtype").value;
    if (!checkin.value || !checkout.value) {
      showToast("⚠ Please select your check-in and check-out dates");
      return;
    }
    const nights = Math.max(
      1,
      Math.round((new Date(checkout.value) - new Date(checkin.value)) / 86400000)
    );
    showToast(`✅ ${room} is available! ${nights} night(s) — our team will contact you to confirm`);
  });

  $("#searchPill")?.addEventListener("click", () => {
    $("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#checkin")?.focus(), 700);
  });
})();
