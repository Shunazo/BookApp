
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

// Adding association with alias
Autor.associate = (models) => {
    Autor.hasMany(models.Libro, { 
        foreignKey: "autorId", 
        onDelete: 'CASCADE',
        as: 'libros', // Alias for this association
    });
}

module.exports = Autor;
