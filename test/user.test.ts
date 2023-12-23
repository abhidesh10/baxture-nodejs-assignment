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
  let userId: string;
  // Test Case 1: Get all records with a GET api/users request (an empty array is expected)
  it("should get all users and return an empty array", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test Case 2: A new object is created by a POST api/users request (a response containing newly created record is expected)
  it("should create a new user and return the created record", async () => {
    const newUser = { username: "Max", age: 22, hobbies: [] };
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    userId = response.body.id;
  });

  // Test Case 3: User object is expected by a GET api/users/${userId} request (a response should return user object)
  it("should specifice user by ID", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  // Test Case 4: User object is expected to update by a PUT api/users/${userId} request (a response should return updated user object)
  it("should update an existing user", async () => {
    const updatedUser = {
      username: "John",
      age: 20,
      hobbies: ["riding", "reading"],
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe(updatedUser.username);
    expect(response.body.age).toBe(updatedUser.age);
    expect(response.body.hobbies).toEqual(updatedUser.hobbies);
  });

  // Test Case 5: User object is expected to deleted by a DELETE api/users/${userId} request.
  it("should delete an existing user", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  // Test Case 6: User object is expected to not found by a GET api/users/${userId} request.
  it("should return 404 for a deleted user", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
  });
});
