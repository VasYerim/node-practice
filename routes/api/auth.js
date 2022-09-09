const express = require("express");
const { controllerWraper } = require("../../helpers/apiHelpers");
const {
  registrationController,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/registration", controllerWraper(registrationController));

router.post("/login", controllerWraper(loginController));

module.exports = {
  authRouter: router,
};
