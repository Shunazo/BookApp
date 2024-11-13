const express = require("express");
const router = express.Router();
const editorialController = require("../controllers/editorialController");

router.get("/", editorialController.editoriales);
router.get("/create", editorialController.createForm);
router.post("/create", editorialController.create);
router.get("/edit/:id", editorialController.editForm);
router.post("/edit/:id", editorialController.edit);
router.post("/delete/:id", editorialController.delete);

module.exports = router;