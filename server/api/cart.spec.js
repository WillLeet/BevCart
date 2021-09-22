
const { expect } = require("chai");
const {
  db,
  models: { ProductInCart },
} = require("../db");
const seed = require("../../script/seed-test");
const app = require("../app");
const request = require("supertest")(app);

describe("Cart routes", () => {
  beforeEach(async () => {
    await seed();
  });
  describe("/api/cart/", () => {
    it("GET /api/cart", async () => {
      const res = await request.get("/api/cart/1").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(3);
    });
  });
  
  describe("/api/cart/:userId/:productId", () => {
    fetchCart = async () => {
        let res = await request.get("/api/cart/1").expect(200);
        return res;
    };
    it("POST /api/cart/ on new item", async () => {
        const newQuantity = {
            quantity: 3
          };
        const res1 = await request
          .post("/api/cart/1/3")
          .send(newQuantity)
          .expect(200)
          .expect("Content-Type", /json/)
          .expect(function (res) {
            expect(res.body.quantity).to.equal(3);
            expect(res.body.userId).to.equal(1);
            expect(res.body.productId).to.equal(3);
          });
        const resp = await request.get("/api/cart/1").expect(200);
        expect(resp.body.length).to.equal(4);
      });
      it("POST /api/cart/ on pre-existing item", async () => {
        const newQuantity = {
            quantity: 2
          };
        const res2 = await request
          .post("/api/cart/1/2")
          .send(newQuantity)
          .expect(200)
          .expect("Content-Type", /json/)
          .expect(function (res) {
            expect(res.body.quantity).to.equal(3);
            expect(res.body.userId).to.equal(1);
            expect(res.body.productId).to.equal(2);
          });
        const resp = await request.get("/api/cart/1").expect(200);
        expect(resp.body.length).to.equal(3);
      });
    it("PUT /api/cart/", async () => {
      const newQuantity = {
            quantity: 10
      };
      const cart = await fetchCart();
      const res = await request
        .put("/api/cart/1/2")
        .send(newQuantity);
      expect(res.status).to.equal(200);
      expect(res.body.quantity).to.equal(10);
    });
    it("DELETE /api/cart/", async () => {
      const res = await request.delete("/api/cart/1/2").timeout(200);
      expect(res.status).to.equal(500);
    });
  });
  
});

