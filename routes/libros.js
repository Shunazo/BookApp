const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.libros);
router.get("/create", libroController.createForm);
router.post("/create", libroController.createLibro);
router.get("/edit/:id", libroController.editForm);
router.post("/edit/:id", libroController.editLibro);
router.get("/delete/:id", libroController.deleteLibro);

module.exports = router;

