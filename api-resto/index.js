const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Selamat datang di backend Anda!");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

// Import kontroller
const RestaurantController = require("./controllers/restaurantController");

// Routing untuk mengambil data restoran
app.get("/restaurants", RestaurantController.getAllRestaurants);

// Routing untuk mengambil data restoran berdasarkan ID
app.get("/restaurants/:id", RestaurantController.getRestaurantById);

const ProductController = require("./controllers/productController");

// Routing untuk mengambil data produk
app.get("/products", ProductController.getAllProducts);

app.get(
  "/restaurants/:id/products",
  ProductController.getProductsByRestaurantId
);

const AuthController = require("./controllers/authController");
app.use(express.json());
app.post("/register", AuthController.registerUser);
app.post("/login", AuthController.loginUser);

const KeranjangController = require("./controllers/keranjangController");
app.post("/insert-keranjang", KeranjangController.insertToKeranjang);
