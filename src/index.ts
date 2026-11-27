import * as readlineSync from "readline-sync";

console.log("alghi");
console.log("najwan")
console.log("Yudhist")


//oerubahan dari najwan untuk pull request
console.log("alghi");
console.log("najwan")
console.log("Yudhist")
//p

console. log("yudhis coba")

<<<<<<< HEAD
// ============================================================================
// BAGIAN 2 : FONDASI PERHITUNGAN DAN FITUR KASIR (PENGEMBANGAN DARI UTS)
// ============================================================================
// Fungsi (mengembalikan nilai hitung): subtotal = harga satuan x jumlah
function hitungSubtotal(harga: number, jumlah: number): number {
    return harga * jumlah; // operator aritmatika *
}

// Fungsi (mengembalikan nilai hitung): besar diskon dalam rupiah.
// Diskon hanya untuk member, persentasenya ditentukan metode pembayaran.
function hitungDiskon(subtotal: number, jumlah: number, member: boolean, metode: number): number {
    let persen: number = 0; // persentase diskon, awalnya 0
    // IF 21 (tingkat 1) : diskon hanya berlaku untuk member
    if (member) {
        // SWITCH 3 (tingkat 2) : persentase diskon menurut metode pembayaran
        switch (metode) {
            case 1: // Cash
                // IF 22 (tingkat 3) : diskon 5% jika beli minimal 5
                if (jumlah >= 5) {
                    persen = 5; // menetapkan diskon 5%
                }
                break; // keluar dari switch
            case 2: // QRIS
                if (jumlah >= 5) {
                    persen = 6; // diskon 6% jika beli minimal 5
                }
                break; // keluar dari switch
            case 3: // Debit
                if (jumlah >= 5) {
                    persen = 7; // diskon 7% jika beli minimal 5
                }
                break; // keluar dari switch
            case 4: // Kartu Kredit
                if (jumlah >= 3) {
                    persen = 10; // diskon 10% jika beli minimal 3
                }
                break; // keluar dari switch
            default:
                persen = 0; // metode lain tidak mendapat diskon
                break; // keluar dari switch
        }
    }
    let potongan: number = subtotal; // mulai dari subtotal
    potongan *= persen; // compound *= : dikali persen
    potongan /= 100; // compound /= : dibagi 100 menjadi rupiah
    return potongan; // mengembalikan besar diskon
}

// Fungsi (mengembalikan nilai hitung): pajak 10% dari harga setelah diskon
function hitungPajak(subtotal: number, diskon: number): number {
    return (subtotal - diskon) * PAJAK; // operator aritmatika - dan *
}

// KASIR : menghitung pesanan memakai data menu, lalu mencetak struk
async function hitungPesanan(): Promise<void> {
    console.log("\n=== KASIR: HITUNG PESANAN ==="); // menampilkan judul fitur
    const menuTersedia: MenuItem[] = daftarMenu.filter((menu) => menu.tersedia && menu.stok > 0); // hanya menu siap jual
    // IF 23 : pesan jika tidak ada menu yang bisa dijual
    if (menuTersedia.length === 0) {
        console.log("Belum ada menu yang tersedia untuk dijual."); // memberi tahu bahwa tidak ada menu siap jual
        return;
    }
    const namaPembeli: string = await bacaTeks("Nama pembeli: "); // nama pembeli untuk struk
    console.log("Menu yang tersedia:");
    // forEach : mencetak satu baris untuk setiap menu yang tersedia
    menuTersedia.forEach((menu) => {
        console.log("  " + menu.id + " - " + menu.nama + " (" + formatRupiah(menu.harga) + ", stok " + menu.stok + ")"); // mencetak ID, nama, harga, dan stok menu
    });
    const id: string = await tanya("Masukkan ID menu yang dipesan: "); // membaca ID menu yang dipesan
    const menu: MenuItem | undefined = menuTersedia.find((item) => item.id === id.toUpperCase()); // mencari di menu siap jual
    // IF 24 : pesan jika ID tidak ada di daftar menu tersedia
    if (menu === undefined) {
        console.log("Menu tidak ditemukan atau sedang tidak tersedia."); // memberi tahu bahwa menu tidak ditemukan
        return;
    }
    const jumlah: number = await bacaAngka("Jumlah pesanan (minimal 1): ", 1); // jumlah beli
    // IF 25 : stok harus mencukupi
    if (jumlah > menu.stok) {
        console.log("Stok tidak cukup. Stok " + menu.nama + " tinggal " + menu.stok + "."); // memberi tahu bahwa stok kurang
        return;
    }
    const member: boolean = await bacaYaTidak("Apakah pembeli member? (y/n): "); // status member
    console.log("Metode pembayaran: 1. Cash  2. QRIS  3. Debit  4. Kartu Kredit");
    // metode pembayaran harus 1 sampai 4 (di atas 4 diulang)
    let metode: number = await bacaAngka("Pilih metode (1-4): ", 1);
    // WHILE : ulangi jika metode di atas 4 (tidak ada pilihan tersebut)
    while (metode > 4) {
        console.log("Metode hanya 1 sampai 4."); // memberi tahu bahwa metode tidak ada
        metode = await bacaAngka("Pilih metode (1-4): ", 1); // membaca ulang metode pembayaran
    }
    const subtotal: number = hitungSubtotal(menu.harga, jumlah); // harga x jumlah
    const diskon: number = hitungDiskon(subtotal, jumlah, member, metode); // diskon member
    const pajak: number = hitungPajak(subtotal, diskon); // pajak 10%
    let total: number = subtotal; // total dimulai dari subtotal
    total -= diskon; // compound -= : dikurangi diskon
    total += pajak; // compound += : ditambah pajak
    total = Math.round(total); // pembulatan ke rupiah terdekat
    console.log("Total belanja: " + formatRupiah(total));
    const uangBayar: number = await bacaAngka("Uang yang dibayar: ", 0); // uang dari pembeli
    // IF 26 : jika uang kurang, transaksi dibatalkan dan stok tidak berubah
    if (uangBayar < total) {
        console.log("Uang Anda kurang " + formatRupiah(total - uangBayar) + ". Transaksi dibatalkan."); // memberi tahu kekurangan uang
        return;
    }
    const garis: string = "=".repeat(43); // garis pemisah struk
    console.log("\n" + garis);
    console.log("           STRUK PEMBELIAN CAFE"); // judul struk
    console.log(garis); // garis struk
    console.log("Nama     : " + namaPembeli); // mencetak nama pembeli
    console.log("Menu     : " + menu.nama); // mencetak nama menu
    console.log("Jumlah   : " + jumlah); // mencetak jumlah
    console.log("Subtotal : " + formatRupiah(subtotal)); // mencetak subtotal
    console.log("Diskon   : " + formatRupiah(diskon)); // mencetak diskon
    console.log("Pajak    : " + formatRupiah(pajak)); // mencetak pajak
    console.log("Total    : " + formatRupiah(total)); // mencetak total
    const hargaPerItem: number = total / jumlah; // operator aritmatika / : harga rata-rata per item
    console.log("Per item : " + formatRupiah(Math.round(hargaPerItem))); // mencetak harga per item (dibulatkan)
    console.log("Dibayar  : " + formatRupiah(uangBayar)); // mencetak uang dibayar
    console.log("Kembalian: " + formatRupiah(uangBayar - total)); // uang berlebih dikembalikan
    console.log(garis);
    console.log("Terima kasih telah berbelanja di cafe kami!"); // ucapan terima kasih
    menu.stok -= jumlah; // compound -= : stok berkurang sesuai jumlah terjual
    // IF 27 : jika stok habis, status menu otomatis menjadi tidak tersedia
    if (menu.stok === 0) {
        menu.tersedia = false; // mengubah status menu menjadi tidak tersedia
    }
}
=======
// @ts-ignore
import * as readline from "readline";
declare const process: any;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const iteratorBaris = rl[Symbol.asyncIterator]();

interface MenuItem {
    id: string;
    nama: string;
    kategori: string;
    harga: number;
    stok: number;
    tersedia: boolean;
}

const PAJAK: number = 0.1;
const MAKS_NAMA: number = 30;

const daftarMenu: MenuItem[] = [
    { id: "M001", nama: "Milktea", kategori: "Minuman", harga: 15000, stok: 20, tersedia: true },
    { id: "M002", nama: "Tea", kategori: "Minuman", harga: 10000, stok: 30, tersedia: true },
    { id: "M003", nama: "Americano", kategori: "Minuman", harga: 15000, stok: 25, tersedia: true },
    { id: "M004", nama: "Latte", kategori: "Minuman", harga: 16000, stok: 15, tersedia: true },
    { id: "M005", nama: "Donat", kategori: "Makanan", harga: 5000, stok: 40, tersedia: true },
    { id: "M006", nama: "Roti Bakar", kategori: "Makanan", harga: 12000, stok: 25, tersedia: true },
];

let nomorUrut: number = daftarMenu.length;

async function tanya(pertanyaan: string): Promise<string> {
    rl.setPrompt(pertanyaan);
    rl.prompt();
    const hasil = await iteratorBaris.next();
    if (hasil.done) {
        console.log("\nInput berakhir. Program dihentikan.");
        process.exit(0);
    }
    return String(hasil.value ?? "").trim();
}

function formatRupiah(angka: number): string {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Fungsi: mencari posisi (indeks) menu berdasarkan ID, hasil -1 jika tidak ketemu
function cariIndeksById(id: string): number {
    // findIndex mencari elemen pertama yang ID-nya sama (huruf besar/kecil diabaikan)
    return daftarMenu.findIndex((menu) => menu.id === id.toUpperCase());
}

// Fungsi: membuat ID baru yang dijamin belum dipakai (pencegahan duplikasi ID)
function buatIdBaru(): string {
    let idBaru: string = ""; // menampung ID yang akan dibuat
    let ulangi: boolean = true; // penanda apakah pembuatan ID perlu diulang
    // WHILE : terus membuat ID sampai ketemu yang belum ada di daftar
    while (ulangi) {
        nomorUrut += 1; // compound: nomor urut naik 1
        idBaru = "M" + String(nomorUrut).padStart(3, "0"); // contoh: M007
        ulangi = cariIndeksById(idBaru) !== -1; // ulangi jika ID ternyata sudah ada
    }
    return idBaru; // mengembalikan ID unik
}

// Fungsi: membaca teks wajib isi (tidak boleh kosong). Jika nilaiLama diisi,
// menekan Enter tanpa mengetik berarti "pakai nilai lama" (dipakai saat Update)
async function bacaTeks(pertanyaan: string, nilaiLama: string = ""): Promise<string> {
    let hasil: string = ""; // menampung teks yang valid
    let valid: boolean = false; // penanda apakah input sudah valid
    // DO...WHILE : minta input minimal sekali, ulangi sampai valid
    do {
        const masukan: string = await tanya(pertanyaan); // membaca jawaban user
        // IF 1 : Enter kosong saat Update berarti memakai nilai lama
        if (masukan === "" && nilaiLama !== "") {
            hasil = nilaiLama; // memakai nilai lama sebagai hasil
            valid = true; // menandai input sudah valid
        } else if (masukan === "" || masukan.length > MAKS_NAMA) {
            // IF 2 (majemuk, operator ||) : tolak teks kosong atau terlalu panjang
            console.log("Input tidak boleh kosong dan maksimal " + MAKS_NAMA + " karakter.");
        } else {
            hasil = masukan; // input sudah benar
            valid = true;
        }
    } while (!valid); // operator logika ! : ulangi selama belum valid
    return hasil; // mengembalikan teks valid
}

// Fungsi: membaca angka bulat >= nilaiMin. Jika nilaiLama bukan null, Enter kosong
// berarti memakai nilai lama (dipakai saat Update)
async function bacaAngka(
    pertanyaan: string, // teks pertanyaan yang ditampilkan
    nilaiMin: number, // nilai terkecil yang diizinkan
    nilaiLama: number | null = null // nilai lama (null bila bukan sedang Update)
): Promise<number> {
    let hasil: number = 0; // menampung angka yang valid
    let valid: boolean = false; // penanda apakah input sudah valid
    // WHILE : ulangi pertanyaan sampai user memasukkan angka yang benar
    while (!valid) {
        const masukan: string = await tanya(pertanyaan); // membaca jawaban user
        // IF 3 : Enter kosong saat Update berarti memakai nilai lama
        if (masukan === "" && nilaiLama !== null) {
            return nilaiLama; // keluar dari fungsi dengan nilai lama
        }
        const angka: number = Number(masukan); // mengubah teks menjadi angka
        // IF 4 (rantai if/else if) : memeriksa angka tidak valid satu per satu
        if (masukan === "" || isNaN(angka)) {
            console.log("Input harus berupa angka."); // bukan angka / NaN
        } else if (angka < nilaiMin) {
            console.log("Nilai minimal adalah " + nilaiMin + "."); // terlalu kecil / negatif
        } else if (angka % 1 !== 0) {
            console.log("Input harus bilangan bulat (tanpa koma)."); // ada pecahan
        } else {
            hasil = angka; // angka sudah benar
            valid = true;
        }
    }
    return hasil; // mengembalikan angka valid
}

// Fungsi: membaca jawaban Y/N. Jika nilaiLama bukan null, Enter kosong = nilai lama
async function bacaYaTidak(pertanyaan: string, nilaiLama: boolean | null = null): Promise<boolean> {
    let hasil: boolean = false; // menampung jawaban (true = ya)
    let valid: boolean = false; // penanda apakah jawaban sudah valid
    // WHILE : ulangi sampai user menjawab y atau n
    while (!valid) {
        const masukan: string = (await tanya(pertanyaan)).toLowerCase(); // jawaban huruf kecil
        // IF 5 : Enter kosong memakai nilai lama (jika ada)
        if (masukan === "" && nilaiLama !== null) {
            hasil = nilaiLama; // memakai nilai lama sebagai hasil
            valid = true; // menandai input sudah valid
        } else if (masukan === "y") {
            hasil = true; // jawaban ya
            valid = true;
        } else if (masukan === "n") {
            hasil = false; // jawaban tidak
            valid = true;
        } else {
            console.log("Jawab dengan y (ya) atau n (tidak)."); // jawaban lain ditolak
        }
    }
    return hasil; // mengembalikan jawaban
}

// Fungsi: mengubah kode kategori (1-3) menjadi nama kategori
function ambilNamaKategori(kode: number): string {
    let nama: string = ""; // menampung nama kategori hasil pilihan
    // SWITCH 1 : memilih nama kategori sesuai kode yang dipilih user
    switch (kode) {
        case 1:
            nama = "Minuman"; // kode 1 = Minuman
            break; // keluar dari switch
        case 2:
            nama = "Makanan"; // kode 2 = Makanan
            break; // keluar dari switch
        case 3:
            nama = "Lainnya"; // kode 3 = Lainnya
            break; // keluar dari switch
        default:
            nama = "Lainnya"; // kode di luar 1-3 dianggap Lainnya
            break; // keluar dari switch
    }
    return nama; // mengembalikan nama kategori
}

// Fungsi: membaca pilihan kategori (1-3) dan mengembalikan nama kategorinya
async function bacaKategori(nilaiLama: string = ""): Promise<string> {
    console.log("Kategori: 1. Minuman  2. Makanan  3. Lainnya"); // menampilkan pilihan
    // meminta kode 1-3; Enter kosong dipakai saat Update untuk mempertahankan kategori lama
    const kode: number = await bacaAngka(
        "Pilih kategori (1-3)" + (nilaiLama !== "" ? " [Enter = " + nilaiLama + "]" : "") + ": ", // teks pertanyaan (disertai petunjuk Enter saat Update)
        1, // nilai kode minimal adalah 1
        nilaiLama !== "" ? 0 : null // 0 berarti Enter kosong diperbolehkan (Update)
    );
    // IF 6 : kode 0 berarti user menekan Enter (pakai kategori lama)
    if (kode === 0) {
        return nilaiLama; // mengembalikan kategori lama
    }
    // IF 7 : kode di atas 3 tidak ada pilihannya, dianggap kategori Lainnya
    if (kode > 3) {
        console.log("Kode di atas 3 dianggap kategori Lainnya."); // memberi tahu bahwa kode di atas 3 dianggap Lainnya
    }
    return ambilNamaKategori(kode); // mengubah kode menjadi nama kategori
}

function tampilkanMenuUtama(): void {
    console.log("\n==============================");
    console.log("        KASIR CAFE");
    console.log("==============================");
    console.log("1. Tambah menu      (Create)");
    console.log("2. Lihat semua menu (Read)");
    console.log("3. Detail menu / ID (Read)");
    console.log("4. Ubah menu        (Update)");
    console.log("5. Hapus menu       (Delete)");
    console.log("6. Cari menu        (Search)");
    console.log("7. Kasir / hitung pesanan");
    console.log("0. Keluar");
    console.log("==============================");
}

async function main(): Promise<void> {
    let berjalan: boolean = true;
    while (berjalan) {
        tampilkanMenuUtama();
        const pilihan: string = await tanya("Pilih menu (0-7): ");
        switch (pilihan) {
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            case "7":
                break;
            case "0":
                berjalan = false;
                console.log("Terima kasih. Program selesai.");
                break;
            default:
                console.log("Pilihan tidak valid. Masukkan angka 0 sampai 7.");
                break;
        }
    }
    rl.close();
}

main();
>>>>>>> origin/develop
