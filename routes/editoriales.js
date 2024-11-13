const express = require("express");
const router = express.Router();
const editorialController = require("../controllers/editorialController");

router.get("/", editorialController.getEditoriales);
router.get("/create", editorialController.createForm);
router.post("/create", editorialController.createEditorial);
router.get("/edit/:id", editorialController.editForm);
router.post("/edit/:id", editorialController.editEditorial);
router.get("/delete/:id", editorialController.deleteEditorial);

module.exports = router;