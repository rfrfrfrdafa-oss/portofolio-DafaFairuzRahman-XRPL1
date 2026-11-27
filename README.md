# Website Portofolio Lanjutan — Dafa Fairuz Rahman

Website portofolio pribadi untuk tugas **Project Sumatif Akhir Semester Ganjil (PPLG — Kelas X RPL)** di **SMK Krian 1 Sidoarjo**. Dibangun tanpa backend/database (statis HTML, CSS, JavaScript) dan dirancang responsif, aksesibel, serta interaktif di perangkat desktop maupun ponsel.

---

## Tautan Penting

- **Website Publik (GitHub Pages):** https://rfrfrfrdafa-oss.github.io/portofolio-DafaFairuzRahman-XRPL1/
- **Repositori GitHub:** https://github.com/rfrfrfrdafa-oss/portofolio-DafaFairuzRahman-XRPL1
- **Profil LinkedIn:** https://www.linkedin.com/in/dafa-fairuz-rahman-a5b909421
- **Email Kontak:** dafafairuzrahman@gmail.com

---

## Daftar Bagian & Halaman Website

| Bagian / Halaman | Deskripsi |
| :--- | :--- |
| **Beranda (`#home`)** | Hero perkenalan, badge status, efek ketik (*Typed.js*), tautan CV & sosial media, serta statistik ringkas |
| **Tentang Saya (`#about`)** | Latar belakang siswa RPL SMK Krian 1 Sidoarjo, fokus minat teknis, dan detail singkat (*Read More*) |
| **Keahlian (`#skills`)** | Pengelompokan skill Frontend/Backend, Sistem/Linux & Hardware, serta Robotics/AI |
| **Layanan (`#services`)** | 3 bidang kemampuan utama (*Web Development*, *Robotics & IoT*, *Backend Developer*) dengan ikon SVG dinamis |
| **Proyek (`#portfolio`)** | Galeri **10 proyek** beserta kategori, tag teknologi, pratinjau Lightbox HD & mode animasi SVG |
| **Sertifikat & Pencapaian (`#certificates`)** | **14 sertifikat online terverifikasi** (Sololearn & Dicoding) dengan filter kategori, ID kredensial, tautan verifikasi resmi, pratinjau HD, dan PDF |
| **Kontak (`#contact`)** | Informasi kontak aman (tanpa data pribadi sensitif), tombol `mailto:` & *Copy Email*, tautan sosial media, serta formulir pesan |
| **Halaman `404.html`** | Halaman *404 Not Found* bertema luar angkasa dengan navigasi cepat kembali ke beranda/bagian utama |

---

## Fitur Utama

- **Navigasi Responsif & Aksesibel:** Mendukung lebar layar **360 px – 1440 px**, navigasi keyboard (`Tab`, `Enter`, `Escape`, panah kiri/kanan pada lightbox), serta menghormati pengaturan `prefers-reduced-motion`.
- **Mode Tampilan & Tema Tersimpan (`localStorage`):** Pengalih **Dark / Light Mode**, 4 palet warna tema (**Ocean**, **Forest**, **Amber**, **Rose**), pengaturan atmosfer latar belakang, dan **Eco / High Performance Mode**.
- **Lightbox Interaktif:** Pembesaran (*zoom & pan*) gambar HD proyek serta toggle tampilan **SVG Animasi** khusus proyek, plus penampil sertifikat HD dengan akses PDF & verifikasi langsung.
- **Privasi Aman:** Tidak menampilkan nomor telepon pribadi, alamat rumah lengkap, NIK, maupun NISN.

---

## Struktur Folder

```text
portofolio-DafaFairuzRahman-XRPL1/
├── index.html                  # Halaman utama portofolio
├── 404.html                    # Halaman error 404 kustom
├── style.css                   # Stylesheet utama (variabel CSS, Flexbox/Grid, responsif, tema)
├── script.js                   # Interaksi UI, tema, filter sertifikat, lightbox, validasi & animasi
├── swarm.js                    # Mesin animasi interaktif footer (Swarm Rebuild)
├── cv.pdf                      # Berkas CV publik untuk diunduh pengunjung
├── 352344_medium.mp4           # Video latar belakang mode malam sinematik
├── images/                     # Aset foto & pratinjau proyek (versi web & HD)
├── svg/                        # Ikon kustom, favicon, & animasi SVG proyek 1–10
├── certificate/                # Arsip sertifikat PDF resmi + folder previews/ (Normal & HD)
├── .gitignore                  # Pengabaian berkas internal editor/OS & file mentah non-publik
└── README.md                   # Dokumentasi proyek
```

---

## Catatan Keputusan Desain

1. **Sistem Variabel CSS & Multi-Tema:** Menggunakan CSS Custom Properties (`--bg-color`, `--main-color`, `--text-muted`, `--gradient-1`) agar pergantian Light/Dark Mode dan 4 tema warna konsisten di seluruh komponen serta tersimpan otomatis di `localStorage`.
2. **Optimasi Performa Eco vs High Mode:** Gambar proyek berukuran besar dipisah menjadi versi web ringan (`*_web.jpg`) untuk kartu beranda / mode Eco dan versi resolusi tinggi (`*_HD.jpg` / PNG lossless) saat dibuka di Lightbox, disertai penonaktifan canvas partikel berat di perangkat berlayar kecil atau spesifikasi ringan.
3. **Penyajian Bukti Kompetensi Transparan:** Bagian sertifikat menyediakan **filter kategori**, **kode ID kredensial**, **tautan verifikasi langsung ke penerbit** (Sololearn & Dicoding), dan salinan **PDF** agar verifikasi dari akun lain berjalan mudah.

---

## Tangkapan Layar (Screenshots)

- Tambahkan tangkapan layar tampilan **Desktop (1440 px)**, **Mobile (360 px)**, **Light/Dark Mode**, dan **Skor Lighthouse** pada dokumentasi pengujian sebelum pengumpulan akhir.

---

## Sumber & Lisensi Aset Pihak Ketiga

| Aset / Pustaka | Sumber | Lisensi | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Boxicons v2.1.4** | `unpkg.com/boxicons` | MIT / CC BY 4.0 | Ikon navigasi, UI tombol, kartu layanan, & sosial media |
| **Google Fonts (`Black Ops One`, `Poppins`)** | `fonts.googleapis.com` | SIL Open Font License (OFL 1.1) | Tipografi tampilan judul & teks halaman `index.html` / `404.html` |
| **Typed.js v2.0.12** | `cdn.jsdelivr.net/npm/typed.js` | MIT License | Animasi teks peran pada bagian Hero |
| **ScrollReveal** | `unpkg.com/scrollreveal` | Open Source | Efek transisi kemunculan elemen saat scroll |
| **TikTok SVG Icon** | SVG Repo (`svg/tiktok-svgrepo-com.svg`) | Open License (SVG Repo) | Ikon tautan akun TikTok pada bagian Hero & Kontak |
| **Foto Proyek, SVG Kustom, & Sertifikat** | Dokumentasi & karya pribadi siswa | Hak cipta milik Dafa Fairuz Rahman | Galeri 10 proyek, animasi SVG, dan 14 sertifikat resmi |
