const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    console.log(tokenType); // todo: validate token type later
    if (!token) {
      throw new NotAuthorizedError("Failed provide token");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Inavalid token"));
  }
};

module.exports = { authMiddleware };
