const libro = require("../models/libro");
const autor = require("../models/autor");
const categoria = require("../models/categoria");
const editorial = require("../models/editorial");

exports.getIndex = async(req, res) => {
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";
  const categoriaFilter = req.query.categoria ? req.query.categoria.split(",") : [];

  try {
    const libros = await libro.findAll({
      include: [{ model: autor }, { model: categoria }, { model: editorial }],
    });

    let filteredLibros = libros.filter((libro) => libro.dataValues);

    if (searchQuery) {
      filteredLibros = filteredLibros.filter((libro) =>
        libro.dataValues.titulo.toLowerCase().includes(searchQuery)
      );
    }

    if (categoriaFilter.length > 0) {
      filteredLibros = filteredLibros.filter((libro) =>
        categoriaFilter.includes(libro.categoria.nombre)
      );
    }
    
    res.render("home/home", {
        pageTitle: "Home",
        libros: filteredLibros,
        hasLibros: filteredLibros.length > 0,
        categorias: await categoria.findAll(),
    });
  } catch (error) {
    console.log(error);
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
  }
};

exports.librodetail = async (req, res) => {
  try{
    const libroId = req.params.id;
    const libro = await libro.findByPk(libroId, {
      include: [{ model: autor }, { model: categoria }, { model: editorial }],
    });

    if (!libro) {
      return res.render("404", { pageTitle: "Libro no encontrado." });
    }

    res.render("libros/libro-detail", { 
        pageTitle: "Detalle de Libro", 
        libro: libro.dataValues 
    });
  } catch (error) {
    console.log(error);
    res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
  }
};
