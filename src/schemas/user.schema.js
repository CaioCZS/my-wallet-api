import joi from "joi"

export const userSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(3).required(),
  email: joi.string().email().required(),
})

export const shemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
})
