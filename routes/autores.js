const express = require("express");
const router = express.Router();
const autorController = require("../controllers/autorController");

router.get("/", autorController.autores);
router.get("/create", autorController.createForm);
router.post("/create", autorController.create);
router.get("/edit/:id", autorController.editForm);
router.post("/edit/:id", autorController.edit);
router.post("/delete/:id", autorController.delete);

module.exports = router;