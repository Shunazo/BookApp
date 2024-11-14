// models/libro.js
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

// Adding associations with alias
Libro.associate = (models) => {
    Libro.belongsTo(models.Autor, { 
        foreignKey: "autorId", 
        onDelete: 'CASCADE',
        as: 'autor', // Alias for this association
    });
    Libro.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        onDelete: 'CASCADE',
        as: 'categoria', // Alias for this association
    });
    Libro.belongsTo(models.Editorial, {
        foreignKey: "editorialId",
        onDelete: 'CASCADE',
        as: 'editorial', // Alias for this association
    });    
};
module.exports = Libro;
