const express = require('express');
const Administradores = require('../models/administradores');
const bcrypt=require("bcrypt");
const router = express.Router();
router.post("/login",(req,res)=>{
    const nombre=req.body.nombre;
    const pass=req.body.pass;
    Administradores.findOne({nombre:nombre},(err, user)=>{
        if(err){
            console.log(err);
        }else{
            if(user){
                bcrypt.compare(pass, user.contrasena, (err, result)=>{
                    if(result===true){
                        res.render('menu');
                    }else{
                        res.render('login');
                    }
                });
            }else{
                res.render('login');
            }
        }
    })
})