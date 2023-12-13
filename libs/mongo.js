import mongoose from "mongoose";
require('dotenv').config()
export async function connectToDatabase() {
  
  const dbUrl = process.env.CONNECTION_STRING;
  mongoose.connect(dbUrl).then(()=>{
    console.log('DB connected');
  }).catch((error)=>{
    console.log(error)
  })
}