import request from "supertest";
import {
  clearTestDB,
  connectTestDB,
  disconnectTestDB,
} from "../../../tests/testUtils/setupTestDB.js";
import app from "../../../tests/testUtils/testApp.js";
import { Product } from "../product.model.js";

jest.mock("../../../utils/cacheService.js", () => ({
  cache: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  },
}));

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

const productData = {
  name: "MSI PRO B760Mghj-A WiFi ProSeries Motherboard (Supports 14th/13th/12th Gen Intel Processors, LGA 1700, DDR5, PCIe 4.0, M.2, 2.5Gbps LAN, USB 3.2 Gen2, mATX",
  description: `Supports 12th/13th Gen Intel Core, Pentium Gold and Celeron processors for LGA 1700 socket
Enhanced Power Design: 12+1 Duet Rail Power System with P-PAK, 8-pin + 4-pin CPU power connectors, Core Boost, Memory Boost
Premium Thermal Solution: Extended Heatsink, MOSFET thermal pads rated for 7W/mK and additional choke thermal pads are built for high performance system and non-stop gaming experience
High Quality PCB: 6-layer PCB made by 2oz thickened copper and server grade level material`,
  price: 16100,
  category: "Motherboard",
//   image: "male",
  brand: "MSI",
  owner: "68246566c29a8b6401f53178"
}

describe("GET /products", () => {

  test("should return products", async () => {
    // Arrange (insert test data)
    const endpoint = "/api/v1/products/";
    const product = await Product.create(productData);

    // Act
    const res = await request(app).get(endpoint);

    // Assert
    expect(res.body.data).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.products[0]._id.toString()).toBe(product._id.toString())
    expect(Array.isArray(res.body.data.products)).toBe(true);
    expect(res.body.data.products.length).toBeGreaterThan(0);
  });
});

// describe("POST /users", () => {
//   beforeAll(async () => {
//     await connectTestDB();
//   });

//   afterEach(async () => {
//     await clearTestDB();
//   });

//   test("should create user", async () => {
//     const userData = {
//       name: "test",
//       dob: new Date(),
//       email: "test@gmail.com",
//       firebaseUID: "507f1f77bcf86cd799439011",
//       gender: "male",
//       role: "user",
//     };

//     const newUser = (await request(app).post("/api/v1/users/sync-profile").send(userData)) as any;

//     expect(newUser.body).toBeDefined();
//     expect(newUser.statusCode).toBe(201);
//   });
// });
