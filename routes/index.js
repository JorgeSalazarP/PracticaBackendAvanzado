'use strict';

var express = require('express');
var router = express.Router();

/* GET private page. */

router.get('/',require('../models/filters'));




module.exports = router;