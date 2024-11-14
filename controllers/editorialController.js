const editorial = require("../models/editorial");
const libro = require("../models/libro");
exports.editoriales = async (req, res) => {
    try {
        const editoriales = await editorial.findAll({
            include: {
                model: libro,
                as: 'libros'
            }
        });

        res.render("editoriales/editoriales", { 
            pageTitle: "Lista de Editoriales", 
            editoriales: editoriales.map(e => ({
                ...e.dataValues,
                librosCount: e.libros ? e.libros.length : 0
            }))
        });

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.createForm = (req, res) => {
    res.render("editoriales/editoriales-create", { 
        pageTitle: "Crear Editorial" 
    });
};

exports.create = async (req, res) => {
    try {
        const { nombre, telefono, pais } = req.body;
        await editorial.create({ nombre, telefono, pais });
        res.redirect("/editoriales");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
        });
        console.log(error);
    }
};

exports.editForm = async (req, res) => {
    try {
        const editorialId = req.params.id;
        const editorialRecord = await editorial.findByPk(editorialId);

        if (!editorial) {
            return res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
        }

        res.render("editoriales/editoriales-edit", {
            pageTitle: "Editar Editorial",
            editorial: editorialRecord.dataValues
        }); 

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};
    
exports.edit = async (req, res) => {
    try {
        const editorialId = req.params.id;
        const { nombre, telefono, pais } = req.body;

        await editorial.update({ nombre, telefono, pais }, { where: { id: editorialId } });

        res.redirect("/editoriales");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const editorialId = req.params.id;

        await editorial.destroy({ where: { id: editorialId } });
        
        res.redirect("/editoriales");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};