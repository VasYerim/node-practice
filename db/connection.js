const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

async function connectMongo() {
  try {
    await mongoose.connect(url, { dbName: "db-contacts" });
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = {
  connectMongo,
};
