require("dotenv").config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;


mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Database connected successfully!!!");
})

db.on("disconnected", () => {
    console.log("Database disconnected successfully!!!");
})

db.on("error", () => {
    console.log("Error occurred during the connection");
})

module.exports = db;
