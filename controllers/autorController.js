const autor = require("../models/autor");
const libro = require("../models/libro");
exports.autores = async (req, res) => {
    try {
        const autores = await autor.findAll({
            include: {
                model: libro, 
                as: 'libros'  
            }
        });

        res.render("autores/autores", { 
            pageTitle: "Lista de Autores", 
            autores: autores.map(a => ({
                ...a.dataValues,
                librosCount: a.libros ? a.libros.length : 0  
            }))
        });
    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
        console.log(error);
    }
};

exports.createForm = (req, res) => {
    res.render("autores/autores-create", { 
        pageTitle: "Crear Autor" 
    });
};

exports.create = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        await autor.create({ nombre, correo });
        res.redirect("/autores");

    } catch (error) {

        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};


exports.editForm = async (req, res) => {
    try {
        const autorId = req.params.id;
        const autorRecord = await autor.findByPk(autorId);

        if (!autor) {
            return res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
        }

        res.render("autores/autores-edit", { 
            pageTitle: "Editar Autor", 
            autor: autorRecord.dataValues
        });

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.edit = async (req, res) => {
    try {
        const autorId = req.params.id;
        const { nombre, correo } = req.body;

        await autor.update({ nombre, correo }, { where: { id: autorId } });

        res.redirect("/autores");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const autorId = req.params.id;

        await autor.destroy({ where: { id: autorId } });
        
        res.redirect("/autores");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};