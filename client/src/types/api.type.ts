export type ApiPaths = {
  // auth: {
  //   profile: string;
  // };

  users: {
    register: string;
    profile: string;
    allUsers: string;
    byId: (id: string) => string;
  };

  products: {
    root: string;
    admin: string;
    latest: string;
    categories: string;
    byId: (id: string) => string;
    updateImages: (id: string) => string;
  };

  orders: {
    root: string;
    admin: string;
    byId: (id: string) => string;
  };

  coupons: {
    root: string;
    byId: (id: string) => string;
    applyDiscount: string;
  };

  dashboard: {
    stats: string;
    pie: string;
    bar: string;
    line: string;
  };

  payments: {
    root: string;
  };
};


export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

