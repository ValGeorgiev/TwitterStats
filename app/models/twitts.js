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

module.exports = mongoose.model('Twitt', Twitt);