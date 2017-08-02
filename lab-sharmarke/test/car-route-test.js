'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Car = require('../model/car.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleCar = {
  make: 'toyota',
  model: 'camry',
  year: '2018'
};

describe('Car Routes', function() {
  var car = null;

  describe('POST: 400/Bad Request', function() {
    it('should return 400', done => {
      request.post(`${url}/api/car`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST: /api/car', function() {
    it('should make a car', function(done) {
      request.post(`${url}/api/car`)
      .send({
        make: 'toyota',
        model: 'camry',
        year: 2018
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('toyota');
        expect(res.body.model).to.equal('camry');
        expect(res.body.year).to.equal(2018);

        car = res.body;
        done();
      });
    });
  });

  describe('GET: /api/car', function() {
    describe('with a valid id', function() {
      before( done => {
        Car.createCar(exampleCar)
        .then( CreateError => {
          this.tempCar = car;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Car.deleteCar(this.tempCar.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a car', done => {
        request.get(`${url}/api/car/${this.tempCar.id}`)
        .end( (err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET: /api/car', function() {
    it('should return a car', function(done) {
      request.get(`${url}/api/car/i${car.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('toyota');
        expect(res.body.model).to.equal('camry');
        expect(res.body.year).to.equal(2018);
        done();
      });
    });
  });

  describe('GET: 404', () => {
    it('should return a 404', done => {
      request.get(`${url}/api/54321`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('DELETE: /api/car', function() {
    it('should delete a car', done => {
      request.delete(`${url}/api/car?id=${car.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body.make).to.equal(undefined);
        done();
      });
    });
  });
});
