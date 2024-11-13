const Sequelize = require("sequelize");
const connection = require("../database/appContext");
const Libro = require("./libro");

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

Editorial.hasMany(Libro, { foreignKey: "editorialId", onDelete: 'CASCADE' });
Libro.belongsTo(Editorial, { foreignKey: "editorialId", onDelete: 'CASCADE' });

module.exports = Editorial;