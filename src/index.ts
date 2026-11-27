console.log("alghi");
console.log("najwan")
console.log("Yudhist")


//oerubahan dari najwan untuk pull request
console.log("alghi");
console.log("najwan")
console.log("Yudhist")
//p

console. log("yudhis coba")

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