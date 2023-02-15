const express = require('express');
const router = express.Router();
const Campeones = require('../models/campeones');

router.get('/', async (req, res) => {
    try {
        const arrayCampeonesDB = await Campeones.find();
        res.render("campeones", {
            arrayCampeones: arrayCampeonesDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearCampeon', (req, res) => {
    res.render('crearCampeon'); 
})
router.post('/', async (req, res) => {
    const body = req.body 
    try {
        const campeonesDB = new Campeones(body) 
        await campeonesDB.save()
        res.redirect('/campeones') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id/editar', async(req, res) => { 
    const id = req.params.id 
    try {
        const campeonesDB = await Campeones.findOne({ _id: id }) 
        res.render('detalleCampeon', { 
            campeones:campeonesDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalleCampeon', { 
            error: true,
            mensaje: 'Campeon no encontrado!'
        })
    }
})
router.get('/:id/:nombre', async(req, res) => { 
    const id = req.params.id 
    try {
        const campeonesDB = await Campeones.findOne({ _id: id }) 
        res.render('campeon', { 
            campeon:campeonesDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('campeon', { 
            error: true,
            mensaje: 'Campeon no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const campeonesDB = await Campeones.findByIdAndDelete({ _id: id });
        if (!campeonesDB) {
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
    try {
        const campeonesDB = await Campeones.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
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