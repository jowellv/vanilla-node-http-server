'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('vanilla node server', function() {
  it('should respond to a POST JSON greet request', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .send({ name: 'eunji'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('hello eunji');
        done();
      });
  });
  it('should respond to greet url params', function(done) {
    chai.request('localhost:3000')
      .get('/greet/bomi')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('hello bomi');
        done();
      });
  });
  before(function(done) {
    var d = new Date();
    done();
  });
  it('should give you the current time', function(done) {
    chai.request('localhost:3000')
      .post('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        var d = new Date();
        expect(res.body.currentTime).to.eql(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        done();
      });

  });
  it('should have a 404 page', function(done) {
    chai.request('localhost:3000')
      .get('/pagenothere')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });

});
