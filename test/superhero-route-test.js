'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Superhero = require('../model/superhero.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleSuperhero = {
  name: 'example name',
  comicUni: 'example comicUni'
};

describe('Superhero Routes', function() {
  describe('GET: /api/superhero', function() {
    describe('with a valid id', function() {
      before( done => {
        Superhero.createSuperhero(exampleSuperhero)
        .then(superhero => {
          this.tempSuperhero = superhero;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Superhero.deleteSuperhero(this.tempSuperhero.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a note', done => {
        request.get(`${url}/api/superhero/${this.tempSuperhero.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSuperhero.id);
          expect(res.body.name).to.equal(this.tempSuperhero.name);
          expect(res.body.comicUni).to.equal(this.tempSuperhero.comicUni);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/superhero/12345`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/superhero', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempSuperhero) {
          Superhero.deleteSuperhero(this.tempSuperhero.id)
        .then( () => done())
        .catch( err => done(err));
        }
      });

      it('should return a superhero', done => {
        request.post(`${url}/api/superhero`)
        .send(exampleSuperhero)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleSuperhero.name);
          expect(res.body.comicUni).to.equal(exampleSuperhero.comicUni);
          this.tempSuperhero = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/superhero', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Superhero.createSuperhero(exampleSuperhero)
        .then( superhero => {
          this.tempSuperhero = superhero;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempSuperhero) {
          Superhero.deleteSuperhero(this.tempSuperhero.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a superhero', done => {
        let updateSuperhero = {name: 'new name', comicUni: 'new comicUni'};
        request.put(`${url}/api/superhero?id=${this.tempSuperhero.id}`)
        .send(updateSuperhero)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSuperhero.id);
          for (var prop in updateSuperhero) {
            expect(res.body[prop]).to.equal(updateSuperhero[prop]);
          }
          done();
        });
      });
    });
  });
});
