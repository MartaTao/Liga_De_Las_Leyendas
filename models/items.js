const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    Nombre: String,
    Tier: String,
    Precio: String,
    MiniComponentes: String
})

//Creamos el modelo
const Items = mongoose.model('items', itemsSchema, "Items");

module.exports = Items;