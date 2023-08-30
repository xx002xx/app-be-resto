// models/restaurant.js
const db = require("../db");

class Restaurant {
  static getAll(callback) {
    const sql =
      "SELECT id_restoran, nama_restoran, deskripsi, foto FROM restoran";

    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  static getById(id, callback) {
    const sql =
      "SELECT id_restoran, nama_restoran, deskripsi, foto FROM restoran WHERE id_restoran = ?";

    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  }
}

module.exports = Restaurant;
