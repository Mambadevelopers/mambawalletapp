const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const connectionResult = mongoose.connection;

connectionResult.on('error', () => {
  console.log("Error connecting to database");
});
connectionResult.on('connected', () => {
  console.log('====================================');
  console.log("Mongo Db connected successfully");
  console.log('====================================');
});

module.exports = connectionResult;
