// models/editorial.js
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


Editorial.associate = (models) => {
    Editorial.hasMany(models.Libro, { 
        foreignKey: "editorialId", 
        onDelete: 'CASCADE',
        as: 'libros', 
    });
}

module.exports = Editorial;
