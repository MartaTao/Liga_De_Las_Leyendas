const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
require('dotenv').config();
const port = process.env.PORT;
//Conexión a base de datos
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p95hqay.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: false }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e));
//Plantilla
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//Middleware
app.use(express.static(__dirname + '/public'));
// Llamadas a las rutas
app.use("/", require("./router/rutas"));
app.use("/campeones", require("./router/campeones"));
app.use("/skins", require("./router/skins"));
app.use("/modos", require("./router/modos"));
app.use("/minileyendas", require("./router/minileyendas"));
app.use("/builds", require("./router/build"));
app.use("/items", require("./router/items"));
app.use("/login", require("./router/login"));
app.use("/menu", require("./router/rutas"));
// Si no se encuentra el recurso (Error 404) con página personalizada
app.use((req, res) => {
  res.status(404).render("404", {
    cabecera: "404",
    titulo: "Error 404",
    descripcion: "Page Not Found"
  });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})