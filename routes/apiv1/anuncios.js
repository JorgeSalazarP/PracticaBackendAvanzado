'use strict';
var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

/* GET /apiv1/anuncios*/
router.get('/',require('../../models/filters'));

/* GET /apiv1/anuncios/tags*/ 
//Listamos los tags existentes
router.get('/tags', async (req, res, next) => {

  try {
    
    const result = await Anuncio.listTags();
    res.json(result);

  } catch (err) {
    next(err)
  }
});


      
  

/* POST /apiv1/anuncios*/
// Creamos un nuevo artículo con POST
router.post('/', async (req, res, next) => {
  try {
    const newArticle = req.body; 
    const addArticle = new Anuncio(newArticle);
    const createdArticle = await addArticle.save(); //guardamos en la BBDD

    res.status(201).json({result: createdArticle});

  } catch (err) {
    next(err);
  }
});

module.exports = router;
