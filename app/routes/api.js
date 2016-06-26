var Twitt = require('../models/twitts');
var config = require('../../config');
var Twit = require('twit');

var T = new Twit(config.twit);


module.exports = function(app, express){
    var api = express.Router();

    var countryGenerator = ['England', 'Scotland', 'Wales', 'Ireland', 'Others'];

    // Return every institution
    api.get('/twitts', function(req, res){
        //  search twitter for all tweets containing the word 'banana' since July 11, 2011

        T.get('search/tweets', { q: 'brexit geocode:53.81982,-2.406348,500km', count: 1000 }, function(err, data, response) {
            var rand;
            for(var i = 0; i < data.statuses.length; i++){
                rand = Math.floor(Math.random() * 5);

                var twitt = new Twitt({
                    hashtags: data.statuses[i].hashtags,
                    location: countryGenerator[rand],
                    text: data.statuses[i].text
                });

                twitt.save(function(err){
                    if(err) {
                        res.send(err);
                    }

                });
            }
        })

    });

    return api;

};