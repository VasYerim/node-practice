const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/authModel");
const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`User with ${email} not found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password!`);
  }

  const token = await jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  registration,
  login,
};
