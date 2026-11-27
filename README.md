# Website Portofolio — Dafa Fairuz Rahman

Repositori website portofolio pribadi untuk proyek **Sumatif Akhir Semester (PPLG — X RPL)** di **SMK Krian 1 Sidoarjo**. Situs ini dibuat dengan HTML, CSS, dan JavaScript statis tanpa backend atau database.

## Tautan

- Website: https://rfrfrfrdafa-oss.github.io/portofolio-DafaFairuzRahman-XRPL1/
- Repositori: https://github.com/rfrfrfrdafa-oss/portofolio-DafaFairuzRahman-XRPL1
- LinkedIn: https://www.linkedin.com/in/dafa-fairuz-rahman-a5b909421
- Email: dafafairuzrahman@gmail.com

## Bagian Website

1. **Beranda (`#home`)** — Perkenalan, tautan unduh CV, sosial media, dan ringkasan statistik.
2. **Tentang Saya (`#about`)** — Profil singkat siswa RPL dan ketertarikan bidang pengembangan perangkat lunak.
3. **Keahlian (`#skills`)** — Daftar keahlian pemrograman web, backend, sistem Linux/hardware, serta dasar AI & IoT.
4. **Layanan (`#services`)** — Bidang fokus utama meliputi keamanan web dasar, robotika/IoT, dan backend.
5. **Proyek (`#portfolio`)** — 10 proyek latihan dan eksplorasi lengkap dengan pratinjau Lightbox (foto HD dan diagram SVG animasi).
6. **Sertifikat (`#certificates`)** — 14 sertifikat online (Sololearn & Dicoding) dengan filter kategori, ID kredensial, tautan verifikasi, dan PDF.
7. **Kontak (`#contact`)** — Informasi kontak publik, tombol `mailto:` dan salin email, serta formulir pesan dengan validasi sisi klien.
8. **Halaman `404.html`** — Halaman 404 kustom dengan navigasi kembali ke beranda.

## Fitur Utama

- Navigasi responsif untuk ukuran layar `360px` sampai `1440px` serta mendukung navigasi keyboard.
- Pengalih tema **Dark / Light Mode** dan 4 pilihan palet warna yang tersimpan di `localStorage`.
- Mode hemat daya (**Eco Mode**) otomatis/manual yang menyesuaikan aset gambar dan animasi latar belakang.
- Lightbox proyek dan sertifikat dengan fitur zoom, pan, serta pintasan keyboard (`Esc`, panah kiri/kanan, `+`, `-`, `0`).
- Bebas data pribadi sensitif (tidak mencantumkan nomor telepon pribadi, alamat lengkap, NIK, atau NISN).

## Struktur Folder

```text
portofolio-DafaFairuzRahman-XRPL1/
├── index.html
├── 404.html
├── style.css
├── script.js
├── swarm.js
├── cv.pdf
├── 352344_medium.mp4
├── images/         # Gambar & thumbnail proyek
├── svg/            # Favicon, ikon layanan, ikon sosial, & diagram SVG proyek
├── certificate/    # Berkas PDF sertifikat & gambar pratinjau
├── .gitignore
└── README.md
```

## Catatan Desain

- **Variabel CSS untuk Multi-Tema:** Pengaturan warna disimpan sebagai CSS Custom Properties di `:root` supaya pergantian mode terang/gelap maupun palet warna berjalan konsisten di semua komponen, dengan penyesuaian kontras teks di mode terang.
- **Pemisahan Aset Web & HD:** Gambar kartu utama memakai ukuran terkompresi agar halaman cepat dimuat, sedangkan pratinjau resolusi penuh baru dimuat saat kartu dibuka di Lightbox.
- **Verifikasi Sertifikat Terbuka:** Setiap kartu sertifikat menyertakan nomor kredensial, tautan verifikasi resmi ke penerbit, dan berkas PDF lokal.

## Sumber & Lisensi Aset

| Aset / Pustaka | Sumber | Lisensi |
| :--- | :--- | :--- |
| Boxicons v2.1.4 | unpkg.com/boxicons | MIT / CC BY 4.0 |
| Google Fonts (Black Ops One, Poppins) | fonts.googleapis.com | SIL Open Font License 1.1 |
| Typed.js v2.0.12 | jsdelivr.net | MIT License |
| ScrollReveal | unpkg.com/scrollreveal | Open Source |
| Ikon SVG TikTok & Layanan | SVG Repo | Open License |
| Foto Proyek, Diagram SVG, & Sertifikat | Dokumentasi pribadi siswa | Milik Dafa Fairuz Rahman |
