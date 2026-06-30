# 🌅 The Sunshine Resort — Koh Kood (Redesign Concept)

โปรเจกต์ **ออกแบบเว็บไซต์ใหม่ (Redesign)** ให้กับ [The Sunshine Resort](https://www.thesunshineresortkokut.com/)
รีสอร์ทริมหาดอ่าวพร้าว เกาะกูด จังหวัดตราด โดยปรับโฉมจากเว็บเดิมให้มีความ **ทันสมัย (modern)**,
สไตล์ **cinematic dark theme** โทนสีพระอาทิตย์ (แดง–ส้ม) และเพิ่ม **ลูกเล่นโต้ตอบกับผู้ใช้ (interactive)** จำนวนมาก

> เป็นเว็บไซต์ **Static (หน้าเดียว / Single Page)** ที่เขียนด้วย HTML + CSS + JavaScript ล้วน ๆ
> ไม่มี build step ไม่ต้องติดตั้ง dependency ใด ๆ เปิดไฟล์แล้วใช้งานได้ทันที

---

## 📑 สารบัญ

- [Tech Stack](#-tech-stack)
- [ฟีเจอร์เด่น](#-ฟีเจอร์เด่น)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [วิธีการรัน](#-วิธีการรัน)
- [การปรับแต่ง (Customization)](#-การปรับแต่ง-customization)
- [แหล่งที่มาของรูปภาพ](#-แหล่งที่มาของรูปภาพ)
- [การรองรับเบราว์เซอร์](#-การรองรับเบราว์เซอร์)
- [สิ่งที่พัฒนาต่อได้](#-สิ่งที่พัฒนาต่อได้ในอนาคต)

---

## 🧰 Tech Stack

| ส่วน | เทคโนโลยีที่ใช้ | รายละเอียด |
|------|----------------|-----------|
| **โครงสร้าง (Markup)** | HTML5 | Semantic tags (`header`, `section`, `nav`, `figure`, `footer`) |
| **สไตล์ (Styling)** | CSS3 | Custom Properties (ตัวแปร `:root`), Flexbox, CSS Grid, `backdrop-filter`, Keyframe Animations |
| **โต้ตอบ (Behavior)** | JavaScript (Vanilla ES6+) | ไม่ใช้ framework / ไม่มี library ภายนอก |
| **ฟอนต์** | Google Fonts | `Anton`, `Bebas Neue`, `Poppins`, `Noto Sans Thai` |
| **รูปภาพ** | รูปจริงจากเว็บรีสอร์ท + Unsplash | ดูหัวข้อ [แหล่งที่มาของรูปภาพ](#-แหล่งที่มาของรูปภาพ) |

**ไม่มีการใช้:** Node.js, npm, bundler (Webpack/Vite), CSS framework (Bootstrap/Tailwind) หรือ JS framework (React/Vue)
ทำให้โปรเจกต์ **เบา รันง่าย และดูแลรักษาง่าย**

---

## ✨ ฟีเจอร์เด่น

### ส่วนของหน้าเว็บ (Sections)
1. **Hero** — ตัวอักษรขนาดใหญ่ "VISIT KOH KOOD" บนพื้นหลังภาพหาดจริง พร้อมเอฟเฟกต์ Parallax
2. **Booking Bar** — แถบจองห้องพัก เลือกวันเช็คอิน/เช็คเอาท์ จำนวนผู้เข้าพัก และประเภทห้อง
3. **Rooms & Rates** — การ์ดห้องพักแบบจัดอันดับ (1st–4th) พร้อมเอฟเฟกต์เอียง 3D
4. **Explore It Self** — ตัวเลขสถิติที่นับขึ้นอัตโนมัติ (animated counters)
5. **Activities Marquee** — แถบข้อความวิ่งของกิจกรรมต่าง ๆ
6. **Gallery** — กริดรูปภาพแบบ masonry คลิกเพื่อดูภาพขนาดใหญ่ (Lightbox)
7. **Contact / CTA** — ข้อมูลติดต่อจริงของรีสอร์ท
8. **Footer** — โลโก้จริง + ลิงก์ + โซเชียล

### ลูกเล่นโต้ตอบ (Interactions) — อยู่ใน `js/script.js`
- 🖱️ **Custom Cursor** — เคอร์เซอร์กำหนดเอง (จุด + วงแหวนตามเมาส์)
- ⏳ **Page Loader** — หน้าจอโหลดพร้อมอนิเมชันดวงอาทิตย์
- 📊 **Scroll Progress Bar** — แถบแสดงความคืบหน้าการเลื่อนหน้าด้านบน
- 🎬 **Reveal on Scroll** — เนื้อหาค่อย ๆ ปรากฏเมื่อเลื่อนถึง (`IntersectionObserver`)
- 🏔️ **Parallax** — พื้นหลังเลื่อนคนละความเร็วเพื่อสร้างมิติ
- 🔢 **Animated Counters** — ตัวเลขสถิตินับขึ้นเมื่อเลื่อนถึง
- 🎯 **Active Nav Highlight** — เมนูไฮไลต์ตาม section ที่กำลังดูอยู่
- 🧲 **Magnetic Buttons** — ปุ่มดูดเข้าหาเมาส์
- 🃏 **3D Tilt Cards** — การ์ดห้องพักเอียงตามตำแหน่งเมาส์
- 🖼️ **Lightbox** — เปิดดูรูปแกลเลอรีขนาดใหญ่ (ปิดด้วยปุ่ม/คลิกพื้นหลัง/กด `Esc`)
- 🔔 **Toast Notification** — แจ้งเตือนเมื่อตรวจสอบห้องว่าง
- 📅 **Booking Logic** — ตรวจสอบวันที่ + คำนวณจำนวนคืนอัตโนมัติ
- 📱 **Responsive + Mobile Menu** — เมนู hamburger สไลด์เข้าจากด้านข้าง

---

## 📁 โครงสร้างโปรเจกต์

```
Sunshine-Resort/
├── index.html          # โครงสร้างหน้าเว็บทั้งหมด (Single Page)
├── css/
│   └── style.css       # สไตล์ทั้งหมด + ตัวแปรธีม + responsive + animations
├── js/
│   └── script.js       # ลอจิกการโต้ตอบทั้งหมด (Vanilla JS)
├── assets/
│   └── site/           # รูปภาพจริงที่ดึงมาจากเว็บไซต์รีสอร์ท
│       ├── logo.png        # โลโก้จริง (พื้นหลังโปร่งใส)
│       ├── favicon.png     # ไอคอนเว็บ
│       ├── home-1..4.jpg   # ภาพหาด/บรรยากาศ (home-1 ใช้เป็น Hero)
│       ├── seaview-*.jpg   # ห้อง Single Seaview
│       ├── garden-*.jpg    # ห้อง Garden View
│       ├── family-*.png    # ห้อง Family
│       ├── unseen-*.jpg    # ชุดภาพ Unseen Sunshine
│       └── over-*.jpg      # ชุดภาพ Overview รีสอร์ท
└── README.md           # ไฟล์นี้
```

---

## 🚀 วิธีการรัน

เนื่องจากเป็นเว็บ static ล้วน มีหลายวิธีให้เลือกตามสะดวก:

### วิธีที่ 1 — เปิดไฟล์ตรง ๆ (ง่ายสุด)
ดับเบิลคลิกที่ `index.html` หรือคลิกขวา → Open with → เลือกเบราว์เซอร์

> ⚠️ **หมายเหตุ:** วิธีนี้ใช้งานได้ครบทุกฟีเจอร์ แต่บางเบราว์เซอร์อาจจำกัดบางอย่างเมื่อเปิดผ่าน `file://`
> แนะนำให้รันผ่าน local server (วิธีที่ 2–4) เพื่อผลลัพธ์ที่ดีที่สุด

### วิธีที่ 2 — VS Code + Live Server (แนะนำสำหรับพัฒนา)
1. ติดตั้ง extension **Live Server** ใน VS Code
2. คลิกขวาที่ `index.html` → **Open with Live Server**
3. เว็บจะเปิดที่ `http://127.0.0.1:5500/` พร้อม auto-reload เมื่อแก้ไฟล์

### วิธีที่ 3 — Python (มีติดตั้งอยู่แล้วในเครื่องส่วนใหญ่)
```bash
# Python 3
python -m http.server 8000
```
แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

### วิธีที่ 4 — Node.js
```bash
npx serve
# หรือ
npx http-server -p 8000
```

---

## 🎨 การปรับแต่ง (Customization)

### เปลี่ยนสีธีม
แก้ที่ตัวแปรในส่วน `:root` ของไฟล์ `css/style.css`:

```css
:root{
  --bg:#0e0f12;                              /* สีพื้นหลังหลัก */
  --text:#f4f5f7;                            /* สีตัวอักษร */
  --accent:#ff4332;                          /* สีหลัก (แดงพระอาทิตย์) */
  --accent-2:#ff8a3d;                        /* สีรอง (ส้ม) */
  --accent-grad:linear-gradient(120deg,#ff4332,#ff8a3d);  /* ไล่เฉด */
  --radius:18px;                             /* ความมนของขอบ */
}
```

### เปลี่ยนรูปภาพ
- **รูป Hero / Explore / CTA** → แก้ใน `css/style.css` ที่คลาส `.hero-img`, `.explore-bg`, `.cta-bg`
- **รูปห้องพัก / แกลเลอรี** → แก้ใน `index.html` ที่ attribute `style="--img:url('...')"` และ `data-lightbox="..."`

### เปลี่ยนเนื้อหา/ข้อความ
แก้ได้โดยตรงในไฟล์ `index.html` (ข้อความ ราคา ข้อมูลติดต่อ ฯลฯ)

---

## 🖼️ แหล่งที่มาของรูปภาพ

| ส่วน | แหล่งที่มา |
|------|-----------|
| **โลโก้ + favicon** | รูปจริงจาก [thesunshineresortkokut.com](https://www.thesunshineresortkokut.com/) |
| **Hero (พื้นหลังหลัก)** | รูปจริง — `assets/site/home-1.jpg` (ภาพหาดอ่าวพร้าวยามพระอาทิตย์ตก) |
| **ห้องพัก / แกลเลอรี / Explore / CTA** | รูปจาก [Unsplash](https://unsplash.com/) (ใช้เป็นภาพประกอบชั่วคราว) |

> 💡 ในโฟลเดอร์ `assets/site/` มีรูปจริงของรีสอร์ทเก็บไว้ครบ (ห้องพัก, แกลเลอรี Unseen/Overview)
> หากต้องการเปลี่ยนภาพประกอบให้เป็นรูปจริงทั้งหมด สามารถสลับ URL มาชี้ที่ไฟล์ในโฟลเดอร์นี้ได้ทันที

---

## 🌐 การรองรับเบราว์เซอร์

รองรับเบราว์เซอร์รุ่นใหม่ทั้งหมด (Chrome, Edge, Firefox, Safari)
ใช้ฟีเจอร์สมัยใหม่อย่าง `backdrop-filter`, CSS Grid, `IntersectionObserver`
- ✅ Desktop & Mobile (responsive ครบทุกขนาดจอ)
- ✅ Custom cursor จะแสดงเฉพาะอุปกรณ์ที่มีเมาส์ (`hover:hover`) — บนมือถือจะปิดอัตโนมัติ

---

## 🔮 สิ่งที่พัฒนาต่อได้ในอนาคต

- [ ] เชื่อมระบบจองห้องพักจริง (Booking Engine / API)
- [ ] เปลี่ยนภาพประกอบทั้งหมดเป็นรูปจริงของรีสอร์ท
- [ ] เพิ่มระบบสลับภาษา ไทย/อังกฤษ
- [ ] เพิ่มแผนที่ Google Maps ในส่วน Location
- [ ] เพิ่มหน้า/section รีวิวจากผู้เข้าพัก
- [ ] ทำ SEO และ Open Graph meta tags ให้ครบ
- [ ] Optimize รูปภาพ (แปลงเป็น WebP / lazy-load)

---

## 📞 ข้อมูลติดต่อรีสอร์ท (อ้างอิงจากเว็บจริง)

- **ที่อยู่:** 62/3 อ่าวพร้าว เกาะกูด จังหวัดตราด
- **โทร (บนเกาะ):** +66 (0) 98 287 6112
- **โทร (สำรองห้องพัก):** +66 (0) 89 834 0124

---

> โปรเจกต์นี้เป็น **concept redesign** เพื่อการนำเสนอ — ไม่ใช่เว็บไซต์ production อย่างเป็นทางการของรีสอร์ท
