const { registration, login } = require("../../services/authservice");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  res.json({ message: "success" });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);

  res.json({ message: "success", token });
};

module.exports = {
  registrationController,
  loginController,
};
