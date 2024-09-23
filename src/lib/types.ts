export type product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  Restocked: Date | null;
  stock: number;
  totalSale: number;
  isArchived: boolean;
  categoryId: string;
  ownerId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  category: {
    id: string;
    name: string;
    description: string;
  };
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    imageUrl: string;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
};

export type store = {
  id: string;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
};

export type purchase = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  quantity: number;
  amount: number;
  updatedAt: Date;
  storeId: string;
  product: Omit<product, "category" | "owner">;
};

export type sale = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  quantity: number;
  amount: number;
  storeId: string;
  updatedAt: Date;
  product: Omit<product, "category" | "owner">;
};

