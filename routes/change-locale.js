'use strict';

var express = require('express');
var router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', function(req, res, next) {
  const locale = req.params.locale;
  
  //cookie con el idioma seleccinado
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });
  
  // Redirigimos a la página de donde venía
  res.redirect(req.get('referer'));
});

module.exports = router;