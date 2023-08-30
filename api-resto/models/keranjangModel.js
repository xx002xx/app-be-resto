const db = require("../db");

class KeranjangModel {
  static async insertToKeranjang(
    email,
    id_produk,
    id_resto,
    no_meja,
    callback
  ) {
    try {
      // Check if the item already exists in the keranjang
      const existingItem = await db.query(
        "SELECT * FROM keranjang_user WHERE email = ? AND id_produk = ? AND id_resto = ?",
        [email, id_produk, id_resto]
      );
      if (existingItem.rows > 0) {
        // Item already exists, update qty
        await db.query(
          "UPDATE keranjang_user SET qty = qty + 1 WHERE email = ? AND id_produk = ? AND id_resto = ?",
          [email, id_produk, id_resto]
        );
        return res.status(200).json({ message: "Qty updated in keranjang" });
      } else {
        console.log(existingItem.rows);
        // Item doesn't exist, insert new
        const sql =
          "INSERT INTO keranjang_user (email, id_produk, id_resto, no_meja) VALUES (?, ?, ?, ?)";
        const values = [email, id_produk, id_resto, no_meja];

        await db.query(sql, values, callback);
      }
    } catch (error) {
      console.error("Error inserting/updating keranjang: " + error.stack);
      return res
        .status(500)
        .json({ message: "Error inserting/updating keranjang" });
    }
  }
}

module.exports = KeranjangModel;
