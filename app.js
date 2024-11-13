const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/appContext');
const { engine } = require("express-handlebars");

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

app.use("/", homeRoute);
app.use("/categorias", categoriaRoute);
app.use("/editoriales", editorialesRoute);
app.use("/libros", librosRoute);
app.use("/autores", autoresRoute);
app.use(errorController.get404);

connection
    .sync({})
    .then((result) => {
        console.log(`App is running on port ${PORT}`)
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
});
    
