const categoria = require("../models/categoria");

exports.categorias = async (req, res) => {
    try {
        const categorias = await categoria.findAll();

        res.render("categorias/categorias", { 
            pageTitle: "Lista de Categorias", 
            categorias: categorias.map(c => c.dataValues)
        });

    } catch (error) {    
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.createForm = (req, res) => {
    res.render("categorias/categorias-create", { 
        pageTitle: "Crear Categoria" 
    });
};

exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        await categoria.create({ nombre, descripcion });
        res.redirect("/categorias");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.editForm = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        const categoria = await categoria.findByPk(categoriaId);

        if (!categoria) {
            return res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." });
        }

        res.render("categorias/categorias-edit", { 
            pageTitle: "Editar Categoria", 
            categoria: categoria.dataValues 
        });

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};

exports.editCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        const { nombre, descripcion } = req.body;

        await categoria.update({ nombre, descripcion }, { where: { id: categoriaId } });

        res.redirect("/categorias");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
        });
        console.log(error);
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;

        await categoria.destroy({ where: { id: categoriaId } });
        
        res.redirect("/categorias");

    } catch (error) {
        res.render("404", { pageTitle: "Se produjo un error, vuelva al home o intente mas tarde." 
        });
        console.log(error);
    }
};