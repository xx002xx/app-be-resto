// models/product.js
const db = require("../db");

class Product {
  static getAll(callback) {
    const sql = `
      SELECT 
       kode_produk,
       id_produk,
       nama_produk,
       nama_kategori,
       harga,
       foto_produk,
       id_restoran
      FROM data_produk`;

    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  static getByRestaurantId(restaurantId, callback) {
    const sql = `
      SELECT 
       kode_produk,
       id_produk,
       nama_produk,
       nama_kategori,
       harga,
       foto_produk,
       id_restoran
      FROM data_produk
      WHERE id_restoran = ?`;

    db.query(sql, [restaurantId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
}

module.exports = Product;
