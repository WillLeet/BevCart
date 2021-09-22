/* global describe beforeEach it */

const { expect } = require("chai");
const {
  db,
  models: { User },
} = require("../db");
const seed = require("../../script/seed-test");
const app = require("../app");
const request = require("supertest")(app);

describe("User routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/users/", () => {
    it("GET /api/users", async () => {
      const res = await request.get("/api/users").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(3);
    });
    it("POST /api/users", async () => {
      const user = {
        username: "Lucy",
        email: "lucy@the.best",
        password: "123",
      };

      const res = await request
        .post("/api/users")
        .send(user)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.username).to.equal("Lucy");
          expect(res.body.password).not.to.equal("123");
          expect(res.body.email).to.equal("lucy@the.best");
        });
    });
  });

  describe("/api/users/:userId", () => {
    fetchUsers = async () => {
      const user1 = await request.get("/api/users/1").expect(200);
      const user2 = await request.get("/api/users/2").expect(200);
      const user3 = await request.get("/api/users/3").expect(200);

      /* Because of promise.all we don't know who is who */
      const users = [user1.body, user2.body, user3.body].sort(
        (user1, user2) => {
          if (user1.username < user2.username) {
            return -1;
          }
          if (user1.username > user2.username) {
            return 1;
          }
          return 0;
        }
      );
      return [user1, user2, user3, users];
    };
    it("GET /api/users/:userId", async () => {
      [user1, user2, user3, users] = await fetchUsers();

      expect(user1.body).to.be.an("object");
      expect(user2.body).to.be.an("object");
      expect(user3.body).to.be.an("object");

      expect(users).to.deep.equal([
        {
          username: "cody",
          email: "cody.123@gmail.com",
          isAdmin: null,
        },
        {
          username: "emma",
          email: "outoffakeemails@oops.edu",
          isAdmin: null,
        },
        {
          username: "murphy",
          email: "IAMTHELAW@icloud.com",
          isAdmin: null,
        },
      ]);

      /* checking uf it's hashing */
      expect(user1.body.password).to.not.equal("123");
      expect(user2.body.password).to.not.equal("123");
      expect(user3.body.password).to.not.equal("123");
    });
    it("PUT /api/users/:userId", async () => {
      const [user1] = await fetchUsers();

      const res = await request
        .put("/api/users/1")
        .send({ username: "paul", email: "paul@new.user", password: "321" });
      expect(res.status).to.equal(200);

      expect(res.body).not.to.deep.equal(user1);
      expect(res.body.username).to.equal("paul");
      expect(res.body.email).to.equal("paul@new.user");
      expect(res.body.password).not.to.equal("321");
    });
    it("DELETE /api/users/:userId", async () => {
      const res = await request.delete("/api/users/1").timeout(200);
      expect(res.status).to.equal(500);
    });
  });
  // end describe('/api/users')
}); // end describe('User routes')
