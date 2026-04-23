import { userRepository } from "../user.repository.js";
import { userService } from "../user.service.js";

jest.mock("../user.repository.js");

// beforeAll   → runs once (setup)
// beforeEach  → runs before every test
// test        → your test
// afterEach   → cleanup after each test
// afterAll    → runs once at end

// beforeAll(async () => {
//   await connectTestDB();
// });

// afterEach(async () => {
//   await clearTestDB();
// });

// afterAll(async () => {
//   await disconnectTestDB();
// });

const mockRepo = userRepository as jest.Mocked<typeof userRepository>;

describe("User Service - Create User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create new user", async () => {
    const mockUser = {
      name: "Ravinder Kumar",
      role: "user",
      password: "password",
    };

    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.createUser.mockResolvedValue(mockUser as any);

    const result = await userService.registerUser(mockUser as any);

    expect(mockRepo.createUser).toHaveBeenCalled();

    expect(result.name).toBe("Ravinder Kumar");
  });

  test("should fail if user exists", async () => {
    const mockUser = {
      name: "Ravinder Kumar",
      role: "user",
      password: "password",
      email: "test@gmail.com",
    };

    mockRepo.findByEmail.mockResolvedValue(mockUser as any);

    await expect(userService.registerUser(mockUser as any)).rejects.toThrow(
      "User already exist",
    );
    expect(mockRepo.createUser).not.toHaveBeenCalled();
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(mockUser.email);
  });

  // test("should return validation error if email is invalid", async () => {
  //   const mockUser = {
  //     name: "Ravinder Kumar",
  //     role: "user",
  //     password: "password",
  //     email: "ravi",
  //   } as any;

  //   mockRepo.findByEmail.mockResolvedValue(null);

  //   await expect(userService.registerUser(mockUser)).rejects.toThrow(
  //     "Validation Error",
  //   );
  //   expect(mockRepo.findByEmail).toHaveBeenCalledWith(mockUser.email);
  //   expect(mockRepo.createUser).not.toHaveBeenCalled();
  // });
});
