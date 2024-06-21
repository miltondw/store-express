const { ValidationError } = require('sequelize');

function LogError(err, req, res, next) {
  console.log('error');
  console.error(err);
  next(err);
}
function SequelizeErrors(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      status: '409',
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

function BoomErrorHandler(err, req, res, next) {
  console.log('BoomErrorHandler');
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else if (err instanceof ForeignKeyConstraintError && err.isBoom) {
    res.status(409).json({
      status: '409',
      message: err.name,
      errors: err.errors,
      err
    });
  } else {
    next(err);
  }
}

function ErrorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
module.exports = {
  LogError,
  SequelizeErrors,
  ErrorHandler,
  BoomErrorHandler,
};
