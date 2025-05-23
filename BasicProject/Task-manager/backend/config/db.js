import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const url=process.env.DB_URL
 async function  Connect(){
   await mongoose.connect(url)
   .then(()=>{
    console.log("Database connect");
   })
   .catch((err)=>{console.log(`database not connect due to ${err}`)})
}
export default Connect;
  