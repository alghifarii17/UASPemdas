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