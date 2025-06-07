const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(db);

    console.log("mongoDB database connected.....");
  } catch (error) {
    console.log(error.message);
    // proces exit
    process.exit(1);
  }
};

module.exports = connectDB;
