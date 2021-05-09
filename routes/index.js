'use strict';

var express = require('express');
var router = express.Router();

/* GET private page. */

router.get('/',require('../routes/api/filters'));




module.exports = router;