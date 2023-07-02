const express = require("express");
const schema = require("../../schema/schema");
const {
  validationBody,
  validationById,
  validationFavorite,
  authenticate,
} = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, validationById, ctrl.getContactById);

router.get(
  "/:contactId/favorite",
  authenticate,
  validationById,
  ctrl.getByIdContactFavorite
);

router.post(
  "/",
  authenticate,
  validationBody(schema.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, validationById, ctrl.removeContact);

router.put(
  "/:contactId",
  validationById,
  validationBody(schema.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validationById,
  validationFavorite(schema.addSchemaFavorite),
  ctrl.updateStatusContact
);

module.exports = router;
