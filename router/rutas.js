const express = require('express');
const router = express.Router();
const Campeones = require('../models/campeones');
const Build = require('../models/build');
const MiniLeyendas = require('../models/miniLeyendas');
const Modo = require('../models/Modo');
router.get('/', async (req, res) => {
  try {
    const arrayCampeonesDB = await Campeones.find();
    const arrayBuildDB = await Build.find();
    const arrayMiniLeyendasDB = await MiniLeyendas.find();
    const arrayModoDB = await Modo.find();
    res.render("index", {
      arrayCampeones: arrayCampeonesDB,
      arrayBuild: arrayBuildDB,
      arrayMinileyendas: arrayMiniLeyendasDB,
      arrayModo: arrayModoDB
    })
  } catch (error) {
    console.error(error)
  }
})
router.get('/menu', (req, res) => {
  if (req.session.user) {
    res.render('menu', {
      cuenta: req.session.usuario
    });
  } else {
    res.redirect('/');
  }
})
module.exports = router;