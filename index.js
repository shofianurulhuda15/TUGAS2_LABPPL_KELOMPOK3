const fs = require('fs');
const readline = require('readline');

// Membuat interface untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\n=== MENU LAPTOP ===");
    console.log("1. Lihat semua laptop");
    console.log("2. Lihat laptop berdasarkan ID");
    console.log("3. Tambah laptop baru");
    console.log("4. Perbarui data laptop berdasarkan ID");
    console.log("5. Hapus laptop berdasarkan ID");
    console.log("6. Keluar");

    rl.question("Pilih menu (1-6): ", (choice) => {
        if (choice === "1") {
            readLaptops();
        } else if (choice === "2") {
            viewLaptopById();
        } else if (choice === "3") {
            addLaptop();
        } else if (choice === "4") {
            updateLaptop();
        } else if (choice === "5") {
            deleteLaptop();
        } else if (choice === "6") {
            console.log("=======================================");
            console.log("Terima kasih telah menggunakan program!");
            console.log("=======================================");
            rl.close();
        } else {
            console.log("==================================");
            console.log("Pilihan tidak valid, coba lagi!!!.");
            console.log("==================================");
            showMenu();
        }
    });
}

// Memulai program
showMenu();
