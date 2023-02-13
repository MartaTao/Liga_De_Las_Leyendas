const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modoSchema = new Schema({
    Nombre: String,
    NumJugadores: String,
    Descripcion: String
})

//Creamos el modelo
const Modo = mongoose.model('modo', modoSchema, "Modo");

module.exports = Modo;