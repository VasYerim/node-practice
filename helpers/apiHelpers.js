const { ContactServiceError } = require("./errors");

const controllerWraper = (controler) => {
  return (req, res, next) => {
    controler(req, res).catch(next);
  };
};

const unknownRouteHandler = (req, res) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ContactServiceError) {
    return res
      .status(error.status)
      .json({ message: JSON.stringify(error.message) });
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  controllerWraper,
  errorHandler,
  unknownRouteHandler,
};
