'use strict';
var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');


/* GET /api/anuncios*/
router.get('/',jwtAuth,require('../../models/filters'));

/* GET /api/anuncios/tags*/ 
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
