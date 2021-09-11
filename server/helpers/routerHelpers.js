const Joi = require('@hapi/joi')


const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)


    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error())
    }
    else {
      req.body = validatorResult.body
      next()
    }
  }
}
const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.params)

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error())
    }
    else {
      next()
    }
  }
}
const schemas = {
  boardSchema: Joi.object().keys({

  }),
  authSignUpSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    avatar: Joi.string()
  }),
  authSignInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })


}
module.exports = {
  validateBody,
  validateParam,
  schemas
}