const Libro = require("../models/libro");
const Autor = require("../models/autor");
const Categoria = require("../models/categoria");
const Editorial = require("../models/editorial");

exports.getIndex = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    const autores = await Autor.findAll();
    const editoriales = await Editorial.findAll();
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";
    const categoriaFilter = Array.isArray(req.query.categoria) ? req.query.categoria : [];

    let libros = await Libro.findAll({
      include: [
        { model: Autor, as: 'autor' },
        { model: Categoria, as: 'categoria' },
        { model: Editorial, as: 'editorial' }
      ],
    });

    if (searchQuery) {
      libros = libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchQuery)
      );
    }

    if (categoriaFilter.length > 0) {
      libros = libros.filter((libro) => {
        const categoriaNombre = libro.categoria ? libro.categoria.nombre : null;
        return categoriaFilter.includes(categoriaNombre);
      });
    }

    libros = libros.map((libro) => {
      return {
        ...libro.dataValues,
        autor: libro.autor ? libro.autor.dataValues : null,
        categoria: libro.categoria ? libro.categoria.dataValues : null,
        editorial: libro.editorial ? libro.editorial.dataValues : null,
      };
    });

    res.render("home/home", {
      pageTitle: "Home",
      libros: libros,
      autores: autores.map(a => a.dataValues),
      editoriales: editoriales.map(e => e.dataValues),
      categorias: categorias.map(c => c.dataValues),
      hasLibros: libros.length > 0,
    });
  } catch (error) {
    console.log(error);
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente más tarde.",
    });
  }
};

