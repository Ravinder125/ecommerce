type QueryParams = {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
  [key: string]: any;
};

export class FilterBuilder<T> {
  private query: any;
  private params: QueryParams;

  constructor(query: any, params: QueryParams) {
    this.query = query;
    this.params = params;
  }

  search(fields: string[]) {
    if (!this.params.search) return this;

    const regex = {
      $regex: this.params.search,
      $options: "i",
    };
    this.query = this.query.find({
      $or: fields.map((field) => ({ [field]: regex })),
    });

    return this;
  }

  filter() {
  const excluded = ["search", "page", "limit", "sort"];

  const filters: Record<string, any> = { ...this.params };

  excluded.forEach((f) => delete filters[f]);

  // ✅ REMOVE EMPTY VALUES
  Object.keys(filters).forEach((key) => {
    if (filters[key] === "" || filters[key] === undefined) {
      delete filters[key];
    }
  });

  this.query = this.query.find(filters);
  return this;
}

  sort() {
    if (!this.params.sort) {
      this.query = this.query.sort("-createdAt");
      return this;
    }

    const sortBy = this.params.sort.split(",").join(" ");
    this.query = this.query.sort(sortBy);

    return this;
  }

  paginate() {
    const page = Number(this.params.page) || 1;
    const limit = Number(this.params.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  build() {
    return this.query;
  }
}
