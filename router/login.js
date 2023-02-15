const express = require('express');
const router = express.Router();
const Administradores = require('../models/administradores');
const bcrypt=require("bcrypt");
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',(req,res)=>{
    const { nombre, contrasena }=req.body;
    Administradores.findOne({nombre},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            if(user){
                if(user.contrasena==contrasena){
                    req.session.user=user;
                    res.redirect('/menu');
                }else{
                    res.render('login',{
                        error:'Contraseña incorrecta'
                    });
                }
            }else{
                res.render('login',{
                    error:'Usuario no encontrado'
                });
            }
        }
    })
})
module.exports = router;