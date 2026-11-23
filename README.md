# Kasir Café (Console TypeScript)

# Aplikasi Kasir Café (CLI)

*Kelas / Kelompok:* T1B / Kelompok-4
*Link Repository:* https://github.com/alghifarii17/UASPemdas
*Mata Kuliah:* Pemrograman Dasar  
*Tahun Akademik:* 2026/2027  

---

## A. Daftar Anggota & Pembagian Tugas

| No. | Nama Anggota | NIM | Akun GitHub | Tugas dan Tanggung Jawab |
|---|---|---|---|---|
| 1 | Mochavy Amadeo Alghifari  | `263140700111054` | `@alghifarii17` | Bertanggung jawab dalam setup repository (`.gitignore`, `tsconfig.json`, `package.json`), struktur data `Menu` dan seed, fungsi input/validasi, menu utama (loop), serta pengembangan fitur **Create**. Laporan: Sampul, 1.1 Deskripsi Masalah, 3.1 Pemetaan Ketentuan. Branch: `feature/setup-menu-utama`, `feature/create-data`. PR: [isi tautan PR] |
| 2 | Najwan Azhim M | `263140700111042` | `@NajwanAzhimM` | Bertanggung jawab dalam pengembangan fitur **Read** (semua data dan detail by ID), fitur **Update**, dan fungsi tampilan tabel. Laporan: 1.2 Decomposition, 1.3 Pattern Recognition, Bab II Flowchart. Branch: `feature/read-data`, `feature/update-data`. PR: [isi tautan PR] |
| 3 | Yudhistira Prasetyo Aji Padantyo | `263140700111050` | `@yudhistira2207-collab` | Bertanggung jawab dalam pengembangan fitur **Delete** (konfirmasi Y/N), fitur **Search** (kata kunci + filter), dan fitur **Transaksi Kasir**. Laporan: 1.4 Abstraction, 1.5 Algorithmic Thinking, 3.2 dan 3.3. Branch: `feature/delete-data`, `feature/search-data`, `feature/transaksi`. PR: [isi tautan PR] |

Setiap anggota juga me-review Pull Request anggota lain. Tabel ini diperbarui pada setiap progress.

---

## B. Proposal & Analisis Awal

### 1. Tema & Deskripsi Masalah
* **Tema:** Aplikasi Kasir & Manajemen Menu Café Berbasis Console (TypeScript).
* **Deskripsi Masalah:** Café membutuhkan aplikasi berbasis teks (*command-line*) yang praktis untuk mengelola data menu secara terstruktur (**Create, Read, Update, Delete, Search**) sekaligus memproses transaksi kasir, meliputi diskon member, pajak 10%, pencetakan struk, dan pengurangan stok otomatis. Data disimpan di memori menggunakan *array of object*.

### 2. Identifikasi Entitas & Properti Data
**Entitas Utama: `Menu`**
* `id`: `number` — ID unik, dibuat otomatis
* `nama`: `string` — Nama menu
* `kategori`: `string` — Kategori menu
* `harga`: `number` — Harga menu
* `stok`: `number` — Jumlah stok (berkurang saat transaksi)
* `status`: `string` — Status ketersediaan menu

> Catatan: properti di atas disusun dari fitur yang tercantum; sesuaikan dengan `interface Menu` di `src/index.ts`.

### 3. Daftar Fitur Utama (CRUD + Search + Transaksi) & Decomposition Awal
1. **Create (Tambah Menu):**
   * Menerima input data menu dengan validasi, membuat ID unik otomatis, lalu menyimpan ke array.
2. **Read (Lihat Semua Menu & Detail by ID):**
   * Menampilkan seluruh menu dalam tabel rapi, dengan pesan jika data kosong.
   * Menampilkan detail menu berdasarkan ID, dengan pesan jika ID tidak ditemukan.
3. **Update (Ubah Menu):**
   * Menampilkan nilai lama, kasir dapat menekan Enter untuk melewati kolom yang tidak diubah.
4. **Delete (Hapus Menu):**
   * Menghapus menu berdasarkan ID disertai konfirmasi Y/N.
5. **Search (Cari Menu):**
   * Pencarian kata kunci tidak sensitif huruf besar/kecil, dengan filter **kategori**, **harga**, dan **status**.
6. **Transaksi Kasir:**
   * Menghitung total dengan diskon member dan pajak 10%, mencetak struk, serta mengurangi stok.

---

## C. Rencana Pengembangan Project
Pengembangan project dilakukan melalui beberapa tahapan:
1. Persiapan repository public dan konfigurasi awal TypeScript (`.gitignore`, `tsconfig.json`, `package.json`, `src/index.ts`).
2. Penyusunan proposal, analisis permasalahan, serta draft awal laporan di folder `docs/`.
3. Perancangan struktur data `Menu` dan alur logika program (*decomposition*, flowchart).
4. Implementasi fitur CRUD + Search + Transaksi Kasir.
5. Integrasi, pengujian, dan evaluasi program pada seluruh skenario input dan validasi.
6. Penyusunan dokumentasi akhir dan laporan UAS.

**Alur Git:** Branch `main` (selalu bisa dijalankan), `develop` (integrasi), dan `feature/<nama-fitur>`. Fitur digabung ke `develop` lewat Pull Request yang di-review minimal satu anggota lain; `develop` digabung ke `main` pada setiap batas progress. Format commit: `tipe: deskripsi singkat` (contoh: `feat: tambah fitur hapus data`).

---

## D. Progress Pengerjaan

### Progress 1 — 23 Nov 2026
- [ ] **Alghi:** Buat repo Public, 1.1 Deskripsi Masalah awal.
- [ ] **Najwan:** README, setup proyek
- [ ] **Yudhistira:** 1.2 Decomposition awal.

### Progress 2 — 27 Nov 2026
- [ ] **Alghi:** Struktur data, fondasi materi UTS, kerangka menu.
- [ ] **Najwan:** Flowchart, 1.3 Pattern Recognition.
- [ ] **Yudhistira:** 1.4 Abstraction, 1.5 menu utama.

### Progress 3 — 30 Nov 2026
- [ ] **Alghi:** Fitur Create + validasi.
- [ ] **Najwan:** Laporan algoritma Create.
- [ ] **Yudhistira:** Review PR.

### Progress 4 — 2 Des 2026
- [ ] **Alghi:** Review PR.
- [ ] **Najwan:** Fitur Read.
- [ ] **Yudhistira:** Laporan algoritma Read.

### Progress 5 — 4 Des 2026
- [ ] **Alghi:** Review PR.
- [ ] **Najwan:** Fitur Update.
- [ ] **Yudhistira:** Fitur Delete.

### Progress 6 — 7 Des 2026
- [ ] **Alghi:** Integrasi dan pengecekan syarat materi.
- [ ] **Najwan:** Review PR.
- [ ] **Yudhistira:** Fitur Search.

### Progress 7 — 11 Des 2026
- [ ] **Alghi:** Finalisasi kode dan README.
- [ ] **Najwan:** Finalisasi flowchart dan laporan.
- [ ] **Yudhistira:** Fitur Transaksi, screenshot, laporan final.

---

