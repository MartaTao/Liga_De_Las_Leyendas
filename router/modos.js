const express = require('express');
const router = express.Router();
const Modo = require('../models/Modo');

router.get('/', async (req, res) => {
    try {
        const arrayModoDB = await Modo.find();
        res.render("modos", {
            arrayModo: arrayModoDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearModo', (req, res) => {
    res.render('crearModo'); 
})
router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body)
    try {
        const modoDB = new Modo(body)
        await modoDB.save() 
        res.redirect('/modos') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id/editar', async(req, res) => { 
    const id = req.params.id
    try {
        const modoDB = await Modo.findOne({ _id: id })
        console.log(modoDB)
        res.render('detalleModo', {
            modo:modoDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalleModo', { 
            error: true,
            mensaje: 'Modo no encontrado!'
        })
    }
})
router.get('/:id/:nombre', async(req, res) => { 
    const id = req.params.id
    try {
        const modoDB = await Modo.findOne({ _id: id })
        console.log(modoDB)
        res.render('modo', {
            modo:modoDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('modo', { 
            error: true,
            mensaje: 'Modo no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const modoDB = await Modo.findByIdAndDelete({ _id: id });
        console.log(modoDB)

        if (!modoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Modo.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Modo eliminado.'
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
        const modoDB = await Modo.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(modoDB)
        res.json({
            estado: true,
            mensaje: 'Modo editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Modo'
        })
    }
})
module.exports = router;