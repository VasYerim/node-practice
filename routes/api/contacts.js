const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../controllers/contactsController");
const {
  validateAddContactFields,
  validateUpdateContactFields,
  validateUpdateFavoriteFields,
} = require("../../middlewares/validationMiddleware");

const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", controllerWraper(getContactsController));

router.get("/:contactId", controllerWraper(getContactByIdController));

router.post(
  "/",
  validateAddContactFields,
  controllerWraper(addContactController)
);

router.delete("/:contactId", controllerWraper(removeContactController));

router.put(
  "/:contactId",
  validateUpdateContactFields,
  controllerWraper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validateUpdateFavoriteFields,
  controllerWraper(updateStatusContactController)
);

module.exports = router;
