# Kasir Café (Console TypeScript)

# Kasir Cafe (Aplikasi Console TypeScript)

Proyek Tim UAS Pemrograman Dasar
Program Studi Teknologi Informasi, Fakultas Vokasi, Universitas Brawijaya
Dosen Pengampu: Salnan Ratih Asriningtias, ST., MT.

## 1. Identitas Tim

Kelas: T1B | Kelompok: (isi nomor kelompok)

| No | Nama Lengkap | NIM | Akun GitHub |
| --- | --- | --- | --- |
| 1 | Mochavy Amadeo Alghifari (Algi) | 263140700111054 | @(isi username) |
| 2 | Najwan Azhim Muntazhar | 263140700111042 | @(isi username) |
| 3 | Yuditira (isi nama lengkap) | (isi NIM) | @(isi username) |

Repository (Public): https://github.com/(username-pemilik)/(nama-repository)

## 2. Deskripsi Aplikasi

**Kasir Cafe** adalah aplikasi berbasis terminal (console) yang dibangun dengan TypeScript untuk membantu kasir cafe mengelola daftar menu sekaligus menghitung pesanan pelanggan. Aplikasi ini merupakan pengembangan dari proyek UTS "Kasir Cafe", yang sebelumnya hanya menghitung satu transaksi dengan menu tetap. Pada UAS, menu menjadi data yang dapat dikelola (CRUD dan pencarian), lalu dipakai oleh fitur kasir.

**Latar belakang masalah.** Pencatatan menu, harga, dan stok yang dilakukan manual mudah salah dan lambat dicari. Perhitungan total, diskon member, dan pajak juga rawan salah hitung. Aplikasi ini mengotomatiskan keduanya.

**Pengguna.** Kasir atau petugas cafe.

**Entitas data `MenuItem`:**

| Properti | Tipe | Keterangan |
| --- | --- | --- |
| id | string | Kode unik menu (contoh: M001) |
| nama | string | Nama menu |
| kategori | string | Minuman / Makanan / Lainnya |
| harga | number | Harga satuan (rupiah) |
| stok | number | Jumlah stok |
| tersedia | boolean | Status apakah menu bisa dijual |

**Fitur yang direncanakan:**

| Menu | Fitur | Keterangan |
| --- | --- | --- |
| 1 | Tambah menu (Create) | ID unik otomatis, validasi input |
| 2 | Lihat semua menu (Read) | Tabel rapi, pesan khusus jika data kosong |
| 3 | Detail menu berdasarkan ID (Read) | Pesan jika ID tidak ditemukan |
| 4 | Ubah menu (Update) | Menampilkan nilai lama, kolom boleh dilewati |
| 5 | Hapus menu (Delete) | Konfirmasi Y/N |
| 6 | Cari menu (Search) | Kata kunci (tidak sensitif huruf besar/kecil) + filter kategori / rentang harga / status |
| 7 | Kasir (hitung pesanan) | Subtotal, diskon member, pajak 10%, kembalian, stok berkurang otomatis |
| 0 | Keluar | Menu berulang sampai pengguna memilih keluar |

Data disimpan di memori menggunakan array, dengan 6 data awal (seed).

## 3. Pembagian Tugas Anggota

Seluruh kode berada di satu file `src/index.ts` yang dibagi menjadi blok sesuai pembagian di bawah, agar kerja paralel tidak bentrok (merge conflict). Setiap anggota menulis kode di branch `feature/<nama-fitur>` miliknya sendiri dan membuat Pull Request atas namanya sendiri.

| Anggota | Bagian Kode di `src/index.ts` | Branch | Tugas Laporan dan Dokumentasi |
| --- | --- | --- | --- |
| 1. Algi | Bagian 1: setup, tipe data `MenuItem`, seed data, fungsi bantu input (`tanya`, `bacaTeks`, `bacaAngka`, `bacaYaTidak`). Bagian 5: menu utama berulang dan `main()` | `feature/setup-menu-utama` | Repository dan README, Bab I (1.1 Deskripsi Masalah, 1.2 Decomposition) |
| 2. Najwan | Bagian 2: Create (`tambahMenu`) dan Read (`tampilSemuaMenu`, `tampilDetailMenu`). Bagian 4: fitur Kasir (`hitungPesanan`, `hitungDiskon`, `hitungPajak`) | `feature/create-read`, `feature/kasir` | Bab II (flowchart dan keterangan alur), Bab I (1.5 Algorithmic Thinking untuk Create, Read, dan Kasir) |
| 3. Yuditira | Bagian 3: Update (`ubahMenu`) dan Delete (`hapusMenu`). Bagian 4: Search (`cariMenu`) | `feature/update-delete`, `feature/search` | Bab I (1.3 Pattern Recognition, 1.4 Abstraction, 1.5 untuk Update, Delete, Search), Bab III (3.3 Screenshot) |

Pembagian di atas adalah usulan awal. Ubah sesuai kesepakatan tim, lalu perbarui tabel ini pada setiap progress.

## 4. Alur Kerja Git

- Branch: `main` (selalu bisa dijalankan), `develop` (integrasi), `feature/<nama-fitur>` (satu branch per fitur).
- Setiap fitur digabung ke `develop` lewat Pull Request yang di-review minimal satu anggota lain.
- `develop` digabung ke `main` pada setiap batas waktu progress.
- Format commit: `tipe: deskripsi singkat`, contoh `feat: tambah fitur hapus data`, `fix: perbaiki validasi harga`, `docs: update README`.
- Setiap anggota memakai akun GitHub sendiri dan membuat minimal satu commit bermakna per progress.

## 5. Teknologi dan Cara Menjalankan

Teknologi: TypeScript, Node.js, ts-node.

```bash
npm install
npx ts-node src/index.ts
```

## 6. Tabel Kontribusi

Diisi dan diperbarui pada setiap progress.

| Nama | NIM | Akun GitHub | Fitur / Bagian Kode | Pull Request Utama |
| --- | --- | --- | --- | --- |
| Mochavy Amadeo Alghifari | 263140700111054 | @(isi) | (sesuai tabel pembagian tugas) | (isi tautan PR) |
| Najwan Azhim Muntazhar | 263140700111042 | @(isi) | (sesuai tabel pembagian tugas) | (isi tautan PR) |
| Yuditira | (isi NIM) | @(isi) | (sesuai tabel pembagian tugas) | (isi tautan PR) |