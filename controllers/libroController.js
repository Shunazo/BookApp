const libro = require("../models/libro");
const autor = require("../models/autor");
const categoria = require("../models/categoria");
const editorial = require("../models/editorial");

exports.libros = async (req, res) => {
    try {
        const libros = await libro.findAll(
            {
                include: 
                [
                    { model: autor }, 
                    { model: categoria },
                    {model: editorial }
                ]
            }
        );
        
        res.render("libros/libros", { 
            pageTitle: "Lista de Libros", 
            libros: libros.map(l => l.dataValues)
        });
    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.createForm = async (req, res) => {
    try {

        const [autores, categorias, editoriales] = await Promise.all([
            autor.findAll(),
            categoria.findAll(),
            editorial.findAll()
        ]);

        if (!autores.length) {
            return res.render("404", 
                { pageTitle: "No se encontraron autores, debe crearlos primero."});
        }

        if (!categorias.length) {
            return res.render("404", 
                { pageTitle: "No se encontraron categorias, debe crearlas primero."});
        }

        if (!editoriales.length) {
            return res.render("404", 
                { pageTitle: "No se encontraron editoriales, debe crearlos primero."});
        }

        res.render("libros/libros-create", { 
            pageTitle: "Crear Libro", 
            autores: autores.map(a => a.dataValues),
            categorias: categorias.map(c => c.dataValues),
            editoriales: editoriales.map(e => e.dataValues)
        });

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const { titulo, fechaPublicacion, autorId, categoriaId, editorialId } = req.body;
        const imagePath = "/" + req.file.path;
        
        if (!req.file) {
            return res.render("404", { pageTitle: "La imagen es obligatoria." });
        }
        
        const libro = await libro.create({ titulo, imagePath, fechaPublicacion, autorId, categoriaId, editorialId });
        const autor = await Autor.findByPk(autorId);
        
        if (autor) {
            transporter.sendMail(
                {
                    from: "Libros notifications <no-reply@example.com>",
                    to: autor.correo,
                    subject: `Nuevo libro creado: ${titulo}`,
                    html: `<p>Hola ${autor.nombre},</p>
                           <p>El libro titulado "<strong>${titulo}</strong>" ha sido creado con éxito.</p>`
                },
                (err) => {
                    if (err) console.log("Error al enviar el email:", err);
                }
            );
        }

        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};

exports.editForm = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libroRecord = await libro.findByPk(libroId);

        if (!libro) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }

        const [autores, categorias, editoriales] = await Promise.all([
            autor.findAll(),
            categoria.findAll(),
            editorial.findAll()
        ]);

        res.render("libros/libros-edit", { 
            pageTitle: "Editar Libro", 
            libro: libroRecord.dataValues, 
            autores: autores.map(a => a.dataValues),
            categorias: categorias.map(c => c.dataValues),
            editoriales: editoriales.map(e => e.dataValues)
        });

    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};

exports.edit = async (req, res) => {
    try {
        const libroId = req.params.id;
        const { titulo, fechaPublicacion, autorId, categoriaId, editorialId } = req.body;
        const imagePath = req.file ? "/" + req.file.path : libro.imagePath;

        
        if (!req.file) {
            return res.render("404", { pageTitle: "La imagen es obligatoria." });
        }
        
        const libroRecord = await libro.findByPk(libroId);
        
        if (!libroRecord) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }
        
        await libro.update({ titulo, imagePath, fechaPublicacion, autorId, categoriaId, editorialId });
        const autor = await Autor.findByPk(autorId);
        
        if (autor) { 
            transporter.sendMail(
                {
                    from: "Libros notifications <no-reply@example.com>",
                    to: autor.correo,
                    subject: `Libro actualizado: ${titulo}`,
                    html: `<p>Hola ${autor.nombre},</p>
                           <p>El libro titulado "<strong>${titulo}</strong>" ha sido actualizado con éxito.</p>`
                },
                (err) => {
                    if (err) console.log("Error al enviar el email:", err);
                }
            );
        }

        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }   
};

exports.delete = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libro = await libro.findByPk(libroId);
        
        if (!libro) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }
        
        await libro.destroy();
        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }   
};

exports.librodetail = async (req, res) => {
    try{
      const libroId = req.params.id;
      const libroRecord = await libro.findByPk(libroId, {
        include: [{ model: autor }, { model: categoria }, { model: editorial }],
      });
  
      if (!libroRecord) {
        return res.render("404", { pageTitle: "Libro no encontrado." });
      }
  
      res.render("libros/libro-detail", { 
          pageTitle: "Detalle de Libro", 
          libro: libroRecord.dataValues 
      });
    } catch (error) {
      console.log(error);
      res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
    }
  };