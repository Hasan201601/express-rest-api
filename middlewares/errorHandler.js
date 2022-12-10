module.exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
