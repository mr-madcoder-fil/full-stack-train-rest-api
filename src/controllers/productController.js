const _ = require("lodash");

exports.getAll = (req, res) => {
  try {
    const producTable = require("../../database/database");
    if (producTable)
      return res
        .status(200)
        .json({ data: producTable, count: producTable.length });
  } catch (error) {
    console.log("Error::productController::getAll", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.findOne = (req, res) => {
  try {
    const producTable = require("../../database/database");
    const productID = parseInt(req.params.id);
    let product =_.find(producTable, (item) => item._id === productID);
    if (product)
      return res
        .status(200)
        .json({ data: product});
  } catch (error) {
    console.log("Error::productController::getAll", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.getAvailable = (req, res) => {
  try {
    const producTable = require("../../database/database");
    if (producTable) {
      let availableProducts = producTable.filter(
        (product) => product.available
      );
      return res
        .status(200)
        .json({ data: availableProducts, count: availableProducts.length });
    }
  } catch (error) {
    console.log("Error::productController::getAvailable", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.delete = (req, res) => {
  const productID = parseInt(req.params.id);
  try {
    let producTable = require("../database/database");

    const deletedItem = _.remove(producTable, (item) => item._id === productID);

    if (deletedItem) {
      return res.status(200).json({ delete: 1 });
    }
    return res.status(400).json({ Error: "Product not found" });
  } catch (error) {
    console.log("Error::productController::delete", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.update = (req, res) => {
  const productID = parseInt(req.params.id);
  const newData = req.body;
  try {
    let producTable = require("../database/database");
    let product =_.find(producTable, (item) => item._id === productID);
    const index = _.findIndex(producTable, (item) => item._id === productID);
    if (product) {
      product = { ...product, ...newData };
      producTable[index] = product;
      return res.status(200).json({ data: product });
    }
    return res.status(400).json({ Error: "Product not found" });
  } catch (error) {
    console.log("Error::productController::update", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.create = async (req, res) => {
    try {
      const producTable = require('../database/database');
      const lastID = producTable[producTable.length - 1]._id;
      /** SINCE WE GOT NO MODEL, I DECIDED TO CREATE IT HERE DIRECTLY */
      const newProduct = {
        _id: lastID + 1, // This Autoincrement will be vailable since we have no hard delete (not a good way)
        name: req.body.name || '',
        type: req.body.type || '',
        price: req.body.price || '',
        rating: 0,
        warranty_years: req.body.warranty_years || '',
        available: true, // Available set to true by default
      };
      /** CHECKING IF THE DATA SENT BY THE USER CONTAINS ALL NECESSARY FIELDS */
      const error = await new Promise((resolve, reject) => {
        Object.keys(newProduct).map(key => {
          if (newProduct[key] === '') {
            reject(key);
          }
        });
        resolve(null);
      });
      if (error)
        return res.status(400).json({ Error: `Please enter a ${error}` });
  
      producTable.push(newProduct);
      return res
        .status(200)
        .json({ data: producTable, count: producTable.length });
    } catch (error) {
      console.log('Error::productController::create', error);
      return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  };
