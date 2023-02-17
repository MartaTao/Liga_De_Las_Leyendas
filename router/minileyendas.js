const express = require('express');
const router = express.Router();
const MiniLeyendas = require('../models/miniLeyendas');

router.get('/', async (req, res) => {
    try {
        const arrayMiniLeyendasDB = await MiniLeyendas.find();
        res.render("minileyendas", {
            arrayMinileyendas: arrayMiniLeyendasDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearMiniLeyenda', (req, res) => {
    res.render('crearMiniLeyenda'); 
})
router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const miniLeyendasDB = new MiniLeyendas(body) 
        await miniLeyendasDB.save()
        res.redirect('/miniLeyendas') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id/editar', async(req, res) => { 
    const id = req.params.id 
    try {
        const miniLeyendasDB = await MiniLeyendas.findOne({ _id: id }) 
        console.log(miniLeyendasDB)
        res.render('detalleMinileyenda', { 
            miniLeyendas:miniLeyendasDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalleMinileyenda', { 
            error: true,
            mensaje: 'MiniLeyendas no encontrado!'
        })
    }
})
router.get('/:id/:nombre', async(req, res) => { 
    const id = req.params.id 
    try {
        const miniLeyendasDB = await MiniLeyendas.findOne({ _id: id }) 
        console.log(miniLeyendasDB)
        res.render('minileyenda', { 
            miniLeyendas:miniLeyendasDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('minileyenda', { 
            error: true,
            mensaje: 'MiniLeyendas no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const miniLeyendasDB = await MiniLeyendas.findByIdAndDelete({ _id: id });
        console.log(miniLeyendasDB)
        if (!miniLeyendasDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la MiniLeyendas.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'MiniLeyendas eliminado.'
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
        const miniLeyendasDB = await MiniLeyendas.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(miniLeyendasDB)
        res.json({
            estado: true,
            mensaje: 'Campeon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la MiniLeyendas'
        })
    }
})
module.exports = router;