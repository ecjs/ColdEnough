var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);
var c = require('../index');

var currentPort = process.env.PORT || 5000;

describe('Testing API', function() {
  it('Able to get a zip with lat long', function(done) {
    chai.request('http://localhost:' + currentPort)
    .post('/zip')
    .send({lat: '47.6235857', long: '-122.335915'})
    .end(function(err, res) {
      expect(res.body.city).to.eql('Seattle');
      expect(res).to.have.status(200);
      done();
    });
  });
  it('Able to get a temp', function(done) {
    chai.request('http://localhost:' + currentPort)
    .post('/temperature')
    .send({city: 'Seattle', state: 'WA'})
    .end(function(err, res) {
      expect(res.body).to.have.property('temp');
      expect(res).to.have.status(200);
      done();
    });
  });
});
