'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Baked Good Routes', function() {
  var bake = null;

  describe('GET: /test', function() {
    it('should return msg', done => {
      request.get('localhost:8000/test')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('POST: 400/Bad Request', function() {
    it('should return 400', done => {
      request.post('localhost:8000/api/bake')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST: /api/bake', function() {
    it('should make a baked good', function(done) {
      request.post('localhost:8000/api/bake')
      .send({
        bakedGood: 'muffin',
        description: 'naked cupcake',
        calories: 255
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.bakedGood).to.equal('muffin');
        expect(res.body.description).to.equal('naked cupcake');
        expect(res.body.calories).to.equal(255);

        bake = res.body;
        done();
      });
    });
  });

  describe('GET: /api/bake', function() {
    it('should return a baked good', function(done) {
      request.get(`localhost:8000/api/bake?id=${bake.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.bakedGood).to.equal('muffin');
        expect(res.body.description).to.equal('naked cupcake');
        expect(res.body.calories).to.equal(255);
        done();
      });
    });
  });

  describe('GET: 404/Unregistered Route', () => {
    it('should return a 404', done => {
      request.get('localhost:8000/api/baykk')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: 400/No ID', () => {
    it('should return a 400', done => {
      request.get('localhost:8000/api/bake')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('DELETE: /api/bake', function() {
    it('should delete a baked good', done => {
      request.delete(`localhost:8000/api/bake?id=${bake.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body.bakedGood).to.equal(undefined);
        done();
      });
    });
  });
});