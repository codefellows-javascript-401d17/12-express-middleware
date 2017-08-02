'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beer = require('../model/beer.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleBeer = {
  name: 'example name',
  style: 'example style',
  ibu: 'example ibu'
};

describe('New Routes', function() {
  describe('with a valid id', function() {
    before( done => {
      Beer.createBeer(exampleBeer)
      .then(beer => {
        this.tempBeer = beer;
        console.log(this.tempBeer);
        done();
      })
      .catch (err => done(err));
    });
    after( done => {
      Beer.deleteBeer(this.tempBeer.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a beer', done => {
      request.get(`${url}/api/beer/${this.tempBeer.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempBeer.id);
        expect(res.body.name).to.equal(this.tempBeer.name);
        expect(res.body.style).to.equal(this.tempBeer.style);
        expect(res.body.ibu).to.equal(this.tempBeer.ibu);
        done();
      });
    });

    describe('with an invalid id', function() {
      it('should respond with 404 status code', done => {
        request.get(`${url}/api/beer/123456789`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});

describe('POST: /api/beer', function() {
  describe('with a valid body', function() {
    after( done => {
      if (this.tempBeer) {
        Beer.deleteBeer(this.tempBeer.id)
        .then( ()=> done())
        .catch( err => done(err));
      }
    });

    it('should return a beer', done => {
      request.post(`${url}/api/beer`)
      .send(exampleBeer)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(exampleBeer.name);
        expect(res.body.content).to.equal(exampleBeer.content);
        this.tempBeer = res.body;
        done();
      });
    });
  });
});

describe('PUT: /api/beer', function() {
  describe('with a valid id and body', function() {
    before( done => {
      Beer.createBeer(exampleBeer)
      .then( beer => {
        this.tempBeer = beer;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      if (this.tempBeer) {
        Beer.deleteBeer(this.tempBeer.id)
        .then( ()=> done())
        .catch(done);
      }
    });

    it('should return a beer', done => {
      let updateBeer = { name: 'new name', style: 'new style', ibu: 'new ibu' };
      request.put(`${url}/api/beer?id=${this.tempBeer.id}`)
      .send(updateBeer)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempBeer.id);
        for (var prop in updateBeer) {
          expect(res.body[prop]).to.equal(updateBeer[prop]);
        }
        done();
      });
    });
  });
});
