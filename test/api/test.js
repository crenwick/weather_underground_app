'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

require('../../server.js');

describe('get two requests from the wunderapi', function() {

  it('should successfully POST lat/long to the server and receive a JSON response', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/47.6/-100')
    .end(function(err, res) {
      console.log(res.body);
      expect(err).to.be.null;
      expect(res.body).to.include.keys(['You', 'Seattle', 'compare']);
      done();
    });
  });

});