const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Nombre: String,
    Contrasena: String,
    Correo: String
})

//Creamos el modelo
const Administradores = mongoose.model('administradores', adminSchema, "Administradores");

module.exports = Administradores;