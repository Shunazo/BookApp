const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/", categoriaController.categorias);
router.get("/create", categoriaController.createForm);
router.post("/create", categoriaController.create);
router.get("/edit/:id", categoriaController.editForm);
router.post("/edit/:id", categoriaController.edit);
router.post("/delete/:id", categoriaController.delete);

module.exports = router;

