'use strict';

var express = require('express');
var router = express.Router();

const path = require('path');
const multer = require('multer');
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');
const thumbnailRequester = require('../../microservices/thumbnailRequester');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,path.join('public/images'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


/* GET /api/anuncios*/
router.get('/',jwtAuth,require('../../routes/api/filters'));

/* GET /api/anuncios/tags*/ 
//Listamos los tags existentes
router.get('/tags',jwtAuth, async(req, res, next) => {

  try {
    
    const result = await Anuncio.listTags();
    res.json(result);

  } catch (err) {
    next(err)
  }
});

/* POST /api/anuncios*/
// Creamos un nuevo artículo con POST
router.post('/', async(req, res, next) => {

    const upload = multer({ storage }).single('foto');
    upload(req, res, async function(err){
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err});
      } else if (err) {
        return res.status(400).json({ message: err});
      }
      const thumpnailPatch = req.file.originalname;
      const urlPatch = `${req.file.path.replace('public', '').replace('\\', '/').replace('\\', '/')}`
      await thumbnailRequester(thumpnailPatch);

      try {
        const newArticle = req.body; 
        const addArticle = new Anuncio(newArticle);
        addArticle.foto = urlPatch;
        const createdArticle = await addArticle.save(); //guardamos en la BBDD
        res.status(201).json({result: createdArticle});
      } catch (error) {
        next();
      }
    });

});

module.exports = router;

