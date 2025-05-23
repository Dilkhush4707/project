import express from 'express'
import { ensureAuthenticated } from '../middleware/auth.js'
 export const productRouter =express.Router();

productRouter.get('/', ensureAuthenticated , (req ,res)=>{
  console.log(req.user);
  res.status(200).json({
    id:1,
    n:"charger",
    Rs:1090
  },
{
  id:2,
  n:"mobile",
  rs:30000
})
})