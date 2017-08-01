const expect = require('chai').expect;
const request = require('superagent');
const Shoe = require('../model/shoe.js');

require('../server.js');

const url = 'http://localhost:8000';
const sampleShoe = {
  brand: 'adidas',
  color: 'green'
};

describe('Shoe Routes', function () {

  describe('/GET /api/shoe', function () {
    describe('given a valid id', function () {
      before((done) => {
        Shoe.createShoe(sampleShoe)
          .then((shoe) => {
            this.tempShoe = shoe;
            done();
          })
          .catch((err) => done(err));
      });
      after((done) => {
        Shoe.deleteShoe(this.tempShoe.id)
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      it('should return a shoe', (done) => {
        request.get(`${url}/api/shoe/${this.tempShoe.id}`)
          .end((err, rsp) => {
            expect(rsp.status).to.equal(200);
            done();
          });
      });
    });
    describe('given an invalid id', function () {
      it('should return a 404 status code', (done) => {
        request.get(`${url}/api/shoe/ERT$EF$ERT$YT`)
          .end((err, rsp) => {
            expect(rsp.status).to.equal(404);
            done();
          })
      })
    })
  });
  describe('POST: /api/shoe', function () {
    describe('when given a valid body', function () {
      after(done => {
        if (this.tempShoe) {
          Shoe.deleteShoe(this.tempShoe.id)
            .then(() => done())
            .catch(err => done(err));
        }
      });
      it('should return a shoe', (done) => {
        request.post(`${url}/api/shoe`)
          .send(sampleShoe)
          .end((err, rsp) => {
            if (err) return done(err);
            expect(rsp.status).to.equal(200);
            this.tempShoe = rsp.body;
            done();
          })

      })
    })
  })
  describe('PUT /api/shoe', function () {
    describe('when provide a valid id and body', function () {
      before((done) => {
        Shoe.createShoe(sampleShoe)
          .then((shoe) => {
            this.tempShoe = shoe;
            done();
          })
          .catch((err) => {
            done();
          })
      })
      it('should return a new shoe', (done) => {
        let updateShoe = { brand: 'new brand', color: 'new color' };

        request.put(`${url}/api/shoe?id=${this.tempShoe.id}`)
          .send(updateShoe)
          .end((err, rsp) => {
            if (err) return done(err);
            expect(rsp.status).to.equal(200);
            for (var prop in updateShoe) {
              expect(rsp.body[prop]).to.equal(updateShoe[prop])
            }
            done();
          })
      })
    })
  })
});
