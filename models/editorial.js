const Sequelize = require("sequelize");
const connection = require("../database/appContext");

const Editorial = connection.define("editorial", {
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
    telefono: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pais: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Editorial;
