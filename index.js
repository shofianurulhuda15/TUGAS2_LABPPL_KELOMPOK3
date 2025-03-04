const fs = require('fs');
const readline = require('readline');

// Membuat interface untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("====================================================");
console.log(" SELAMAT DATANG DI TOKO JUAL BELI LAPTOP SECOND ^^!");
console.log("====================================================");

// Fungsi untuk membaca database laptop
function readLaptops() {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error("Error membaca file:", err);
            return;
        }

        let laptops = JSON.parse(data);

        console.log("\n=== DATABASE LAPTOP ===");
        laptops.forEach(laptop => {
            console.log(`ID: ${laptop.id}`);
            console.log(`Brand: ${laptop.brand || "-"}`);
            console.log(`Type: ${laptop.type || "-"}`);
            console.log(`RAM: ${laptop.ram || "-"}`);
            console.log(`SSD: ${laptop.ssd || "-"}`);
            console.log(`Processor: ${laptop.processor || "-"}`);
            console.log(`GPU: ${laptop.gpu || "-"}`);
            console.log(`Harga: Rp ${laptop.price ? laptop.price.toLocaleString('id-ID') : "-"}`);
            console.log("======================\n");
        });

        console.log(`Total laptop: ${laptops.length}\n`);
        showMenu();
    });
}

// Fungsi untuk melihat 1 laptop berdasarkan ID
function viewLaptopById() {
    rl.question("Masukkan ID laptop yang ingin dilihat: ", (id) => {
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.error("Error membaca file:", err);
                return;
            }

            let laptops = JSON.parse(data);
            let laptop = laptops.find(l => l.id === parseInt(id));

            if (laptop) {
                console.log("\n=== DETAIL LAPTOP ===");
                console.log(`ID: ${laptop.id}`);
                console.log(`Brand: ${laptop.brand}`);
                console.log(`Type: ${laptop.type}`);
                console.log(`RAM: ${laptop.ram}`);
                console.log(`SSD: ${laptop.ssd}`);
                console.log(`Processor: ${laptop.processor}`);
                console.log(`GPU: ${laptop.gpu}`);
                console.log(`Harga: Rp ${laptop.price.toLocaleString('id-ID')}`);
                console.log("=====================\n");
            } else {
                console.log("Laptop tidak ditemukan!\n");
            }

            showMenu();
        });
    });
}

// Fungsi untuk menambahkan laptop baru
function addLaptop() {
    rl.question("Masukkan brand laptop: ", (brand) => {
        rl.question("Masukkan type laptop: ", (type) => {
            rl.question("Masukkan RAM (contoh: 16GB atau '-'): ", (ram) => {
                rl.question("Masukkan SSD (contoh: 512GB atau '-'): ", (ssd) => {
                    rl.question("Masukkan processor (contoh: Intel Core i7 atau '-'): ", (processor) => {
                        rl.question("Masukkan GPU (contoh: NVIDIA RTX 3060 atau '-'): ", (gpu) => {
                            rl.question("Masukkan harga dalam IDR (contoh: 20000000 atau '-'): ", (price) => {
                                fs.readFile('data.json', 'utf-8', (err, data) => {
                                    if (err) {
                                        console.error("Error membaca file:", err);
                                        return;
                                    }

                                    let laptops = JSON.parse(data);
                                    let newId = laptops.length ? laptops[laptops.length - 1].id + 1 : 1;

                                    let newLaptop = {
                                        id: newId,
                                        brand: brand.trim() || "-",
                                        type: type.trim() || "-",
                                        ram: ram.trim() || "-",
                                        ssd: ssd.trim() || "-",
                                        processor: processor.trim() || "-",
                                        gpu: gpu.trim() || "-",
                                        price: price.trim() === "-" ? "-" : parseInt(price.trim())
                                    };

                                    laptops.push(newLaptop);

                                    fs.writeFile('data.json', JSON.stringify(laptops, null, 4), (err) => {
                                        if (err) {
                                            console.error("Error menulis file:", err);
                                            return;
                                        }
                                        console.log("\nLaptop berhasil ditambahkan!\n");
                                        showMenu();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

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
