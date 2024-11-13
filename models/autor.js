const Sequelize = require("sequelize");
const connection = require("../database/appContext");

const Autor = connection.define("autor", {
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
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});



module.exports = Autor;
