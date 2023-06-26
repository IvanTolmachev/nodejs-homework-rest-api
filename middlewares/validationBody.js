const { requestError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!Object.keys(req.body).length) {
      next(requestError(400, "missing  fields"));
    } else if (error) {
      next(requestError(400, "missing required name field"));
    }
    next(error);
  };
  return func;
};

module.exports = validateBody;
