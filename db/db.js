const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });