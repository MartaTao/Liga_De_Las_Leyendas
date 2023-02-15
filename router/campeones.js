const express = require('express');
const router = express.Router();
const Campeones = require('../models/campeones');

router.get('/', async (req, res) => {
    try {
        const arrayCampeonesDB = await Campeones.find();
        console.log(arrayCampeonesDB);
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
    console.log(body) 
    try {
        const campeonesDB = new Campeones(body) 
        await campeonesDB.save()
        res.redirect('/campeones') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const campeonesDB = await Campeones.findOne({ _id: id }) 
        console.log(campeonesDB)
        res.render('detalleCamepon', { 
            campeones:campeonesDB,
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
        const campeonesDB = await Campeones.findByIdAndDelete({ _id: id });
        console.log(campeonesDB)
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
    console.log(id)
    console.log('body', body)
    try {
        const campeonesDB = await Campeones.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(campeonesDB)
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