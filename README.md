# Xpora — MVP, Fitur & Routing Plan
> **Platform:** React.js Web App (B2B Export Aggregator for Indonesian UMKM)
> **Dokumen ini dibagi menjadi task-task yang dapat dieksekusi secara bertahap.**

---

## Ringkasan Proyek

**Xpora** adalah platform B2B ekspor berbasis AI yang berperan sebagai **orkestrator rantai pasok** (Supply Chain Orchestrator). Sistem ini menghubungkan buyer asing dengan puluhan UMKM lokal secara kolektif, memecah MOQ (Minimum Order Quantity) besar menjadi kuota terdistribusi, dengan dukungan Computer Vision QC dan Virtual SDR berbasis LLM.

### Dua Sisi Pengguna (Two-Sided Platform)
| Sisi | Pengguna | Channel Utama |
|---|---|---|
| **Supply** | UMKM Desa (Produsen) | WhatsApp API |
| **Demand** | Buyer B2B Global | Portal Web B2B (SEO-first) |
| **Operasional** | Admin / Pengurus Konsorsium | Command Center Dashboard |

---

## Strategi MVP

> [!IMPORTANT]
> MVP Xpora berfokus pada **memvalidasi demand** dan **membangun kepercayaan buyer**. Fitur AI dan QC fisik adalah roadmap lanjutan setelah revenue terkonfirmasi.

### Prinsip MVP: "Fake It Till You Make It" yang Terstruktur
- **MVP = Portal B2B Storefront + RFQ System + Admin Command Center**
- Semua proses negosiasi & distribusi awalnya bisa manual di balik layar
- AI/LLM dan Computer Vision diintroduksi di fase berikutnya

---

## Routing Architecture

```
/ (Root) - Buyer Dashboard (Post-Login)
├── /                          → Buyer Dashboard Overview
├── /products                  → Product Catalog (Dashboard View)
├── /products/:slug            → Product Detail Page (Dashboard)
├── /orders                    → Buyer Orders History
├── /orders/:id                → Order Detail
├── /rfq                       → RFQ Form (Dashboard)
├── /rfq/success               → RFQ Submission Confirmation
├── /profile                   → Buyer Profile Settings
│
├── /public                    → Public Landing Page (SEO-optimized, Pre-Login)
│   ├── /public/               → Landing Page
│   ├── /public/products       → Public Product Catalog
│   ├── /public/products/:slug → Public Product Detail
│   ├── /public/rfq            → Public RFQ Form
│   └── /public/rfq/success    → Public RFQ Confirmation
│
├── /admin                     → Admin Login
│   ├── /admin/dashboard       → Command Center (Overview)
│   ├── /admin/orders          → Pipeline Pesanan (RFQ & PO)
│   ├── /admin/orders/:id      → Detail Order
│   ├── /admin/umkm            → Database UMKM
│   ├── /admin/umkm/:id        → Profil UMKM Detail
│   ├── /admin/allocation      → Alokasi Kuota ke UMKM
│   ├── /admin/products        → Manajemen Produk Katalog
│   └── /admin/settings        → Pengaturan Platform
│
---

## Shared Components (Header & Footer Integration)

- **Header**: Shared component yang berbeda per section.
  - **Public Side (/public/*)**: Logo, navigation menu (Home, Products, RFQ), Global Search Button, Login CTA.
  - **Buyer Dashboard (/)**: Logo, navigation menu (Dashboard, Products, Orders, Profile), Logout, User Avatar.
  - **Admin (/admin/*)**: Logo, navigation menu (Dashboard, Orders, UMKM, Products, Settings), Admin User Info.
- **Footer**: Shared component yang sama di semua halaman: Quick links, contact info, social media, copyright.

---

### PUBLIC SIDE — Pre-Login Experience

> [!TIP]
> **MVP Scope**: Simple landing page + product catalog dengan search dasar. Interactive map dengan gallery carousel ditunda ke Phase 2. Fokus MVP adalah SEO + conversion ke RFQ.

**Header Konsisten**: Semua halaman public side memiliki header sama dengan logo, navigation, dan Global Search Button.

#### `/public` — Public Landing Page
- **Hero Section**: Tagline utama "Xpora — Ekspor dari Indonesia, Delivered" dengan deskripsi singkat tentang platform sebagai orkestrator rantai pasok untuk UMKM.
- **Product Highlights**: Carousel atau grid produk unggulan (misal: Tempe, Kopi, dll.) dengan gambar dan deskripsi singkat.
- **Our Story**: Section "From Local to Global" menjelaskan misi Xpora dalam menghubungkan UMKM dengan buyer global, mirip dengan transformasi limbah menjadi produk bernilai.
- **Features/Benefits**: Highlight seperti "Collective MOQ Breaking", "AI-Powered Matching", "Quality Assurance" (mirip Chemical-Free, Fresh & Healthy, 100% Organic di website referensi).
- **Gallery/Testimonials**: Galeri produk atau testimonial buyer.
- **Subscribe/CTA**: Form subscribe untuk update produk baru atau newsletter, dengan CTA "Browse Products" dan "Submit RFQ".
- **WhatsApp Floating Chat Button**: Tombol mengambang di pojok kanan bawah untuk chat langsung via WhatsApp, dengan pesan default "Hello 👋 Can we help you?".
- **Footer**: Quick links, contact info, social media.
- **SEO**: Structured data, meta tags, Open Graph.

**Catatan Teknis untuk Animasi**:
- **Framework**: Gunakan Framer Motion atau React Spring untuk animasi di React.js.
- **Hero Animasi**: Fade-in text dengan stagger effect untuk tagline dan deskripsi. Background parallax scroll jika ada gambar hero.
- **Product Carousel**: Smooth slide transitions dengan auto-play, hover pause. Gunakan Swiper.js atau custom dengan CSS transitions.
- **Scroll Animations**: Implementasi scroll-triggered animations menggunakan Intersection Observer API atau libraries seperti AOS (Animate On Scroll) untuk reveal sections saat scroll.
- **Hover Effects**: Scale/transform pada product cards, button hover dengan color transitions.
- **Performance**: Optimalkan animasi dengan will-change CSS property, hindari animasi pada properties yang trigger layout (gunakan transform/translate instead of top/left).
- **Responsiveness**: Pastikan animasi smooth di mobile dengan reduced motion preference support (prefers-reduced-motion media query).

**Catatan Teknis untuk WhatsApp Floating Chat Button**:
- **Implementasi**: Gunakan library seperti `react-whatsapp-widget` atau custom component dengan link `https://wa.me/{nomor}?text={pesan}`.
- **Styling**: Position fixed di bottom-right, dengan z-index tinggi. Icon WhatsApp hijau, animasi pulse atau bounce saat load.
- **Responsiveness**: Sembunyikan di mobile jika perlu, atau adjust ukuran. Pastikan accessible dengan aria-label.
- **Integrasi**: Hubungkan dengan nomor WhatsApp bisnis Xpora, dan log interaksi jika diperlukan untuk analytics.

#### `/public/products` — Public Product Catalog
- Grid view produk dengan kategori filter
- Search by komoditas (simple text search)
- Badge: "Available", "On Demand"
- Supplier list per produk: nama UMKM, kapasitas, alamat
- Pagination

**Catatan Teknis untuk Public Product Catalog**:
- **Search**: Simple frontend search by product name/category
- **Supplier Grid**: Tampilkan supplier cards dengan nama, kapasitas, alamat, QC standard
- **Performance**: Gunakan static mock data untuk MVP

#### `/public/products/:slug` — Public Product Detail
- Foto produk (multi-angle)
- Spesifikasi: grade, MOQ min, origin, sertifikasi
- Kapasitas agregat tersedia
- Timeline pengiriman estimasi
- CTA: "Submit RFQ for This Product"
- Compliance info: regulasi impor negara tujuan (static, sesuai pilot)

#### `/public/rfq` — Public RFQ Form
- Field: Nama perusahaan, negara, email, produk, quantity (ton), grade, target delivery date, catatan
- Validasi form real-time
- Auto-reply email konfirmasi (via EmailJS atau Resend)

#### `/public/rfq/success` — Public RFQ Confirmation
- Pesan sukses + Nomor referensi RFQ
- Estimasi respons: "Kami akan menghubungi dalam 2x24 jam"
- CTA: "Explore More Products"

### BUYER DASHBOARD — Post-Login Experience

> [!TIP]
> **MVP Scope**: Core RFQ flow + order tracking. Features seperti messaging real-time, supplier comparison, saved searches, watchlist ditunda ke **Phase 2**. Komunikasi supplier-buyer di MVP via WhatsApp langsung (admin facilitate).

**Header**: Menggunakan shared header buyer dengan navigation ke Dashboard, Products, Orders, Profile.

#### `/` — Buyer Dashboard Overview
- Welcome message dengan nama buyer
- Quick stats: Active RFQs, Pending Orders
- Recent orders status summary
- CTA: "Browse Products", "View Orders"

#### `/products` — Product Catalog (Dashboard)
- Grid view produk dengan kategori filter
- Quick RFQ button per produk

#### `/products/:slug` — Product Detail (Dashboard)
- Detail produk + CTA RFQ langsung

#### `/orders` — Buyer Orders History
- List semua RFQ dengan status (Pending, Responded, Confirmed, etc.)
- Basic filter by status

#### `/orders/:id` — Order Detail
- Detail order lengkap, tracking info jika ada

#### `/rfq` — RFQ Form (Dashboard)
- Pre-filled dengan buyer info
- Submit RFQ dari dashboard

#### `/rfq/success` — RFQ Confirmation (Dashboard)
- Nomor referensi RFQ unik
- Summary RFQ (produk, quantity, grade, target date)
- Estimated response: "Kami akan menghubungi dalam 2x24 jam"
- CTA: "View My RFQs", "Submit Another RFQ"

#### `/profile` — Buyer Profile Settings
- Edit company info, preferences
- View past RFQ history

#### `/join` — UMKM Onboarding Landing
- Penjelasan benefit bergabung (Subscription-Free)
- Langkah onboarding (form → verifikasi → onboarding via WA)
- Form: nama UMKM, lokasi, komoditas, kapasitas per bulan, kontak WA

---

### ADMIN SIDE — Command Center

**Header**: Menggunakan shared header admin dengan navigation ke Dashboard, Orders, UMKM, Products, Settings.

#### `/admin/dashboard` — Overview
- KPI Cards: Total RFQ masuk, Total UMKM aktif, Volume agregat, Pipeline value
- Chart: RFQ trend (line), Distribusi grade UMKM (pie)
- Recent activity feed

#### `/admin/orders` — Pipeline Pesanan
- Tabel RFQ dengan status: New → Reviewing → Negotiating → LoI → DP Received → Executing → Shipped
- Filter by status, produk, negara buyer
- Quick action: update status, assign ke UMKM

#### `/admin/orders/:id` — Detail Order
- Info buyer lengkap, produk & quantity
- Status pipeline dengan timestamp
- Panel alokasi: UMKM mana yang mengisi kuota
- Upload dokumen (LoI, invoice, dokumen ekspor)
- Catatan internal

#### `/admin/umkm` — Database UMKM
- Tabel: nama, lokasi, komoditas, kapasitas/bulan, grade, status
- Search & filter, tambah UMKM baru

#### `/admin/umkm/:id` — Profil UMKM
- Detail kapasitas, grade history, riwayat alokasi
- Upload dokumen sertifikasi
- Coaching notes

#### `/admin/allocation` — Alokasi Kuota
- Pilih order, pilih UMKM, assign qty (kg/ton)
- Validasi kapasitas & total order
- Progress bar: % kuota terpenuhi

#### `/admin/products` — Manajemen Katalog
- CRUD produk: nama, deskripsi, foto, grade, MOQ, spesifikasi
- Toggle: publish/draft

#### `/admin/settings` — Pengaturan
- Profile admin, notifikasi email, integrasi WA API & Email

---

## Tech Stack Rekomendasi (React.js)

| Layer | Teknologi | Alasan |
|---|---|---|
| **Framework** | React.js + Vite | Fast dev server, modern tooling |
| **Routing** | React Router v6 | Nested routes untuk admin |
| **State Management** | Zustand | Ringan, cukup untuk MVP |
| **UI Component** | Shadcn/ui + Tailwind CSS | Cepat, konsisten, accessible |
| **Forms** | React Hook Form + Zod | Validasi robust, performa baik |
| **Data Fetching** | TanStack Query | Caching, loading states otomatis |
| **Charts** | Recharts | Ringan, React-native |
| **Icons** | Lucide React | Konsisten, tree-shakeable |
| **Animations** | Framer Motion | Premium feel |
| **Backend-for-MVP** | Supabase (BaaS) | Auth, DB, Storage tanpa backend code |
| **Email** | Resend / EmailJS | Auto-reply RFQ konfirmasi |
| **Deployment** | Vercel | Free tier, global CDN |

> [!TIP]
> Gunakan **Supabase** sebagai backend MVP. Admin bisa CRUD dari Supabase dashboard, frontend React konsumsi API-nya. Zero backend engineer needed di fase awal.

---

## Task Eksekusi (Dibagi per Sesi Token)

### TASK 1 — Project Setup & Design System
**Eksekusi:** 1 sesi
- [ ] Init project: `npm create vite@latest xpora-web -- --template react`
- [ ] Install dependencies (React Router, Tailwind, Shadcn, Framer Motion, dll)
- [ ] Setup folder structure
- [ ] Design system: color tokens, typography, spacing
- [ ] Komponen dasar: Button, Badge, Card, Input, Modal
- [ ] Setup React Router dengan semua routes

**Output:** Boilerplate siap, design system terdefinisi

---

### TASK 2 — Landing Page (`/`)
**Eksekusi:** 1 sesi
- [ ] Hero section (animated, SEO h1)
- [ ] Product highlights section
- [ ] How It Works (3 steps)
- [ ] Social proof / metrics section
- [ ] Footer dengan navigasi & kontak
- [ ] Meta tags & Open Graph

**Output:** Landing page buyer-ready

---

### TASK 3 — Product Catalog & Detail (`/products`, `/products/:slug`)
**Eksekusi:** 1 sesi
- [ ] Product grid dengan filter & search
- [ ] Product card component
- [ ] Product detail page
- [ ] Mock data (Tempe: Medium, Premium, Super Premium)
- [ ] RFQ CTA on detail page

**Output:** Catalog browsable, detail produk informatif

---

### TASK 4 — RFQ Form & Konfirmasi (`/rfq`, `/rfq/success`)
**Eksekusi:** 1 sesi
- [ ] Form dengan React Hook Form + Zod validation
- [ ] Submit ke Supabase tabel `rfq_submissions`
- [ ] Auto-reply email via Resend/EmailJS
- [ ] Success page dengan referensi ID

**Output:** Buyer bisa submit RFQ, data masuk Supabase

---

### TASK 5 — UMKM Onboarding Landing (`/join`)
**Eksekusi:** 1 sesi (bisa digabung Task 4)
- [ ] Landing page benefit UMKM
- [ ] Form pendaftaran awal
- [ ] Submit ke Supabase tabel `umkm_applications`
- [ ] Konfirmasi: "Tim kami akan menghubungi via WhatsApp"

**Output:** Pipeline onboarding UMKM terbentuk

---

### TASK 6 — Admin Auth & Dashboard (`/admin`, `/admin/dashboard`)
**Eksekusi:** 1 sesi
- [ ] Setup Supabase Auth
- [ ] Protected route wrapper
- [ ] Admin login page
- [ ] Dashboard: KPI cards, charts, recent activity
- [ ] Sidebar navigation admin

**Output:** Admin bisa login, lihat overview bisnis

---

### TASK 7 — Admin Orders & Alokasi (`/admin/orders`, `/admin/allocation`)
**Eksekusi:** 1 sesi
- [ ] Tabel RFQ dengan filter & status update
- [ ] Detail order page
- [ ] Panel alokasi kuota ke UMKM
- [ ] Progress bar fulfillment

**Output:** Admin manage pipeline pesanan end-to-end

---

### TASK 8 — Admin UMKM & Produk (Manual via Supabase)
**Eksekusi:** Manual (tidak ada UI di MVP)
- Admin CRUD UMKM langsung dari Supabase dashboard
- Admin CRUD produk langsung dari Supabase dashboard
- UMKM onboarding via WhatsApp form atau Google Form → import ke Supabase manual
- Foto upload via Supabase Storage UI

**Output:** Data UMKM & Produk terkelola via Supabase (no custom UI)

---

### TASK 9 — Polish, SEO & Deployment
**Eksekusi:** 1 sesi
- [ ] Responsive design (mobile-first buyer, desktop-first admin)
- [ ] Loading states, error boundaries
- [ ] SEO: sitemap, robots.txt, structured data
- [ ] Deploy ke Vercel + environment variables

**Output:** Web live, SEO-optimized, production-ready

---

## Saran Strategis untuk Tim Xpora

> [!NOTE]
> Saran dari perspektif fullstack developer yang mempertimbangkan roadmap bisnis Xpora.

### 1. Pisahkan Domain Admin & Public secara Jelas
- `xpora.id/` → Public buyer-facing
- `xpora.id/admin/` → Internal Command Center

Ini mempermudah SEO (hanya index public routes) dan keamanan.

### 2. SEO adalah Mesin Utama — Pertimbangkan Next.js untuk Phase 2
Untuk **MVP cepat**, React + Vite cukup dengan SPA + sitemap. Untuk **Phase 2 (scale)**, migrasi ke Next.js App Router memberikan:
- Server-Side Rendering (SSR) untuk product pages
- Incremental Static Regeneration (ISR) untuk catalog
- Built-in API Routes

### 3. WhatsApp sebagai Backend UMKM (MVP-First)
**Kritis untuk MVP:** Jangan bangun portal login terpisah untuk UMKM. Gunakan **WhatsApp API** atau simple Google Form:
- UMKM onboarding via WhatsApp form atau Google Form → manual import ke Supabase oleh admin
- Admin blast notifikasi kuota via WhatsApp personal
- Zero adoption barrier (UMKM sudah pakai WA, tidak perlu install app baru)
- Fokus engineer time ke buyer portal yang gen revenue

### 4. Virtual SDR — Tunda ke Phase 2
LLM negosiasi membutuhkan prompt engineering matang, guardrails, dan legal review LoI otomatis. **Di MVP:** Virtual SDR = template email/WA yang dikirim admin manual.

### 5. Tracking dari Hari Pertama
Install **Posthog** (gratis untuk MVP) untuk track:
- Produk paling banyak di-view
- Conversion rate: visitor → RFQ
- Buyer dari negara mana yang datang

### 6. Arsitektur Database Supabase (Awal)

```
Tables:
├── products          (id, name, slug, grade, moq, capacity, price_range, images, published)
├── rfq_submissions   (id, company, country, email, product_id, quantity, grade, delivery_date, notes, status, ref_code)
├── umkm              (id, name, location, commodity, capacity_per_month, grade, whatsapp, status)
├── umkm_applications (id, name, location, commodity, capacity, whatsapp, status)
├── orders            (id, rfq_id, status, total_qty, notes, created_at)
└── allocations       (id, order_id, umkm_id, allocated_qty, fulfilled_qty, status)
```

### 7. Domain & Branding
- Daftarkan `xpora.id` segera
- Setup Google Search Console dari hari pertama
- Buat akun Google Merchant Center untuk ekspansi future

---

---

## Setup & Dokumentasi Supabase

Platform ini menggunakan Supabase sebagai Backend-as-a-Service (BaaS). Berikut adalah setup dasar yang sudah dilakukan:

1. **Supabase Client**: 
   - Lokasi: `src/lib/supabase.js`.
   - Menggunakan `@supabase/supabase-js`.
   - *Penting*: Ini adalah project **Vite (React SPA)**, bukan Next.js. Oleh karena itu environment variables menggunakan awalan `VITE_` dan diakses melalui `import.meta.env`.

2. **Environment Variables** (Simpan di `.env.local`):
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   # VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (Hanya digunakan untuk skrip eksternal/server, JANGAN PERNAH bocorkan ini ke frontend Vite!)
   ```

3. **Database Schema & Migrations**:
   - Skema database (tabel `products`, `rfqs`, `umkm`, `umkm_applications`, `allocations`) sudah disiapkan.
   - Semua tabel memiliki **Row Level Security (RLS)**. Publik hanya bisa insert RFQ dan baca produk. Hanya Admin yang bisa akses penuh.
   - File migrasi SQL / schema disimpan pada direktori `/supabase/migrations/`.
   - File data contoh (dummy) ada di `/supabase/seed.sql`.

4. **Cara Apply Migration & Seed ke Supabase**:
   **Cara 1: Lewat Supabase Dashboard (Paling Mudah untuk Pemula/MVP)**
   - Buka Supabase Dashboard > SQL Editor.
   - Buka file `supabase/migrations/20260518000000_init_schema.sql` di komputer Anda, *copy* semua teksnya, *paste* ke SQL Editor Supabase, lalu klik **Run**.
   - Untuk data awal, ulangi proses yang sama dengan file `supabase/seed.sql`.
   
   **Cara 2: Lewat Supabase CLI (Standar Industri)**
   - Jalankan `npx supabase link --project-ref <REF_PROJECT_ANDA>`
   - Jalankan `npx supabase db push` (untuk apply schema)
   - Jalankan `npx supabase db reset` (untuk apply schema sekaligus *seed data*)

---

## Timeline Estimasi (Lean Startup)

| Task | Estimasi Waktu | Priority |
|---|---|---|
| Task 1: Setup & Design System | 1-2 hari | Critical |
| Task 2: Landing Page | 2-3 hari | Critical |
| Task 3: Product Catalog | 2-3 hari | Critical |
| Task 4: RFQ Form | 1-2 hari | Critical |
| Task 5: UMKM Landing | 1 hari | High |
| Task 6: Admin Auth & Dashboard | 2-3 hari | Critical |
| Task 7: Admin Orders & Alokasi | 2-3 hari | High |
| Task 8: Admin UMKM & Produk | 0.5 hari (setup Supabase tables) | Low |
| Task 9: Polish & Deploy | 1-2 hari | High |
| **TOTAL** | **~2 minggu** | — |

> [!TIP]
> **MVP Lean Scope**: Task 1-7 + 9. Task 8 adalah setup Supabase schema one-time (~30 menit), tidak ada custom UI. Core revenue-generating features (Landing + RFQ) bisa live dalam **1 minggu demo**.

---

## Fitur yang Ditunda ke Phase 2 (MVP Simplification)

Untuk fokus MVP pada core RFQ flow dan buyer conversion, fitur-fitur berikut ditunda:

### Buyer Dashboard
- [ ] Real-time messaging dengan supplier (Phase 2 dengan dedicated chat)
- [ ] Supplier comparison tool (Phase 2)
- [ ] Saved searches & product watchlist (Phase 2)
- [ ] RFQ analytics & export (Phase 2)
- [ ] Notifications bell dengan real-time updates (Phase 2)

### Public Side
- [ ] Interactive map dengan pin lokasi UMKM (Phase 2)
- [ ] Auto-scrolling gallery dalam map tooltip (Phase 2)
- [ ] Advanced filtering (MOQ range, origin, grade) (Phase 2)
- [ ] Infinite scroll (simple pagination cukup untuk MVP)

### Admin Side
- [ ] Custom UI untuk CRUD UMKM & Produk (Phase 2) — gunakan Supabase dashboard untuk MVP
- [ ] UMKM portal dashboard (Phase 2) — gunakan WhatsApp untuk MVP
- [ ] Advanced reporting dan analytics (Phase 2)

### General
- [ ] Multi-language support (Phase 2)
- [ ] Mobile app (Phase 2)
- [ ] Payment gateway integration (Phase 2)

---

## Phase 2 Roadmap (Post-MVP)

| Fitur | Deskripsi |
|---|---|
| **Virtual SDR (LLM)** | Chatbot negosiasi 24/7 berbasis OpenAI + RAG knowledge base regulasi ekspor |
| **Computer Vision QC** | CNN model classifier grade produk, diintegrasikan via Python API |
| **UMKM Portal** | Dashboard UMKM melihat alokasi kuota & jadwal pickup |
| **Shipping Tracker** | Integrasi tracking nomor resi ekspor |
| **Buyer Portal** | Login buyer untuk track status pesanan & dokumen ekspor |
| **Multi-Komoditas** | Replicate untuk pertanian, perkebunan, kriya |
| **Next.js Migration** | SSR untuk performa SEO produk yang optimal |

---

*Dibuat berdasarkan: Xpora_PIDI2026_ProposalV3.pdf & Breakdown Problem diagram*
*Tanggal: 2026-04-24 | Versi: 1.0*
