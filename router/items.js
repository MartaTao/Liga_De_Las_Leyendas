const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.get('/', async (req, res) => {
    try {
        const arrayItemsDB = await Items.find();
        console.log(arrayItemsDB);
        res.render("items", {
            arrayItems: arrayItemsDB
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
        const itemsDB = new Items(body) 
        await itemsDB.save()
        res.redirect('/items') 
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const itemsDB = await Items.findOne({ _id: id }) 
        console.log(itemsDB)
        res.render('detalle', { 
            items:itemsDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalle', { 
            error: true,
            mensaje: 'items no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const itemsDB = await Items.findByIdAndDelete({ _id: id });
        console.log(itemsDB)
        if (!itemsDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la items.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'items eliminado.'
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
        const itemsDB = await items.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(itemsDB)
        res.json({
            estado: true,
            mensaje: 'Campeon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la items'
        })
    }
})
module.exports = router;