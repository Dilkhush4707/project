import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
export  const connectDB= async ()=>{
     try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log('DB connect')
     }
     catch(err){
      console.log("db connecttion failed ")
     }
 }