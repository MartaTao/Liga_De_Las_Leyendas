const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campeonesSchema = new Schema({
    Nombre: String,
    FechaSalida: String,
    Habilidades: String,
    Lore: String,
    Precio: String,
    Region:String,
    Img:String
})

//Creamos el modelo
const Campeones = mongoose.model('campeones', campeonesSchema, "Campeones");

module.exports = Campeones;