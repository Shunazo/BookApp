const Sequelize = require("sequelize");
const connection = require("../database/appContext");

const Libro = connection.define("libro", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fechaPublicacion: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    autorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    editorialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});


module.exports = Libro;
