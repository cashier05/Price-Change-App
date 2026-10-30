# Price Change LMI-05 — Aplikasi Bisa Di-Install (PWA)

Aplikasi ini sudah diubah menjadi **PWA (Progressive Web App)** sehingga bisa
dipasang di layar utama HP, baik **Android** maupun **iPhone**.

- **Android (Chrome):** tombol hijau **"Install Aplikasi"** akan muncul → menampilkan dialog install resmi Chrome.
- **iPhone (Safari):** panduan **"Tambahkan ke Layar Utama"** muncul otomatis (Apple tidak mengizinkan dialog install otomatis, jadi pemasangan wajib lewat tombol Bagikan/Share — ini keterbatasan Apple, bukan bug).

---

## Isi Folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman utama (membungkus aplikasi Google Apps Script) + tombol install + panduan iPhone |
| `manifest.json` | Identitas PWA: nama, ikon, warna, mode tampilan |
| `sw.js` | Service worker (syarat install di Android + cache ringan) |
| `icons/` | Ikon aplikasi (32/192/512/maskable/apple-touch) |
| `README.md` | Panduan ini |

---

## Cara Deploy ke GitHub Pages (Tanpa Coding)

1. Buka [github.com](https://github.com) → login → klik **+** di kanan atas → **New repository**.
2. Beri nama repo, misalnya `price-change` → pilih **Public** → klik **Create repository**.
3. Di halaman repo, klik link **uploading an existing file**.
4. Drag semua file ini ke area upload: `index.html`, `manifest.json`, `sw.js`, folder `icons/`, dan `README.md`.
   > Penting: file harus di posisi paling atas repo (root), jangan dimasukkan ke folder tambahan.
5. Klik **Commit changes**.
6. Buka tab **Settings** → menu **Pages** (di sidebar kiri) → pada *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main** dan folder **/ (root)** → klik **Save**.
7. Tunggu 1–3 menit, refresh halaman. Akan muncul alamat seperti:
   `https://USERNAME.github.io/price-change/`
8. Buka alamat tersebut dari HP (Android/iPhone) → ikuti tombol/panduan install yang muncul.

> URL Pages juga tampil di bagian atas menu Settings → Pages.

### Alternatif: Lewat Git (Opsional)

```bash
git clone https://github.com/USERNAME/price-change.git
cd price-change
# salin semua file ke folder ini, lalu:
git add .
git commit -m "Tambah PWA Price Change"
git push origin main
```

---

## Mengganti URL Aplikasi

Buka `index.html`, cari baris `src="https://script.google.com/macros/s/.../exec"`
(di dalam tag `<iframe id="app" ...>`) dan ganti dengan URL `/exec` milik Anda.
Tautan "Buka di tab baru" akan mengikuti otomatis.

## Mengganti Nama atau Ikon

- **Ikon:** timpa file di folder `icons/` dengan gambar baru (ukuran sama), lalu buka `sw.js` dan ubah `price-change-v1` menjadi `price-change-v2` agar perangkat pengguna menarik versi baru.
- **Nama:** edit `manifest.json` (`name` dan `short_name`) serta `<meta name="apple-mobile-web-app-title">` di `index.html`.

---

## Catatan Penting

- **Repo harus Public** agar GitHub Pages gratis (private butuh GitHub Pro).
- GitHub Pages otomatis **HTTPS** — syarat wajib PWA, jangan ubah ke http.
- Setelah update file, tunggu 1–2 menit. Di iPhone: hapus dulu ikon lama dari Layar Utama, lalu pasang ulang.
- Di Android, dialog install otomatis kadang butuh pengguna membuka situs beberapa kali dulu (heuristic Chrome). Selama itu belum muncul, panduan manual lewat menu ⋮ sudah tersedia di aplikasi.
- Uji hasil deploy: buka situs di Chrome desktop → tekan **F12** → tab **Application** → **Manifest**. Tidak boleh ada tanda error.
- Untuk melihat tampilan panduan tanpa HP: tambahkan `?debug=ios` atau `?debug=android` di belakang URL situs.
