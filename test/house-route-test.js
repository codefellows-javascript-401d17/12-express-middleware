'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const House = require('../model/house.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleHouse = {
  name: 'hodor',
  seat: 'hodor',
  region: 'hodor',
  words: 'hodor'
};

describe('House Routes', function() {

  describe('GET: /api/house', function() {
    describe('with a valid id', function() {
      before(done => {
        House.createHouse(exampleHouse)
        .then(house => {
          this.tempHouse = house;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        House.deleteHouse(this.tempHouse.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a house', done => {
        request.get(`${url}/api/house/${this.tempHouse.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHouse.id);
          expect(res.body.name).to.equal(this.tempHouse.name);
          expect(res.body.seat).to.equal(this.tempHouse.seat);
          expect(res.body.region).to.equal(this.tempHouse.region);
          expect(res.body.words).to.equal(this.tempHouse.words);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should return 404 status', done => {
          request.get(`${url}/api/house/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/house', function() {
    describe('with a valid body', function() {
      after(done => {
        if(this.tempHouse) {
          House.deleteHouse(this.tempHouse.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('should return a house', done => {
        request.post(`${url}/api/house`)
        .send(exampleHouse)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleHouse.name);
          expect(res.body.seat).to.equal(exampleHouse.seat);
          expect(res.body.region).to.equal(exampleHouse.region);
          expect(res.body.words).to.equal(exampleHouse.words);
          this.tempHouse = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/house', function() {
    describe('with a valid id and body', function() {
      before(done => {
        House.createHouse(exampleHouse)
        .then(house => {
          this.tempHouse = house;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if(this.tempHouse) {
          House.deleteHouse(this.tempHouse.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('should return a house', done => {
        let updateHouse = { name: 'Atreides', seat: 'Arrakeen', region: 'Arrakis', words: 'Fear is the Mind-killer'};
        request.put(`${url}/api/house?id=${this.tempHouse.id}`)
        .send(updateHouse)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHouse.id);
          for(var prop in updateHouse) {
            expect(res.body[prop]).to.equal(updateHouse[prop]);
          }
          done();
        });
      });
    });
  });
});
