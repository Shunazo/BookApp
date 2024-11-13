const express = require("express");
const router = express.Router();
const autorController = require("../controllers/autorController");

router.get("/", autorController.getAutores);
router.get("/create", autorController.createForm);
router.post("/create", autorController.createAutor);
router.get("/edit/:id", autorController.editForm);
router.post("/edit/:id", autorController.editAutor);
router.get("/delete/:id", autorController.deleteAutor);

module.exports = router;