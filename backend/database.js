const mongoose = require("mongoose");

require('dotenv').config();
const credentials = process.env.MONGODB_CREDENTIALS;

const db = `xplodio_${process.env.NODE_ENV}`;

const uri = `mongodb+srv://${credentials}@cluster0.m9of0.mongodb.net/${db}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connection.on('connected', () => {
  console.log("\x1b[35m%s\x1b[0m", "Mongoose connected.");
});
mongoose.connection.on('disconnected', () => {
  console.log("\x1b[35m%s\x1b[0m", "Mongoose disconnected.");
});
mongoose.connection.on('error', (err) => {
  console.log("\x1b[91m%s\x1b[0m", "Mongoose connection error:");
  console.log(err);
});

const connectDb    = () => mongoose.connect(uri, options);
const disconnectDb = () => mongoose.disconnect();

module.exports = { connectDb, disconnectDb };
