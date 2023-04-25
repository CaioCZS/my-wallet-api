export function schemaValidation(schema) {
  return (req, res, next) => {
    const { type } = req.params
    let validation
    if (type) {
      validation = schema.validate({ ...req.body, type }, { abortEarly: false })
    } else {
      validation = schema.validate(req.body, { abortEarly: false })
    }

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message)
      return res.status(422).send(errors)
    }

    next()
  }
}
