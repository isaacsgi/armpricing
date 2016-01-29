var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var util = require('util');

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
	var input_json = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/test.js'), 'utf-8'));

	var input = input_json['resources'];
	input.forEach(function(item){
		if (item['type'] == 'Microsoft.Compute/virtualMachines') {
			var coreItem = item['properties']['hardwareProfile']['vmSize'].toLowerCase();
			var coreItem2 = coreItem.replace('_','-');
			var location = item['location'];
			console.log(location);
			var final_price = pricing_json.offers[coreItem2]['prices']['us-west-windows'];
			
			var output = { title: 'Test', prices: { "vmSize": coreItem2, "vmLocation": location, "vmPrice": final_price }};
			console.log(output);
			res.render('results', output);
		}
	});
});

module.exports = router;