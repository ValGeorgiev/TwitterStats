var express = require('express');
var router = express.Router();

var Twitt = require('../models/twitts');

router.get('/stats/all', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
    
	Twitt.findAll(function(err, tweets) {
		if(err) {console.log(err)};
		
		res.send(JSON.stringify(tweets, null, 4));
	})
});

router.get('/stats/reduce', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
    
	Twitt.reducer(function (err, model, stats) {
		if(err) {console.log(err)};
		res.json(model);
	});
});

module.exports = router;