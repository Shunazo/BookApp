const libro = require("../models/libro");
const autor = require("../models/autor");
const categoria = require("../models/categoria");
const editorial = require("../models/editorial");

exports.getIndex = async(req, res) => {
  try {
    const categorias = await categoria.findAll();
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";
    const categoriaFilter = req.query.categoria ? req.query.categoria.split(",") : [];

    let libros = await libro.findAll({
      include: [{ model: autor }, { model: categoria }, { model: editorial }],
    });

    if (searchQuery) {
      libros = libros.filter((libro) =>
        libro.dataValues.titulo.toLowerCase().includes(searchQuery)
      );
    }

    if (categoriaFilter.length > 0) {
      libros = libros.filter((libro) =>
        categoriaFilter.includes(libro.categoria.nombre)
      );
    }
    
    res.render("home/home", {
        pageTitle: "Home",
        libros: libros.map(l => l.dataValues),
        hasLibros: libros.length > 0,
        categorias: categorias.map(c => c.dataValues),
    });
  } catch (error) {
    console.log(error);
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
  }
};



