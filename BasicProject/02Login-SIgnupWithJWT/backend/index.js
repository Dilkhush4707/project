import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import bodyParser from 'body-parser';
import {  router } from './routes/authroute.js';
 import {productRouter} from './routes/productRoute.js'

dotenv.config();

const PORT =process.env.PORT
const app=express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/product",productRouter)
app.use('/auth',router)
app.listen(PORT,()=>{
  console.log(`server running at ${PORT}`)
})
