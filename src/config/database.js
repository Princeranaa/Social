const mongoose = require("mongoose");

exports.connectDB = () => {
  try {
    mongoose.connect(process.env.DaTABASE_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log("something went wrong while connecting to database", error);
    process.exit(1);
  }
};

