const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.libros);
router.get("/create", libroController.createForm);
router.post("/create", libroController.create);
router.get("/edit/:id", libroController.editForm);
router.post("/edit/:id", libroController.edit);
router.post("/delete/:id", libroController.delete);
router.get("/:id([0-9]+)", libroController.librodetail);


module.exports = router;

