const Product = require("../models/product.model.js");
// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({
        code: "error",
        message:
          err.message || "Something went wrong while getting list of products.",
      });
    });
};
// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      code: "error",
      message: "Please fill all required field",
    });
  }
  // Create a new Product
  const product = new Product({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: req.body.rating,
    warranty_years: req.body.warranty_years,
    available: req.body.available,
  });
  // Save product in the database
  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        code: "error",
        message:
          err.message || "Something went wrong while creating new product.",
      });
    });
};
// Find a single Product with a id
exports.findOne = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          code: "error",
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        code: "error",
        message: "Error getting product with id " + req.params.id,
      });
    });
};
// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      code: "error",
      message: "Please fill all required field",
    });
  }
  // Find product and update it with the request body
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      rating: req.body.rating,
      warranty_years: req.body.warranty_years,
      available: req.body.available,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          code: "success",
          message: "product not found with id " + req.params.id,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          code: "error",
          message: "product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        code: "error",
        message: "Error updating product with id " + req.params.id,
      });
    });
};
// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "product not found with id " + req.params.id,
        });
      }
      res.send({ code: "success", message: "product deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          code: "error",
          message: "product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        code: "error",
        message: "Could not delete product with id " + req.params.id,
      });
    });
};
