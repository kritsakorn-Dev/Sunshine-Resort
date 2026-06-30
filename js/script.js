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

  /* ---------- 3D tilt on room cards ---------- */
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${px * 3.5}deg) rotateX(${-py * 3.5}deg) translateY(-5px)`;
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
    showToast(`${room} is available! ${nights} night(s) — our team will contact you to confirm`);
  });

  /* ---------- Search overlay ---------- */
  const searchData = [
    { title: "Book Now", desc: "Check availability & rates", target: "#booking", keys: "book booking reserve availability check in out date rate" },
    { title: "Rooms & Rates", desc: "Seaview · Garden · Family", target: "#rooms", keys: "room rooms rate price stay bed seaview garden family single night" },
    { title: "The Experience", desc: "Ao Phrao Bay · facilities", target: "#experience", keys: "experience facilities beach sand snorkel jungle coconut unseen" },
    { title: "Our Story & Location", desc: "Family-run since 2009 · piers", target: "#location", keys: "story location history family pier ferry village temple school how to get" },
    { title: "Unseen Sunshine Gallery", desc: "Photos · night sky · hidden bays", target: "#gallery", keys: "gallery photo photos image unseen night sky star bay sunset" },
    { title: "Contact Us", desc: "Phone · email · address", target: "#contact", keys: "contact phone email address reservation reservations call message map" },
  ];

  const searchOverlay = $("#searchOverlay");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");

  const renderResults = (q) => {
    const query = q.trim().toLowerCase();
    const matches = !query
      ? searchData
      : searchData.filter(
          (it) =>
            (it.title + " " + it.desc + " " + it.keys).toLowerCase().includes(query)
        );
    searchResults.innerHTML = matches.length
      ? matches
          .map(
            (it) =>
              `<li><a href="${it.target}" data-search-link><span class="r-title">${it.title}</span><span class="r-desc">${it.desc}</span></a></li>`
          )
          .join("")
      : `<li class="search-empty">No results for “${q}”. Try “rooms”, “gallery” or “location”.</li>`;
  };

  const openSearch = () => {
    if (!searchOverlay) return;
    renderResults("");
    searchOverlay.classList.add("open");
    setTimeout(() => searchInput?.focus(), 250);
  };
  const closeSearch = () => searchOverlay?.classList.remove("open");

  $("#searchPill")?.addEventListener("click", openSearch);
  $("#searchClose")?.addEventListener("click", closeSearch);
  searchInput?.addEventListener("input", (e) => renderResults(e.target.value));
  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
    const link = e.target.closest("[data-search-link]");
    if (link) {
      e.preventDefault();
      closeSearch();
      const el = $(link.getAttribute("href"));
      setTimeout(() => el?.scrollIntoView({ behavior: "smooth" }), 200);
    }
  });
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = searchResults.querySelector("[data-search-link]");
      if (first) {
        closeSearch();
        const el = $(first.getAttribute("href"));
        setTimeout(() => el?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    }
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeSearch());
})();
