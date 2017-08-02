'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Bake = require('../model/bake.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleBakedGood = {
  bakedGood: 'connoli',
  description: 'dessert',
  calories: '350'
};

describe('Baked Goods Routes', function() {
  describe('POST: 400/Bad Request', function() {
    it('should return 400', done => {
      request.post(`${url}/api/bake`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST: /api/bake', function() {
    let tempID;

    after( done => {
      Bake.deleteBakedGood(tempID)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should make a baked good', done => {
      request.post(`${url}/api/bake`)
      .send({
        bakedGood: 'muffin',
        description: 'naked cupcake',
        calories: 255
      })
      .end((err, res) => {
        if (err) return done(err);
        tempID = res.body.id;
        expect(res.status).to.equal(200);
        expect(res.body.bakedGood).to.equal('muffin');
        expect(res.body.description).to.equal('naked cupcake');
        expect(res.body.calories).to.equal(255);
        done();
      });
    });
  });

  describe('GET: /api/bake with a valid id', function() {
    before( done => {
      Bake.createBakedGood(exampleBakedGood)
      .then( bake => {
        this.tempBake = bake;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      Bake.deleteBakedGood(this.tempBake.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a baked good', done => {
      request.get(`${url}/api/bake/${this.tempBake.id}`)
      .end( (err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('GET: 404/Unregistered Route', () => {
    it('should return a 404', done => {
      request.get(`${url}/api/baykk`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: 404/Invalid Id', () => {
    it('should return a 404', done => {
      request.get(`${url}/api/bake/12345`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE: /api/bake', function() {
    before( done => {
      Bake.createBakedGood(exampleBakedGood)
      .then( bake => {
        this.tempBake = bake;
        done();
      })
      .catch( err => done(err));
    });

    it('should delete a baked good', done => {
      request.delete(`${url}/api/bake?id=${this.tempBake.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body.bakedGood).to.equal(undefined);
        done();
      });
    });
  });
});