const express = require('express');
const router = express.Router();
const Administradores = require('../models/administradores');
const bcrypt=require("bcrypt");
router.get('/',(req,res)=>{
    res.render('login',{
        error:false
    });
})
router.post('/',async (req,res)=>{
    const { nombre, contrasena }=req.body;
    console.log(nombre);
    console.log(contrasena);
    if (!nombre && !contrasena) {
        return res.render('login', { error: 'Usuario y contraseña vacíos' });
     }
    try{
        const usuario= await Administradores.findOne({nombre})
        console.log(usuario);
        if( usuario.Contrasena==contrasena){
            req.session.user=usuario;
            res.redirect('/menu');
        }else{
            res.render('login',{
                error:'Contraseña incorrecta'
            });
        }
    }catch(error){
        console.log('Se ha producido un error', error)
        res.render('login',{
            error:'Usuario no encontrado'
        });
    }
})
module.exports = router;