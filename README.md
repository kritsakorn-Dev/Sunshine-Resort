# 🌅 The Sunshine Resort — Koh Kood (Redesign Concept)

A **website redesign** project for [The Sunshine Resort](https://www.thesunshineresortkokut.com/),
a beachfront resort on Ao Phrao Bay, Koh Kood, Trat. It reimagines the original site with a more
**modern** look, a **cinematic dark theme** in sunset tones (red–orange), and plenty of
**interactive touches** for visitors.

> A **static, single-page website** written in pure HTML + CSS + JavaScript.
> No build step, no dependencies to install — just open the file and it works.

---

## 📑 Table of Contents

- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [How to Run](#-how-to-run)
- [Customization](#-customization)
- [Image Sources](#-image-sources)
- [Browser Support](#-browser-support)
- [Future Improvements](#-future-improvements)

---

## 🧰 Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic tags (`header`, `section`, `nav`, `figure`, `footer`) |
| **Styling** | CSS3 | Custom Properties (`:root` variables), Flexbox, CSS Grid, `backdrop-filter`, Keyframe Animations |
| **Behavior** | JavaScript (Vanilla ES6+) | No framework / no external libraries |
| **Fonts** | Google Fonts | `Anton`, `Bebas Neue`, `Poppins`, `Noto Sans Thai` |
| **Images** | Real resort photos + Unsplash | See [Image Sources](#-image-sources) |

**Not used:** Node.js, npm, bundlers (Webpack/Vite), CSS frameworks (Bootstrap/Tailwind) or JS frameworks (React/Vue).
This keeps the project **lightweight, easy to run, and easy to maintain.**

---

## ✨ Key Features

### Page Sections
1. **Hero** — Large "VISIT KOH KOOD" typography over a real beach photo with a parallax effect
2. **Booking Bar** — Pick check-in/check-out dates, number of guests, and room type
3. **Rooms & Rates** — Ranked room cards (1st–4th) with a 3D tilt effect
4. **Explore It Self** — Statistics that count up automatically (animated counters)
5. **Activities Marquee** — A scrolling text strip of resort activities
6. **Gallery** — Masonry image grid; click to view full-size images (Lightbox)
7. **Contact / CTA** — The resort's real contact information
8. **Footer** — Real logo + links + social icons

### Interactions — found in `js/script.js`
- 🖱️ **Custom Cursor** — A custom cursor (dot + ring following the mouse)
- ⏳ **Page Loader** — Loading screen with a sun animation
- 📊 **Scroll Progress Bar** — Progress bar at the top showing scroll position
- 🎬 **Reveal on Scroll** — Content fades in as you scroll (`IntersectionObserver`)
- 🏔️ **Parallax** — Backgrounds move at different speeds to add depth
- 🔢 **Animated Counters** — Stat numbers count up when scrolled into view
- 🎯 **Active Nav Highlight** — Menu highlights the section currently in view
- 🧲 **Magnetic Buttons** — Buttons that attract toward the cursor
- 🃏 **3D Tilt Cards** — Room cards tilt based on cursor position
- 🖼️ **Lightbox** — Open gallery images full-size (close with button / backdrop click / `Esc`)
- 🔔 **Toast Notification** — Alerts when checking room availability
- 📅 **Booking Logic** — Validates dates + calculates the number of nights automatically
- 📱 **Responsive + Mobile Menu** — Hamburger menu that slides in from the side

---

## 📁 Project Structure

```
Sunshine-Resort/
├── index.html          # The entire page structure (single page)
├── css/
│   └── style.css       # All styles + theme variables + responsive + animations
├── js/
│   └── script.js       # All interaction logic (Vanilla JS)
├── assets/
│   └── site/           # Real images pulled from the resort website
│       ├── logo.png        # Real logo (transparent background)
│       ├── favicon.png     # Site icon
│       ├── home-1..4.jpg   # Beach / atmosphere photos (home-1 is used as the Hero)
│       ├── seaview-*.jpg   # Single Seaview rooms
│       ├── garden-*.jpg    # Garden View rooms
│       ├── family-*.png    # Family rooms
│       ├── unseen-*.jpg    # Unseen Sunshine photo set
│       └── over-*.jpg      # Resort overview photo set
└── README.md           # This file
```

---

## 🚀 How to Run

Since it's a purely static site, you can choose whichever method is most convenient:

### Option 1 — Open the file directly (easiest)
Double-click `index.html`, or right-click → Open with → choose a browser.

> ⚠️ **Note:** This works for all features, but some browsers restrict certain things when opened via `file://`.
> Running through a local server (Options 2–4) is recommended for the best results.

### Option 2 — VS Code + Live Server (recommended for development)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The site opens at `http://127.0.0.1:5500/` with auto-reload on file changes

### Option 3 — Python (already installed on most machines)
```bash
# Python 3
python -m http.server 8000
```
Then open your browser at `http://localhost:8000`

### Option 4 — Node.js
```bash
npx serve
# or
npx http-server -p 8000
```

---

## 🎨 Customization

### Change the theme colors
Edit the variables in the `:root` block of `css/style.css`:

```css
:root{
  --bg:#0e0f12;                              /* main background color */
  --text:#f4f5f7;                            /* text color */
  --accent:#ff4332;                          /* primary color (sunset red) */
  --accent-2:#ff8a3d;                        /* secondary color (orange) */
  --accent-grad:linear-gradient(120deg,#ff4332,#ff8a3d);  /* gradient */
  --radius:18px;                             /* corner roundness */
}
```

### Change the images
- **Hero / Explore / CTA images** → edit `css/style.css` in the `.hero-img`, `.explore-bg`, `.cta-bg` classes
- **Room / Gallery images** → edit `index.html` in the `style="--img:url('...')"` and `data-lightbox="..."` attributes

### Change content / text
Edit directly in `index.html` (text, prices, contact info, etc.)

---

## 🖼️ Image Sources

| Section | Source |
|---------|--------|
| **Logo + favicon** | Real images from [thesunshineresortkokut.com](https://www.thesunshineresortkokut.com/) |
| **Hero (main background)** | Real photo — `assets/site/home-1.jpg` (Ao Phrao Bay beach at sunset) |
| **Rooms / Gallery / Explore / CTA** | Photos from [Unsplash](https://unsplash.com/) (used as temporary placeholders) |

> 💡 The `assets/site/` folder contains a full set of real resort photos (rooms, Unseen/Overview gallery).
> To switch all placeholders to real photos, just point the URLs to the files in this folder.

---

## 🌐 Browser Support

Supports all modern browsers (Chrome, Edge, Firefox, Safari).
Uses modern features such as `backdrop-filter`, CSS Grid, and `IntersectionObserver`.
- ✅ Desktop & Mobile (fully responsive across all screen sizes)
- ✅ The custom cursor only appears on devices with a mouse (`hover:hover`) — it's disabled automatically on mobile

---

## 🔮 Future Improvements

- [ ] Integrate a real booking system (Booking Engine / API)
- [ ] Replace all placeholders with real resort photos
- [ ] Add a Thai/English language switcher
- [ ] Add a Google Maps embed in the Location section
- [ ] Add a guest reviews page/section
- [ ] Complete SEO and Open Graph meta tags
- [ ] Optimize images (convert to WebP / lazy-load)

---

## 📞 Resort Contact (from the official website)

- **Address:** 62/3 Ao Phrao, Koh Kood Island, Trat, Thailand
- **Phone (on the island):** +66 (0) 98 287 6112
- **Phone (reservations):** +66 (0) 89 834 0124

---

> This project is a **concept redesign** for presentation purposes — it is not the official production website of the resort.
