const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
// Retrieve all products
router.get("/", productController.getAll);
// Get available products
router.get("/getavailable", productController.getAvailable);

// Create a new product
router.post("/", productController.create);
// Retrieve a single product with id
router.get("/:id", productController.findOne);
// Update a product with id
router.put("/:id", productController.update);
// Delete a product with id
router.delete("/:id", productController.delete);

module.exports = router;