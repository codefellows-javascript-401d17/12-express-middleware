'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Car = require('../model/car.js');
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

require('../server.js');

const exampleData = {
  name: 'example name',
  brand:'example brand'
};

describe('Car Routes', function () {

  describe('GET: /api/car', function () {
    describe('with a valid id', function () {
      before( done => {
        Car.createCar(exampleData)
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
            expect(res.body.brand).to.equal(this.tempCar.brand);
            done();
          });
      });

      describe('with an invalid id', function () {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/car/rhtetjkrky`)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              done();
            });
        });
      });
    });
  });

  describe('POST: /api/car', function () {
    describe('with a valid body', function () {
      after(done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then(() => done())
            .catch(err => done(err));
        }
      });

      it('should return a car', done => {
        request.post(`${url}/api/car`)
          .send(exampleData)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(exampleData.name);
            expect(res.body.brand).to.equal(exampleData.brand);
            this.tempCar = res.body;
            done();
          });
      });
    });
  });

  describe('PUT: /api/car', function () {
    describe('with a valid id and body', function () {
      before(done => {
        Car.createCar(exampleData)
        .then(car => {
          this.tempCar = car;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch(done);
        }
      });

      it('should return a car', done => {
        let updateCar = { name: 'new name', brand: 'new brand' };
        request.put(`${url}/api/car?id=${this.tempCar.id}`)
        .send(updateCar)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCar.id);
          for (var prop in updateCar) {
            expect(res.body[prop]).to.equal(updateCar[prop])
          }
          done();
        });
      });
    });
  });
});
