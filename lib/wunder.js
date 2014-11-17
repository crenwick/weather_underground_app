/*jshint node:true*/
'use strict';

var request = require('superagent');

module.exports = function() {
    return function(req, res, next) {
        var apikey = process.env.WUNDERAPI;
        var lat = req.params.lat; //or 37.7833
        var lon = req.params.lon; //or -122.4167
        var url = 'http://api.wunderground.com/api/' + apikey + '/conditions/q/' + lat + ',' + lon + '.json';
        console.log(url);
        var urlS = 'http://api.wunderground.com/api/' + apikey + '/conditions/q/WA/Seattle.json';

        var count2 = 0;
        var ready = function() {
            count2++;
            if (count2 === 2) next();
        };

        request.get(url)
        .end(function(err, data) {
            if (err) console.log(err);
            var parsedData = JSON.parse(data.text);
            if (parsedData.response.error) {
                console.log(parsedData.response.error);
                res.json(parsedData.response.error.description);
                return (parsedData.response.error);
            }

            console.log(parsedData.current_observation.display_location.full);
            req.loc = parsedData.current_observation.display_location.full;
            req.test = parsedData.current_observation.temp_f;
            req.temp = parsedData.current_observation.temp_f;
            req.precip = parseFloat(parsedData.current_observation.precip_today_in);
            ready();
        });

        request.get(urlS)
        .end(function(err, data) {
            if (err) console.log(err);
            var parsedData = JSON.parse(data.text);
            req.locS = parsedData.current_observation.display_location.full;
            req.tempS = parsedData.current_observation.temp_f;
            req.precipS = parseFloat(parsedData.current_observation.precip_today_in);
            ready();
        });
    };
};
