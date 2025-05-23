import express from "express";
import { loginValidation ,signupValidation} from "../middleware/authValidation.js"
import { signup, login} from '../controllers/signup.js'

 export const router=express.Router()

router.post('/login', loginValidation,login)

router.post('/signup',signupValidation ,signup)