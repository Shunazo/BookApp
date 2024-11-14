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


Libro.associate = (models) => {
    Libro.belongsTo(models.Autor, { 
        foreignKey: "autorId", 
        onDelete: 'CASCADE',
        as: 'autor', 
    });
    Libro.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        onDelete: 'CASCADE',
        as: 'categoria', 
    });
    Libro.belongsTo(models.Editorial, {
        foreignKey: "editorialId",
        onDelete: 'CASCADE',
        as: 'editorial', 
    });    
};
module.exports = Libro;
