const express = require('express');
const router = express.Router();
const Build = require('../models/build');

router.get('/', async (req, res) => {
    try {
        const arrayBuildDB = await Build.find();
        res.render("builds", {
            arrayBuild: arrayBuildDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearBuild', (req, res) => {
    res.render('crearBuild'); 
})
router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const buildDB = new Build(body) 
        await buildDB.save()
        res.redirect('/builds') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id/editar', async(req, res) => { 
    const id = req.params.id 
    try {
        const buildDB = await Build.findOne({ _id: id }) 
        console.log(buildDB)
        res.render('detalleBuild', { 
            build:buildDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalleBuild', { 
            error: true,
            mensaje: 'Build no encontrada!'
        })
    }
})
router.get('/:id/:nombre', async(req, res) => { 
    const id = req.params.id 
    try {
        const buildDB = await Build.findOne({ _id: id }) 
        console.log(buildDB)
        res.render('build', { 
            build:buildDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('build', { 
            error: true,
            mensaje: 'Build no encontrada!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const buildDB = await Build.findByIdAndDelete({ _id: id });
        console.log(buildDB)
        if (!buildDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la Build.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Build eliminado.'
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
        const buildDB = await Build.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(buildDB)
        res.json({
            estado: true,
            mensaje: 'Build editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la Build'
        })
    }
})
module.exports = router;