import request from "supertest";
import {
  clearTestDB,
  connectTestDB,
  disconnectTestDB,
} from "../../../tests/testUtils/setupTestDB.js";
import app from "../../../tests/testUtils/testApp.js";
import { User } from "../user.model.js";

describe("GET /users", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  test("should return users", async () => {
    // Arrange (insert test data)
    await User.create({
      name: "test",
      dob: new Date(),
      email: "test@gmail.com",
      firebaseUID: "507f1f77bcf86cd799439011",
      gender: "male",
      role: "user",
    });

    // Act
    const res = await request(app).get("/api/v1/users");
    console.log(res.body)
    // Assert
    // expect(res.body.data).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].email).toBe("test@gmail.com");
  });
});

describe("POST /users", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  test("should create user", async () => {
    const userData = {
      name: "test",
      dob: new Date(),
      email: "test@gmail.com",
      firebaseUID: "507f1f77bcf86cd799439011",
      gender: "male",
      role: "user",
    };

    const newUser = (await request(app).post("/api/v1/users/sync-profile").send(userData)) as any;

    expect(newUser.body).toBeDefined();
    expect(newUser.statusCode).toBe(201);
  });
});
