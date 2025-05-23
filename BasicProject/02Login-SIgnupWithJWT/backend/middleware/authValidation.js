import Joi from "joi";
export const  signupValidation = (req ,res ,next)=>{
  const Schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).required(),
    password:Joi.string().min(4).max(16).required()
  });
  const {error} =Schema.validate(req.body)
  if(error){
    return res.status(400).json({message: "Bad request" ,error})
  }
  next();
  }
  export const  loginValidation = (req ,res ,next)=>{
    const Schema = Joi.object({
      email: Joi.string().min(3).max(100).required(),
      password:Joi.string().min(4).max(16).required()
    });
    const {error} =Schema.validate(req.body)
    if(error){
      return res.status(400).json({message: "Bad request" ,error})
    }
    next();
    }
