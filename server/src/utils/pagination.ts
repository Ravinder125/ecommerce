type PaginationProps = {
  limit?: string;
  page?: string;
};

export const pagination = (
  query?: PaginationProps,
): {
  limit: string;
  page: string;
  skip: string;
} => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit || 10);
  const skip = (page - 1) * limit;

  return {
    page: page.toString(),
    limit:limit.toString(),
    skip:skip.toString(),
  };
};
