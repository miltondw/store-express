const boom = require('@hapi/boom');

/**
 * Creates a middleware function for validating request data against a Joi schema.
 * 
 * This middleware function is designed to validate data coming in a request (e.g., req.body, req.query)
 * against a specified Joi schema. If the data does not conform to the schema, it uses the `boom` library
 * to create an error response indicating a bad request. This helps in ensuring that the incoming request
 * data adheres to the expected format before any further processing is done.
 * 
 * @param {Object} schema - The Joi schema to validate the request data against.
 * @param {string} property - The property of the request object to validate (e.g., 'body', 'query').
 * @returns {Function} A middleware function that takes the standard Express.js middleware parameters (req, res, next).
 *                     It validates the specified request property against the provided schema and either passes control
 *                     to the next middleware in the stack or stops the request processing chain with a bad request error
 *                     if validation fails.
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
