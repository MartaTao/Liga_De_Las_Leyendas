const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildSchema = new Schema({
    Nombre: String,
    Objetos: String,
    PrecioTotal: String
})

//Creamos el modelo
const Build = mongoose.model('build', buildSchema, "Build");

module.exports = Build;