 
import { toast } from "react-toastify"
export const API_KEY='http://localhost:3300'
 export const HandleSuccess =(msg)=>{
  toast.success(msg ,{
    position :'top-right'
  })
 }

 export const HandleError =(msg)=>{
  toast.success(msg ,{
    position :'top-right'
  })
 }