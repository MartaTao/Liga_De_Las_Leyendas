const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render("index");
})
router.get('/menu', (req, res) => {
    if (req.session.user) {
        res.render('menu', { 
            cuenta:req.session.usuario
        });
      } else {
        res.redirect('/');
      }
})
module.exports = router;