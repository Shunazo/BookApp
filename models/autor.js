
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


Autor.associate = (models) => {
    Autor.hasMany(models.Libro, { 
        foreignKey: "autorId", 
        onDelete: 'CASCADE',
        as: 'libros', 
    });
}

module.exports = Autor;
