# Kasir Café (Console TypeScript)

Aplikasi berbasis terminal untuk mengelola menu café: **Create, Read, Update, Delete, Search**, ditambah **Transaksi Kasir** (diskon member, pajak 10%, struk). Data disimpan di memori menggunakan array of object.

UAS Pemrograman Dasar - Program Studi Teknologi Informasi, Fakultas Vokasi, Universitas Brawijaya.
Dosen Pengampu: Salnan Ratih Asriningtias, ST., MT.

## Identitas Tim

| Kelas | Kelompok | Judul / Tema |
|-------|----------|--------------|
| T1B | Kelompok 4 | Aplikasi Kasir Café (Console TypeScript) |

Link Repository Public: https://github.com/alghifarii17/UASPemdas

## Anggota dan Akun GitHub

| No | Nama Lengkap | NIM | Akun GitHub |
|----|--------------|-----|-------------|
| 1 | Mochavy Amadeo Alghifari (Alghi) | 263140700111054 | @alghifarii17 |
| 2 | Najwan Azhim Muntazhar (najwan) | 263140700111042 | @NajwanAzhimM |
| 3 | Yudhistira Prasetyo Aji Padantyo | 263140700111050 | @[username_github_yudhistira] |

## Tabel Pembagian Tugas dan Kontribusi

| Anggota | Fitur / Bagian Kode (`src/index.ts`) | Bagian Laporan | Branch | Pull Request Utama |
|---------|--------------------------------------|----------------|--------|--------------------|
| Alghi | Setup repository (`.gitignore`, `tsconfig.json`, `package.json`), struktur data `Menu` dan seed, fungsi input/validasi, menu utama (loop), fitur Create | Sampul, 1.1 Deskripsi Masalah, 3.1 Pemetaan Ketentuan | `feature/setup-menu-utama`, `feature/create-data` | [isi tautan PR] |
| Najwan | Fitur Read (semua data dan detail by ID), fitur Update, fungsi tampilan tabel | 1.2 Decomposition, 1.3 Pattern Recognition, Bab II Flowchart | `feature/read-data`, `feature/update-data` | [isi tautan PR] |
| Yudhistira | Fitur Delete (konfirmasi Y/N), fitur Search (kata kunci + filter), fitur Transaksi Kasir | 1.4 Abstraction, 1.5 Algorithmic Thinking, 3.2 dan 3.3 | `feature/delete-data`, `feature/search-data`, `feature/transaksi` | [isi tautan PR] |

Setiap anggota juga me-review Pull Request anggota lain. Tabel ini diperbarui pada setiap progress.

## Rencana per Progress

| Progress | Tanggal | Alghi | Najwan | Yudhistira |
|----------|---------|-------|--------|------------|
| 1 | 23 Nov 2026 | Buat repo Public, setup proyek, README | 1.2 Decomposition awal | 1.1 Deskripsi Masalah awal |
| 2 | 27 Nov 2026 | Struktur data, fondasi materi UTS, kerangka menu | Flowchart, 1.3 Pattern Recognition | 1.4 Abstraction, 1.5 menu utama |
| 3 | 30 Nov 2026 | Fitur Create + validasi | Laporan algoritma Create | Review PR |
| 4 | 2 Des 2026 | Review PR | Fitur Read | Laporan algoritma Read |
| 5 | 4 Des 2026 | Review PR | Fitur Update | Fitur Delete |
| 6 | 7 Des 2026 | Integrasi dan pengecekan syarat materi | Review PR | Fitur Search |
| 7 | 11 Des 2026 | Finalisasi kode dan README | Finalisasi flowchart dan laporan | Fitur Transaksi, screenshot, laporan final |

## Fitur

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Tambah menu (Create) | ID unik otomatis, validasi input |
| 2 | Lihat semua menu (Read) | Tabel rapi, pesan jika data kosong |
| 3 | Detail menu (Read by ID) | Pesan jika ID tidak ditemukan |
| 4 | Ubah menu (Update) | Nilai lama ditampilkan, Enter untuk melewati kolom |
| 5 | Hapus menu (Delete) | Konfirmasi Y/N |
| 6 | Cari menu (Search) | Kata kunci tidak sensitif huruf besar/kecil + filter kategori, harga, status |
| 7 | Transaksi kasir | Diskon member, pajak, struk, stok berkurang |
