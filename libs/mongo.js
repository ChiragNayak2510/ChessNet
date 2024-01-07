const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectToDatabase() {
  try {
    const dbUrl = process.env.CONNECTION_STRING;

    mongoose.connect(dbUrl).then(()=>{
      console.log('DB connected');
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
