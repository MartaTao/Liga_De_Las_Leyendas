const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minileyendasSchema = new Schema({
    Nombre: String,
    Tier: String,
    Precio: String ,
    Fecha: String,
    Img: String,
    Video:String
})

//Creamos el modelo
const Minileyendas = mongoose.model('minileyendas', minileyendasSchema, "Minileyendas");

module.exports = Minileyendas;