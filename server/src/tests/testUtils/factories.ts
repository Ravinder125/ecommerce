export const createProductData = (overrides = {}) => {
  return {
    name: "Test User",
    email: "test@gmail.com",
    password: "test",
    role: "user",
    ...overrides,
  };
};
