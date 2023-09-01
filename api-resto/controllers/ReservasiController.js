const db = require("../db");

class ReservasiController {
  static async createReservasi(req, res) {
    try {
      const { email, tanggal, meja, id_restoran, status } = req.body;

      // Generate nomor_booking secara acak
      const nomor_booking = generateRandomNumber();

      // Insert ke tabel booking
      await db.query(
        "INSERT INTO booking (email, tanggal, nomor_booking, meja, id_restoran, status) VALUES (?, ?, ?, ?, ?, ?)",
        [email, tanggal, nomor_booking, meja, id_restoran, status]
      );

      // SELECT dari view_keranjang
      const keranjangResult = db.query(
        "SELECT  id_keranjang, email,id_produk,nama_produk, kode_produk, harga,id_resto,no_meja,sub_qty, nama_kategori FROM view_keranjang  WHERE email = ? ",
        [email],
        function (error, results) {
          console.log("persiapan masuk loop");

          if (error) throw error;
          // Loop untuk insert ke detail_booking
          for (const row of results) {
            db.query(
              "INSERT INTO detail_booking (nomor_booking, email, id_produk, id_resto, no_meja, qty) VALUES (?, ?, ?, ?, ?, ?)",
              [
                nomor_booking,
                row.email,
                row.id_produk,
                row.id_resto,
                row.no_meja,
                row.sub_qty,
              ],
              function (error) {
                if (error) throw error;
                // console.log("masuk eror" + error);
              }
            );
            console.log("masuk loop");
          }
        }
      );

      // Hapus isi keranjang setelah berhasil reservasi
      await db.query("DELETE FROM keranjang_user WHERE email = ?", [email]);

      return res.status(200).json({ message: "Reservasi berhasil" });
    } catch (error) {
      console.error("Error dalam reservasi: " + error.stack);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan dalam reservasi" });
    }
  }

  static async getReservasiByEmail(req, res) {
    try {
      const { email } = req.params;

      const sql = `
     SELECT id_book, email, tanggal, nomor_booking, meja, nama_restoran, nama, status FROM view_reservasi WHERE email = ?
    `;

      db.query(sql, [email], (err, result) => {
        if (err) {
          console.error("Error dalam mengambil data keranjang: " + err.stack);
          return res.status(500).json({ message: "Terjadi kesalahan server." });
        }

        res.status(200).json(result);
      });
    } catch (error) {
      console.error("Error dalam mengambil data reservasi: " + error.stack);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan dalam mengambil data reservasi" });
    }
  }
}

function generateRandomNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Nomor enam digit secara acak
  return `BK-${randomNumber}`;
}

module.exports = ReservasiController;
