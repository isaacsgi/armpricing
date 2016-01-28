var express = require('express');
var router = express.Router();
var multer = require("multer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARM Pricing' });
});

router.post('/',[ multer({ dest: './uploads/'}), function(req, res){
	console.log(req.body);
	console.log(req.files);
	res.status(204).end();
}]);

router.post('/', function (req, res){
	console.dir(req.files);
});

module.exports = router;