/*jshint node:true*/
'use strict';

var express = require('express');
//var request = require('superagent');
var app = express();
var wunder = require('./lib/wunder.js');

app
.get('/api/:lat/:lon', wunder(), function(req, res) {
    var compare = 0;
    if (req.precip > req.precipS) {
        //raining more there, not seattle
        compare = 1;
    }
    else if (req.precip < req.precipS) {
        //raining more in seattle, not there
        compare = 2;
    } else if (req.precip === 0 && req.precipS === 0) {
        //not raining in either
        compare = 3;
    } // 0 = raining in both?
    console.log(compare);
    res.json(
        {You: {loc: req.loc, temp: req.temp, precip: req.precip},
         Seattle: {temp: req.tempS, precip: req.precipS}, 
         compare: compare});
});

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('server running on', app.get('port'));
});
