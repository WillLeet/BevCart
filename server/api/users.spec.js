/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/users/', () => {

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(3);
      });
    });
  
    describe("/api/users/:userId", () => {
      it("GET /api/users/:userId", async () => {
        const user1 = await request(app).get("/api/users/1").expect(200);
        const user2 = await request(app).get("/api/users/2").expect(200);
  
        expect(user1.body).to.be.an("object");
        expect(user2.body).to.be.an("object");
  
        /* Because of promise.all we don't know who is who */
        try {
          expect(user1.body.username).to.equal("cody");
          expect(user2.body.username).to.equal("murphy");
  
          expect(user1.body.email).to.equal("cody@the.best");
          expect(user2.body.email).to.equal("murphy@the.best");
        } catch (error) {
          expect(user1.body.username).to.equal("murphy");
          expect(user2.body.username).to.equal("cody");
  
          expect(user2.body.email).to.equal("cody@the.best");
          expect(user1.body.email).to.equal("murphy@the.best");
        }
  
        /* checking uf it's hashing */
        expect(user1.body.password).to.not.equal("123");
        expect(user2.body.password).to.not.equal("123");
      });
    });
  
    // end describe('/api/users')
  }); // end describe('User routes')

