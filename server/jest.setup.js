import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from "./src/tests/testUtils/setupTestDB.js";

beforeAll(async()=> {
    await connectTestDB();
})

afterEach(async()=> {
    await clearTestDB();
})

afterAll(async()=> {
    await disconnectTestDB()
})

export default {
    testEnvironment: "node",
    
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts"
    ]
}