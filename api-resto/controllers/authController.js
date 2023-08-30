const crypto = require("crypto");
const db = require("../db");

class AuthController {
  static registerUser(req, res) {
    const { email, nama, password } = req.body;
    const encryptedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const sql =
      "INSERT INTO tbl_user_mobile (email, nama, password) VALUES (?, ?, ?)";
    const values = [email, nama, encryptedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(
          "Error dalam mengatur pendaftaran pengguna: " + err.stack
        );
        return res
          .status(500)
          .json({ message: "Maaf akun email sudah digunakan!" });
      }
      res.status(201).json({ message: "Pendaftaran berhasil!" });
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    const encryptedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const sql =
      "SELECT * FROM tbl_user_mobile WHERE email = ? AND password = ?";
    const values = [email, encryptedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error during login: " + err.stack);
        return res.status(500).json({ message: "An error occurred" });
      }

      if (results.length === 1) {
        res.json({ message: "Login Berhasil" });
      } else {
        res
          .status(401)
          .json({ message: "Gagal Login Silahkan periksa password anda" });
      }
    });
  }
}

module.exports = AuthController;
