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

// Adding association with alias
Editorial.associate = (models) => {
    Editorial.hasMany(models.Libro, { 
        foreignKey: "editorialId", 
        onDelete: 'CASCADE',
        as: 'libros', // Alias for this association
    });
}

module.exports = Editorial;
