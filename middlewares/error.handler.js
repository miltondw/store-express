function LogError(err, req, res, next) {
  console.log('error');
  console.error(err)
  next(err);
}

function BoomErrorHandler(err, req, res, next) {
  console.log('BoomErrorHandler');
  if(err.isBoom){
    res.status(err.output.statusCode).json(err.output.payload)
  }else{
    next(err)
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
  ErrorHandler,
  BoomErrorHandler
};
