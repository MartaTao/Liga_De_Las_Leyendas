const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skinsSchema = new Schema({
    Nombre: String,
    Universo: String,
    Precio: String,
    Tier:String,
    Img: String,
    Campeon:String,
    Video:String
})

//Creamos el modelo
const Skins = mongoose.model('skins', skinsSchema, "Skins");

module.exports = Skins;