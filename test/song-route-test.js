'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Song = require('../model/song.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleSong = {
  name: 'example name',
  band: 'example band',
  year: 'example year'
};

describe('Song Routes', function() {

  describe('GET: /api/song', function() {
    describe('with valid id', function() {
      before(done => {
        Song.createSong(exampleSong)
        .then(song => {
          this.tempSong = song;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Song.deleteSong(this.tempSong.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a song', done => {
        request.get(`${url}/api/song/${this.tempSong.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSong.id);
          expect(res.body.name).to.equal(this.tempSong.name);
          expect(res.body.band).to.equal(this.tempSong.band);
          expect(res.body.year).to.equal(this.tempSong.year);
          done();
        });
      });
    });
  });

  describe('POST: /api/song', function() {
    describe('with valid body', function() {
      after( done => {
        if(this.tempSong) {
          Song.deleteSong(this.tempSong.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a song', done => {
        request.post(`${url}/api/song`)
        .send(exampleSong)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleSong.name);
          expect(res.body.band).to.equal(exampleSong.band);
          expect(res.body.year).to.equal(exampleSong.year);
          this.tempSong = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/song', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Song.createSong(exampleSong)
        .then( song => {
          this.tempSong = song;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempSong) {
          Song.deleteSong(this.tempSong.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a note', done => {
        let updateSong = { name: 'new name', band: 'new band', year: 'new year' };
        request.put(`${url}/api/song/${this.tempSong.id}`)
        .send(updateSong)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSong.id);
          for (var prop in updateSong) {
            expect(res.body[prop]).to.equal(updateSong[prop]);
          }
          done();
        });
      });
    });
  });
});
