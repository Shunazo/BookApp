const Libro = require("../models/libro");
const Autor = require("../models/autor");
const Categoria = require("../models/categoria");
const Editorial = require("../models/editorial");
const transporter = require("../services/EmailService");

exports.libros = async (req, res) => {
    try {
        const libros = await Libro.findAll({
            include: [
                { model: Autor, as: 'autor' },
                { model: Categoria, as: 'categoria' },
                { model: Editorial, as: 'editorial' }
            ]
        });

        const autores = await Autor.findAll();
        const categorias = await Categoria.findAll();
        const editoriales = await Editorial.findAll();
        
        const librosData = libros.map(l => ({
            ...l.dataValues,
            autor: l.autor ? l.autor.dataValues : null,
            categoria: l.categoria ? l.categoria.dataValues : null,
            editorial: l.editorial ? l.editorial.dataValues : null
        }));

       
        res.render("libros/libros", { 
            pageTitle: "Lista de Libros", 
            libros: librosData,
            autores: autores.map(a => a.dataValues),
            categorias: categorias.map(c => c.dataValues),
            editoriales: editoriales.map(e => e.dataValues)
        });
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};

exports.createForm = async (req, res) => {
    try {
        console.log("Accessing create form..."); 
        const [autores, categorias, editoriales] = await Promise.all([
            Autor.findAll(),
            Categoria.findAll(),
            Editorial.findAll()
        ]);

        if (!autores.length) {
            return res.render("404", { pageTitle: "No se encontraron autores, debe crearlos primero." });
        }

        if (!categorias.length) {
            return res.render("404", { pageTitle: "No se encontraron categorias, debe crearlas primero." });
        }

        if (!editoriales.length) {
            return res.render("404", { pageTitle: "No se encontraron editoriales, debe crearlas primero." });
        }

        res.render("libros/libros-create", { 
            pageTitle: "Crear Libro", 
            autores: autores.map(a => a.dataValues),
            categorias: categorias.map(c => c.dataValues),
            editoriales: editoriales.map(e => e.dataValues)
        });

    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};

exports.create = async (req, res) => {
    try {
        const { titulo, fechaPublicacion, autorId, categoriaId, editorialId } = req.body;
        const imagePath = "/" + req.file.path;
        
        if (!req.file) {
            return res.render("404", { pageTitle: "La imagen es obligatoria." });
        }
        
        const libroRecord = await Libro.create({ titulo, imagePath, fechaPublicacion, autorId, categoriaId, editorialId });
        const autorRecord = await Autor.findByPk(autorId);
        
        if (autorRecord) {
            transporter.sendMail(
                {
                    from: "Libros notifications <no-reply@example.com>",
                    to: autorRecord.correo,
                    subject: `Nuevo libro creado: ${titulo}`,
                    html: `<p>Hola ${autorRecord.nombre},</p>
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
        const libroRecord = await Libro.findByPk(libroId, {
            include: [
                { model: Autor, as: 'autor' },
                { model: Categoria, as: 'categoria' },
                { model: Editorial, as: 'editorial' }
            ]
        });

        if (!libroRecord) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }

        const [autores, categorias, editoriales] = await Promise.all([
            Autor.findAll(),
            Categoria.findAll(),
            Editorial.findAll()
        ]);

        autores.forEach(autor => {
            autor.selected = autor.id === libroRecord.autorId;
        });

        categorias.forEach(categoria => {
            categoria.selected = categoria.id === libroRecord.categoriaId;
        });

        editoriales.forEach(editorial => {
            editorial.selected = editorial.id === libroRecord.editorialId;
        });
         

        res.render("libros/libros-edit", { 
            pageTitle: "Editar Libro", 
            libro: libroRecord.dataValues, 
            autores: autores.map(a => a.dataValues),
            categorias: categorias.map(c => c.dataValues),
            editoriales: editoriales.map(e => e.dataValues),
            currentImage: libroRecord.imagePath
        });

    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};


exports.edit = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libroRecord = await Libro.findByPk(libroId);
        const { titulo, fechaPublicacion, autorId, categoriaId, editorialId } = req.body;
        const imagePath = req.file ? "/" + req.file.path : libroRecord.imagePath;

        if (!req.file && !imagePath) {
            return res.render("404", { pageTitle: "La imagen es obligatoria." });
        }
        
        if (!libroRecord) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }
        
        await libroRecord.update({ titulo, imagePath, fechaPublicacion, autorId, categoriaId, editorialId });
        const autor = await Autor.findByPk(autorId);
        
        if (autor) { 
            transporter.sendMail(
                {
                    from: "Libros notifications <no-reply@example.com>",
                    to: autor.correo,
                    subject: `Libro actualizado: ${titulo}`,
                    html: `<p>Hola ${autor.nombre},</p>
                           <p>El libro titulado "<strong>${titulo}</strong>" se le ha asignado o fue actualizado con éxito.</p>`
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
        const libroRecord = await Libro.findByPk(libroId);
        
        if (!libroRecord) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }
        
        await libroRecord.destroy({ where: { id: libroId } });
        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }   
};

exports.librodetail = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libroRecord = await Libro.findByPk(libroId, {
            include: [
                { model: Autor, as: 'autor' },
                { model: Categoria, as: 'categoria' },
                { model: Editorial, as: 'editorial' }
            ]
        });

        if (!libroRecord) {
            return res.render("404", { pageTitle: "Libro no encontrado." });
        }

        const libroData = {
            ...libroRecord.dataValues,
            autor: libroRecord.autor ? libroRecord.autor.dataValues : null,
            categoria: libroRecord.categoria ? libroRecord.categoria.dataValues : null,
            editorial: libroRecord.editorial ? libroRecord.editorial.dataValues : null,
        };

        res.render("home/libro-detail", { 
            pageTitle: "Detalle de Libro", 
            libro: libroData 
        });
    } catch (error) {
        console.error(error);
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente más tarde." });
    }
};

