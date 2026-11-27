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