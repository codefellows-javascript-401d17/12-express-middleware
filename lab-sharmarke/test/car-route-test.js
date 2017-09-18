'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Car = require('../model/car.js');
const url = 'http://localhost:8000';


require('../server.js');

const exampleCar = {
  name: 'example name',
  make: 'example make',
  model: 'example model'
};

describe('Car Routes', function() {

  describe('GET: /api/car', function() {
    describe('with valid id', function() {
      before(done => {
        Car.createCar(exampleCar)
        .then(car => {
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
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCar.id);
          expect(res.body.name).to.equal(this.tempCar.name);
          expect(res.body.make).to.equal(this.tempCar.make);
          expect(res.body.model).to.equal(this.tempCar.model);
          done();
        });
      });
    });
  });

  describe('POST: /api/car', function() {
    describe('with valid body', function() {
      after( done => {
        if(this.tempCar) {
          Car.deleteCar(this.tempCar.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a car', done => {
        request.post(`${url}/api/car`)
        .send(exampleCar)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleCar.name);
          expect(res.body.make).to.equal(exampleCar.make);
          expect(res.body.model).to.equal(exampleCar.model);
          this.tempCar = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/car', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Car.createCar(exampleCar)
        .then( car => {
          this.tempCar = car;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a note', done => {
        let updateCar = { name: 'example name', make: 'example make', model: 'example model' };
        request.put(`${url}/api/car/${this.tempCar.id}`)
        .send(updateCar)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCar.id);
          for (var prop in updateCar) {
            expect(res.body[prop]).to.equal(updateCar[prop]);
          }
          done();
        });
      });
    });
  });
});
