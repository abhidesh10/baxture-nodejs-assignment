// test/user.test.ts
import request from "supertest";
import appModule from "../src/app";

const app = appModule.app;
const server = appModule.server;

beforeAll(async () => {
  // Wait for the server to start before running tests
  await new Promise<void>((resolve) => {
    server.on("listening", resolve);
  });
});

afterAll((done) => {
  // Close the server after all tests are done
  server.close(done);
});

describe("User API Tests", () => {
  // Test Case 1: Get all records with a GET api/users request (an empty array is expected)
  it("should get all users and return an empty array", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
