'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const BandMember = require('../model/band-member.js');
const url = 'http://localhost:3000';
require('../server.js');

const testMember = ["Eddie", "DelRio", ...['guitar']];

describe('Band-Member routes', function(){

  describe('GET /api/band-member', function() {
    before( done => {
      BandMember.createMember(...testMember)
      .then(member => {
        this.tempObj = member;
        done();
      })
      .catch(err => done(err));
    });

    after(done => {
      BandMember.deleteMember(this.tempObj.id)
      .then(() => done())
      .catch(err => done(err));
    });

    it('Should return a band-member', (done) => {
      request.get(`${url}/api/band-member/${this.tempObj.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempObj.id);
        expect(res.body.first).to.equal(this.tempObj.first);
        expect(res.body.last).to.equal(this.tempObj.last);
        expect(res.body.istruments).to.deep.equal(this.tempObj.istruments)
        done();
      });
    });
  });
  describe('With an invalid id', function() {
    it('Should respond with 404 coed', (done) => {
      request.get(`${url}/api/band-member/1234`)
      .end((err) => {
        if (err) {
          expect(err.status).to.equal(404);
          done();
        }
      });
    });
  });

  describe('POST: /api/band-member', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempMember) {
          BandMember.deleteMember(this.tempMember.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('Should create a new member', done => {
        request.post(`${url}/api/band-member/Eddie/DelRio/Guitar/Bass/Drums`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.first).to.equal('Eddie');
          expect(res.body.last).to.equal('DelRio');
          expect(res.body.instruments).to.deep.equal(['Guitar', 'Bass', 'Drums']);
          this.tempMember = res.body;
          done();
        })
      })
    })

    describe('PUT api/band-member', function(){
      describe('With valid id and body', function() {
        before(done => {
          BandMember.createMember(...testMember)
          .then(member => {
            this.tempMember = member;
            done();
          })
          .catch(err => done(err));
        });

        after(done => {
          BandMember.deleteMember(this.tempMember.id)
          .then(() => done())
          .catch(err => done(err));
        })

        it('Should return a band-member', done => {
          request.put(`${url}/api/band-member/${this.tempMember.id}/Edwin/DelRio/Piano`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(this.tempMember.id);
            expect(res.body.first).to.not.equal(this.tempMember.first);
            expect(res.body.last).to.equal(this.tempMember.last);
            expect(res.body.instruments).to.not.deep.equal(this.tempMember.instruments);
            done()
          });
        });
      });
    });
  });
});

