// controllers/productController.js
const Product = require("../models/product");

class ProductController {
  static getAllProducts(req, res) {
    Product.getAll((err, products) => {
      if (err) {
        console.error("Error dalam mengambil data produk: " + err.stack);
        return res.status(500).send("Terjadi kesalahan dalam server.");
      }
      res.json(products);
    });
  }

  static getProductsByRestaurantId(req, res) {
    const restaurantId = req.params.id;

    Product.getByRestaurantId(restaurantId, (err, products) => {
      if (err) {
        console.error("Error dalam mengambil data produk: " + err.stack);
        return res.status(500).send("Terjadi kesalahan dalam server.");
      }
      res.json(products);
    });
  }
}

module.exports = ProductController;
