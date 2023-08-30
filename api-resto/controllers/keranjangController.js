const KeranjangModel = require("../models/keranjangModel");

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
}

module.exports = KeranjangController;
