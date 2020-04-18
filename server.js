const express = require("express");
const bodyParser = require("body-parser");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database
const productRoutes = require("./src/routes/product.routes");
const userRoutes = require("./src/routes/user.routes");

// Launch mongoose connection file

require('./db/db.js')

// using as product middleware
app.use("/api/products", productRoutes);
// useind as user middleware
app.use("/api/users", userRoutes);
// Connecting to the database

// define a root/default route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
