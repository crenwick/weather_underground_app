/*jshint node: true*/
'use strict';

var express = require('express');
//var request = require('superagent');
var app = express();
var wunder = require('./lib/wunder.js');

app.get('/api/:lat/:lon', wunder(), function(req, res) {
  var compare;
  if (req.precip > req.precipSeattle) {
    compare = 1; //raining more there, not seattle
  } else if (req.precip < req.precipSeattle) {
    compare = 2; //raining more in seattle, not there
  } else if (req.precip !== 0 && req.precipSeattle !== 0) {
    compare = 3; //raining in both
  } else {
    compare = 0; //raining nowhere
  }
  console.log(compare);
  res.json(
    {You: {loc: req.loc, temp: req.temp, precip: req.precip},
     Seattle: {temp: req.tempSeattle, precip: req.precipSeattle},
     compare: compare});
});

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on', app.get('port'));
});
