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
    return daftarMenu.findIndex((menu) => menu.id === id.toUpperCase());
}

// Fungsi: membuat ID baru yang dijamin belum dipakai (pencegahan duplikasi ID)
function buatIdBaru(): string {
    let idBaru: string = "";
    let ulangi: boolean = true;
    while (ulangi) {
        nomorUrut += 1;
        idBaru = "M" + String(nomorUrut).padStart(3, "0");
        ulangi = cariIndeksById(idBaru) !== -1;
    }
    return idBaru;
}

// Fungsi: mengubah kode kategori (1-3) menjadi nama kategori
function ambilNamaKategori(kode: number): string {
    let nama: string = "";
    switch (kode) {
        case 1:
            nama = "Minuman";
            break;
        case 2:
            nama = "Makanan";
            break;
        case 3:
            nama = "Lainnya";
            break;
        default:
            nama = "Lainnya";
            break;
    }
    return nama;
}

// Fungsi: membaca teks wajib isi (tidak boleh kosong). Jika nilaiLama diisi,
// menekan Enter tanpa mengetik berarti "pakai nilai lama" (dipakai saat Update)
async function bacaTeks(pertanyaan: string, nilaiLama: string = ""): Promise<string> {
    let hasil: string = "";
    let valid: boolean = false;
    do {
        const masukan: string = await tanya(pertanyaan);
        if (masukan === "" && nilaiLama !== "") {
            hasil = nilaiLama;
            valid = true;
        } else if (masukan === "" || masukan.length > MAKS_NAMA) {
            console.log("Input tidak boleh kosong dan maksimal " + MAKS_NAMA + " karakter.");
        } else {
            hasil = masukan;
            valid = true;
        }
    } while (!valid);
    return hasil;
}

// Fungsi: membaca angka bulat >= nilaiMin. Jika nilaiLama bukan null, Enter kosong
// berarti memakai nilai lama (dipakai saat Update)
async function bacaAngka(
    pertanyaan: string,
    nilaiMin: number,
    nilaiLama: number | null = null
): Promise<number> {
    let hasil: number = 0;
    let valid: boolean = false;
    while (!valid) {
        const masukan: string = await tanya(pertanyaan);
        if (masukan === "" && nilaiLama !== null) {
            return nilaiLama;
        }
        const angka: number = Number(masukan);
        if (masukan === "" || isNaN(angka)) {
            console.log("Input harus berupa angka.");
        } else if (angka < nilaiMin) {
            console.log("Nilai minimal adalah " + nilaiMin + ".");
        } else if (angka % 1 !== 0) {
            console.log("Input harus bilangan bulat (tanpa koma).");
        } else {
            hasil = angka;
            valid = true;
        }
    }
    return hasil;
}

// Fungsi: membaca jawaban Y/N. Jika nilaiLama bukan null, Enter kosong = nilai lama
async function bacaYaTidak(pertanyaan: string, nilaiLama: boolean | null = null): Promise<boolean> {
    let hasil: boolean = false;
    let valid: boolean = false;
    while (!valid) {
        const masukan: string = (await tanya(pertanyaan)).toLowerCase();
        if (masukan === "" && nilaiLama !== null) {
            hasil = nilaiLama;
            valid = true;
        } else if (masukan === "y") {
            hasil = true;
            valid = true;
        } else if (masukan === "n") {
            hasil = false;
            valid = true;
        } else {
            console.log("Jawab dengan y (ya) atau n (tidak).");
        }
    }
    return hasil;
}

// Fungsi: membaca pilihan kategori (1-3) dan mengembalikan nama kategorinya
async function bacaKategori(nilaiLama: string = ""): Promise<string> {
    console.log("Kategori: 1. Minuman 2. Makanan 3. Lainnya");
    const kode: number = await bacaAngka(
        "Pilih kategori (1-3)" + (nilaiLama !== "" ? " [Enter = " + nilaiLama + "]" : "") + ": ",
        1,
        nilaiLama !== "" ? 0 : null
    );
    if (kode === 0) {
        return nilaiLama;
    }
    if (kode > 3) {
        console.log("Kode di atas 3 dianggap kategori Lainnya.");
    }
    return ambilNamaKategori(kode);
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

