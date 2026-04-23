import mongoose from "mongoose";

export const expectSuccessResponse = (res: any, status = 200) => {
  expect(res.statusCode).toBe(status);
  expect(res.body.success).toBe(true);
};

export const expectErrorResponse = (res: any, status = 400) => {
  expect(res.statusCode).toBe(status);
  expect(res.body.success).toBe(false);
};

export const expectValidationError = (res: any) => {
  expect(res.statusCode).toBe(400);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toBe("Validation Error");
};

export const expectPagination = (data: any) => {
  expect(data).toHaveProperty("products");
  expect(data).toHaveProperty("totalPages");
  expect(data).toHaveProperty("page");
};

export const getObjectId = () => new mongoose.Types.ObjectId().toString();

export const expectAsyncError = async (fn: Promise<any>) => {
  await expect(fn).rejects.toThrow();
};
