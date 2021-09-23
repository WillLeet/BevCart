
const { expect } = require("chai");
const {
  db,
  models: { Review },
} = require("../db");
const seed = require("../../script/seed-test");
const app = require("../app");
const request = require("supertest")(app);

describe("Review routes", () => {
  beforeEach(async () => {
    await seed();
  });
  describe("/api/reviews/", () => {
    it("GET /api/reviews", async () => {
      const res = await request.get("/api/reviews/3").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(2);
    });
  });
  
  describe("/api/reviews/:productId/:userId", () => {
    fetchReviews = async () => {
        let res = await request.get("/api/reviews/3").expect(200);
        return res;
    };
    it("POST /api/reviews/", async () => {
        const review = {
          rating: 5.0,
          content: "I have a crippling addiction now :)",
        };
        const res = await request
          .post("/api/reviews/3/2")
          .send(review)
          .expect(200)
          .expect("Content-Type", /json/)
          .expect(function (res) {
            expect(res.body.rating).to.equal(5.0);
            expect(res.body.content).to.equal("I have a crippling addiction now :)");
            expect(res.body.userId).to.equal(2);
            expect(res.body.productId).to.equal(3);
          });
        const resp = await request.get("/api/reviews/3").expect(200);
        expect(resp.body.length).to.equal(3);
      });
    it("PUT /api/reviews/", async () => {
      const reviews = await fetchReviews();
      const res = await request
        .put("/api/reviews/3/2")
        .send({ rating: 1.0, content: "I have finally turned my life around. I shall never look back." });
      expect(res.status).to.equal(200);
      expect(res.body.rating).to.equal(1.0);
      expect(res.body.content).to.equal("I have finally turned my life around. I shall never look back.");
    });
    it("DELETE /api/reviews/", async () => {
      const res = await request.delete("/api/reviews/3/2").timeout(200);
      expect(res.status).to.equal(203);
    });
  });
  
});

