var app = require("../backend/server");

request = require("supertest");

// Testing CRUD API's
// positive testcases

describe("Getting data", () => {

  it("get operation for landing page", async () => {

    const res = await request(app).get("/api/tutorials").expect(200);

    expect(res.body[0].name).toEqual("nbdf");

  }, 50000);

});



describe("Updating data", () => {

  it("put operation for landing page", async () => {

    const res = await request(app)

      .put("/api/tutorials/6364b5273eaa56ac5b7aed7c")

      .send({

        name: "Nikhil",

      });

    expect(res.statusCode).toEqual(404);

    // console.log(res);

  }, 50000);

});



describe("Posting data", () => {

  it("post operation for landing page", async () => {

    const res = await request(app)

      .post("/api/tutorials")

      .send({

        name: "abc",
        riskCategory: "Low",

      });

    expect(res.statusCode).toEqual(200);

    // console.log(res);

  }, 50000);

});



describe('Deleting data', () => {

  it("delete operation for landing page", async () => {

    const res = await request(app)

    .delete('/api/tutorials/639a9fdc834ad5669c6e36d7') 

    expect(res.statusCode).toEqual(200);

    // console.log(res);

  }, 50000);

});



// negative testcase

describe('Deleting users', () => {

  it("checking data is deleted or not", async () => {

    const res = await request(app)

    .delete('/api/tutorials/63a2af8a100892d2440d73b0') 

    expect(res.statusCode).toEqual(404);

    console.log(res);

  }, 50000);

});






