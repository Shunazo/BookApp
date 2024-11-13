const Sequelize = require("sequelize");
const connection = require("../database/appContext");

const Categoria = connection.define("categoria", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});



module.exports = Categoria;
