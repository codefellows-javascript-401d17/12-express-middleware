'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Pokemon = require('../model/pokemon.js');
const url = 'http://localhost:8000';

require('../server.js');

const examplePokemon = {
  name: 'example name',
  content: 'example content'
};

describe('Pokemon Routes', function() {

  describe('GET: /api/pokemon', function() {
    describe('with a valid id', function() {
      before( done => {
        Pokemon.createPokemon(examplePokemon)
        .then(pokemon => {
          this.tempPokemon = pokemon;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Pokemon.deletePokemon(this.tempPokemon.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a pokemon', done => {
        request.get(`${url}/api/pokemon/${this.tempPokemon.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPokemon.id);
          expect(res.body.name).to.equal(this.tempPokemon.name);
          expect(res.body.content).to.equal(this.tempPokemon.content);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/pokemon/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/pokemon', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempPokemon) {
          Pokemon.deletePokemon(this.tempPokemon.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a pokemon', done => {
        request.post(`${url}/api/pokemon`)
        .send(examplePokemon)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplePokemon.name);
          expect(res.body.content).to.equal(examplePokemon.content);
          this.tempPokemon = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/pokemon', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Pokemon.createPokemon(examplePokemon)
        .then( pokemon => {
          this.tempPokemon = pokemon;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempPokemon) {
          Pokemon.deletePokemon(this.tempPokemon.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a pokemon', done => {
        let updatePokemon = { name: 'new name', content: 'new content' };
        request.put(`${url}/api/pokemon?id=${this.tempPokemon.id}`)
        .send(updatePokemon)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPokemon.id);
          for (var prop in updatePokemon) {
            expect(res.body[prop]).to.equal(updatePokemon[prop])
          }
          done();
        });
      });
    });
  });
});