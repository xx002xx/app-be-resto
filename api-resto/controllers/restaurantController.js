// controllers/restaurantController.js

const Restaurant = require("../models/restaurant");

class RestaurantController {
  static getAllRestaurants(req, res) {
    Restaurant.getAll((err, restaurants) => {
      if (err) {
        console.error("Error dalam mengambil data restoran: " + err.stack);
        return res.status(500).send("Terjadi kesalahan dalam server.");
      }
      res.json(restaurants);
    });
  }

  static getRestaurantById(req, res) {
    const restaurantId = req.params.id;

    Restaurant.getById(restaurantId, (err, restaurant) => {
      if (err) {
        console.error("Error dalam mengambil data restoran: " + err.stack);
        return res.status(500).send("Terjadi kesalahan dalam server.");
      }
      if (!restaurant) {
        return res.status(404).send("Restoran tidak ditemukan.");
      }
      res.json(restaurant);
    });
  }
}

module.exports = RestaurantController;
