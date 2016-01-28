var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* UPLOAD */
router.post('/upload', function(req, res) {
	console.dir(req.files);
});

module.exports = router;
