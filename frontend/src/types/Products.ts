export type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  description?: string;
  stock: 0 | 1;
  createdAt: string;
};
