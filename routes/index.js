var express = require('express');
var router = express.Router();
const startupProcess = require('../utilities/startup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wow' });
});

module.exports = router;
