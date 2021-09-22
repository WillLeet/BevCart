const { expect } = require("chai");
const {
  db,
  models: { Product },
} = require("../db");
const seed = require("../../script/seed-test");
const app = require("../app");
const request = require("supertest")(app);

describe("Product routes", () => {
  beforeEach(async () => {
    await seed();
  });
  describe("/api/products/", () => {
    it("GET /api/products", async () => {
      const res = await request.get("/api/products").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(4);
    });
    it("POST /api/products", async () => {
      const product = {
        name: "Lucy",
        price: 1.23,
      };

      const res = await request
        .post("/api/products")
        .send(product)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.name).to.equal("Lucy");
          expect(res.body.price).to.equal(1.23);
        });
      const resp = await request.get("/api/products").expect(200);
      expect(resp.body.length).to.equal(5);
    });
  });
  describe("/api/products/:productId", () => {
    fetchProducts = async () => {
      const product1 = await request.get("/api/products/1").expect(200);
      const product2 = await request.get("/api/products/2").expect(200);
      const product3 = await request.get("/api/products/3").expect(200);
      const product4 = await request.get("/api/products/4").expect(200);

      /* Because of promise.all we don't know who is who */
      let products = [
        product1.body,
        product2.body,
        product3.body,
        product4.body,
      ].sort((product1, product2) => {
        if (product1.name < product2.name) {
          return -1;
        }
        if (product1.name > product2.name) {
          return 1;
        }
        return 0;
      });
      products = products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          description: product.description,
        };
      });
      return [product1, product2, product3, product4, products];
    };
    it("GET /api/products/:productId", async () => {
      [product1, product2, product3, product4, products] =
        await fetchProducts();

      expect(product1.body).to.be.an("object");
      expect(product2.body).to.be.an("object");
      expect(product3.body).to.be.an("object");
      expect(product4.body).to.be.an("object");

      expect(products).to.deep.equal([
        {
          name: "Actual Dinosaur Tears",
          price: 420.69,
          description: "Don't ask where I got this from I won't tell you.",
        },
        {
          name: "Blue stuff under my sink",
          price: 0.01,
          description:
            "Wait you aren't seriously considering buying this are you",
        },
        {
          name: "Dr Pepper",
          price: 1.05,
          description: "The elixir of life",
        },
        {
          name: "Mango Smoothie",
          price: 5.99,
          description:
            "A sweet treat for you and your pet amphibian. Best served cold!",
        },
      ]);
    });
    it("PUT /api/products/:productId", async () => {
      const [product1] = await fetchProducts();

      const res = await request
        .put("/api/products/1")
        .send({ name: "water", price: 0.5, description: "Key of life" });
      expect(res.status).to.equal(200);

      expect(res.body).not.to.deep.equal(product1);
      expect(res.body.name).to.equal("water");
      expect(res.body.description).to.equal("Key of life");
      expect(res.body.price).to.equal(0.5);
    });
    it("DELETE /api/products/:productId", async () => {
      const res = await request.delete("/api/products/1").timeout(200);
      expect(res.status).to.equal(203);
    });
  });
});
