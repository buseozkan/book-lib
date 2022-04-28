const { expect } = require("chai");
const request = require("supertest");
const router = require("~root/app");
const safeDescribe = require("~test/utils/safeDescribe");
const selectReaderById = require("./queries/selectReaderById");
const updateReaderById = require("./queries/updateReaderById");

safeDescribe("#PATCH reader by readerId", () => {
  const readerId = 1;

  after(async () => {
    await updateReaderById({
      readerId,
      name: "James Luce",
      genre: "Romantic"
    });
  });

  it("updates artist name by id", async () => {
    const response = await request(router)
      .patch(`/reader/${readerId}`)
      .send({
        name: "Charlotte"
      });
    expect(response.status).to.equal(201);
    const result = await selectReaderById({ readerId });
    expect(result).to.eql([{ readerId: 1, name: "Charlotte", genre: "Novel" }]);
  });

  it("updates reader genre by id", async () => {
    const response = await request(router)
      .patch(`/reader/${readerId}`)
      .send({
        genre: "Novel"
      });
    expect(response.status).to.equal(201);
    const result = await selectReaderById({ readerId });
    expect(result).to.eql([{ readerId: 1, name: "Charlotte", genre: "Novel" }]);
  });
});
