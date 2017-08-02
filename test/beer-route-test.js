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
      .then(note => {
        this.tempBeer = note;
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
  });
});
