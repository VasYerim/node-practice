const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const validateAddContactFields = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7)
      .required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUpdateContactFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(new ValidationError("missing fields"));
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUpdateFavoriteFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(new ValidationError("missing field favorite"));
  }

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

module.exports = {
  validateAddContactFields,
  validateUpdateContactFields,
  validateUpdateFavoriteFields,
};
