'use strict';

var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/',require('../models/filters'));


module.exports = router;



