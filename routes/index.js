var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

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

router.post('/parse', function(req, res){
	// parse the pricing (will make this dynamic and not suck in the future)
	var pricing_json = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/Virtual-Machines.js'), 'utf-8'));
	debugger; 
	
	var core = pricing_json.offers['basic-a0']['prices'];
	console.log(core['us-east-windows']);
	
	res.render('index', { title: 'test' });
});

module.exports = router;