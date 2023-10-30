const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("Shop Management API", function () {
  describe("GET /products", function () {
    it("should return a list of products", function (done) {
      request(app)
        .get("/products")
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.length, 3);
          assert.equal(res.body[0].name, "Iphone 10");
          assert.equal(res.body[1].name, "Pizza");
          assert.equal(res.body[2].name, "Pizza");
          done();
        });
    });
  });

  describe("POST /products", function () {
    it("should create a new product", function (done) {
      request(app)
        .post("/products")
        .send({ name: "Pizza", price: 10, type: "food", amount: 10 })
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.name, "Pizza");
          assert.equal(res.body.price, 10);
          assert.equal(res.body.type, "food");
          assert.equal(res.body.amount, 10);
          done();
        });
    });
  });

  describe("PUT /products/:id", function () {
    it("should update an existing product", function (done) {
      request(app)
        .put("/products/3")
        .send({ name: "Burger", price: 20, type: "food", amount: 10 })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.name, "Burger");
          assert.equal(res.body.price, 20);
          assert.equal(res.body.type, "food");
          assert.equal(res.body.amount, 10);
          done();
        });
    });
  });

  describe("DELETE /products/:id", function () {
    it("should delete an existing product", function (done) {
      request(app)
        .delete("/products/2")
        .expect(204)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
