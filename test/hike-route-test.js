'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Hike = require('../model/hike.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleHike = {
  name: 'party hike',
  location: 'party town'
};

describe('hike routes', function() {
  describe('GET: /api/hike', function(){
    describe('with a valid id', function(){
      before( done => {
        Hike.createHike(exampleHike)
        .then( hike => {
          this.tempHike = hike;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        Hike.deleteHike(this.tempHike.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a hike', done => {
        request.get(`${url}/api/hike/${this.tempHike.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHike.id);
          expect(res.body.name).to.equal(this.tempHike.name);
          expect(res.body.location).to.equal(this.tempHike.location);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('shoulr respond witha 404', done => {
          request.get(`${url}/api/hike/1234565678`)
          .end((err, res)=> {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/hike', function(){
    describe('with a valid body', function(){
      after(done => {
        if(this.tempHike) {
          Hike.deleteHike(this.tempHike.id)
          .then( () => done())
          .catch( err=> done(err));
        }
      });

      it('should return a hike', done =>{
        request.post(`${url}/api/hike`)
        .send(exampleHike)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleHike.name);
          expect(res.body.location).to.equal(exampleHike.location);
          this.tempHike = res.body;
          done();
        });
      });
    });
  });

  describe('PUT /api/hike', function(){
    describe('with a valid id and body', function(){
      before( done => {
        Hike.createHike(exampleHike)
        .then( hike => {
          this.tempHike = hike;
          done();
        })
        .catch (err => done(err));
      });

      after(done => {
        if (this.tempHike) {
          Hike.deleteHike(this.tempHike.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a hike', done =>{
        let updateHike = {name: 'party hike', location: 'party town'};
        request.put(`${url}/api/hike?id=${this.tempHike.id}`)
        .send(updateHike)
        .end((err, res)=> {
          if (err)return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHike.id);
          for (var prop in updateHike){
            expect(res.body[prop]).to.equal(updateHike[prop])
          }
          done();
        });
      });
    });
  });
});
