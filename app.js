require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/appContext'); 
const { engine } = require("express-handlebars");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const Autor = require('./models/autor');
const Categoria = require('./models/categoria');
const Editorial = require('./models/editorial');
const Libro = require('./models/libro');

const homeRoute = require("./routes/home");
const categoriaRoute = require("./routes/categorias");
const editorialesRoute = require("./routes/editoriales");
const librosRoute = require("./routes/libros");
const autoresRoute = require("./routes/autores");
const errorController = require("./controllers/errorController");

const PORT = 3000;

app.engine(
    "hbs",
    engine({
        layoutsDir: "views/layouts",
        defaultLayout: "main",
        extname: "hbs",
    })
);

app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));


const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    },
});

app.use(multer({ storage: imageStorage }).single('Image'));

Autor.hasMany(Libro, { foreignKey: "autorId", onDelete: 'CASCADE' });
Categoria.hasMany(Libro, { foreignKey: "categoriaId", onDelete: 'CASCADE' });
Editorial.hasMany(Libro, { foreignKey: "editorialId", onDelete: 'CASCADE' });

Libro.belongsTo(Autor, { foreignKey: "autorId" });
Libro.belongsTo(Categoria, { foreignKey: "categoriaId" });
Libro.belongsTo(Editorial, { foreignKey: "editorialId" });

app.use("/", homeRoute);
app.use("/libros", librosRoute);
app.use("/categorias", categoriaRoute);
app.use("/editoriales", editorialesRoute);
app.use("/autores", autoresRoute);
app.use(errorController.get404);

connection
    .sync({})
    .then(() => {
        console.log(`App is running on port ${PORT}`);
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
    });
