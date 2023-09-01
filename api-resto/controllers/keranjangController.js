const KeranjangModel = require("../models/keranjangModel");
const db = require("../db");

class KeranjangController {
  static insertToKeranjang(req, res) {
    const { email, id_produk, id_resto, no_meja } = req.body;

    KeranjangModel.insertToKeranjang(
      email,
      id_produk,
      id_resto,
      no_meja,
      (err, result) => {
        if (err) {
          console.error("Error inserting data to keranjang_user:", err);
          return res.status(500).json({ message: "An error occurred" });
        }

        res.status(200).json({ message: "Data Berhasil" });
      }
    );
  }
  static getKeranjangByEmail(req, res) {
    const { email } = req.params;

    const sql = `
      SELECT
        id_keranjang,
        email,
        id_produk,
        nama_produk,
        kode_produk,
        harga,
        id_resto,
        no_meja,
        sub_qty,
        nama_kategori
      FROM
        view_keranjang
      WHERE
        email = ?
    `;

    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error dalam mengambil data keranjang: " + err.stack);
        return res.status(500).json({ message: "Terjadi kesalahan server." });
      }

      res.status(200).json(result);
    });
  }
}

module.exports = KeranjangController;
