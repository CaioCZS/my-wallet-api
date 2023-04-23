import joi from "joi"

export const transactionSchema = joi.object({
  type: joi.string().valid("entrada", "saida").required(),
  value: joi.number().positive().precision(2).required(),
  description: joi.string().required(),
})
