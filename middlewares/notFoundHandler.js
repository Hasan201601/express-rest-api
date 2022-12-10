module.exports.notFoundHandler = (req, res, next) => {
  res.status(404).send("No such routes found");
};
