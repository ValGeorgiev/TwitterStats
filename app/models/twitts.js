var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Twitt = new Schema({
	hashtags : {
		type: Array
	},
	location: {
		type: String
	},
	text: {
		type: String
	}

},{
	collection: 'Twitt'
});

Twitt.statics.findAll = function(cb) {
	return this.find({}, cb);
};

Twitt.statics.reducer = function(cb) {
	var o = {};
	o.map = function () { 
		var val = {'location': this.location, 'text': this.text};
		var regEx = /(stupid|fuck|mistake|referendum|immigrants|war|crisis|crazy|mad)/;

		if(regEx.test(this.text)) {
			emit(this.location+'Critical', val);
		}
		else {
			emit(this.location+'NotCritical', val);	
		}
	};

	o.reduce = function(k, vals) {
		return vals.length;
	};

	this.mapReduce(o, cb);
};

module.exports = mongoose.model('Twitt', Twitt);