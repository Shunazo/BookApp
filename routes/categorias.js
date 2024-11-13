const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/", categoriaController.categorias);
router.get("/create", categoriaController.createForm);
router.post("/create", categoriaController.createCategoria);
router.get("/edit/:id", categoriaController.editForm);
router.post("/edit/:id", categoriaController.editCategoria);
router.get("/delete/:id", categoriaController.deleteCategoria);

module.exports = router;

