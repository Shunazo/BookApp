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

Categoria.hasMany(Libro, { foreignKey: "categoriaId", onDelete: 'CASCADE' });
Libro.belongsTo(Categoria, { foreignKey: "categoriaId", onDelete: 'CASCADE' });

module.exports = Categoria;