const express = require('express');
const router = express.Router();
const Skins = require('../models/Skins');

router.get('/', async (req, res) => {
    try {
        const arraySkinsDB = await Skins.find();
        res.render("skins", {
            arraySkins: arraySkinsDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crear', (req, res) => {
    res.render('crear'); 
})
router.post('/', async (req, res) => {
    const body = req.body
    console.log(body) 
    try {
        const skinsDB = new Skins(body) 
        await skinsDB.save() 
        res.redirect('/skins') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id
    try {
        const skinsDB = await Skins.findOne({ _id: id })
        console.log(skinsDB) 
        res.render('detalle', { 
            Skins:skinsDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Campeon no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const skinsDB = await Skins.findByIdAndDelete({ _id: id });
        console.log(skinsDB)

        if (!skinsDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Campeon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Campeon eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const skinsDB = await Skins.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(skinsDB)
        res.json({
            estado: true,
            mensaje: 'Campeon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Campeon'
        })
    }
})
module.exports = router;