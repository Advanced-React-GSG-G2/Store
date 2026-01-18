import type { Product } from "../entities/Product";

export interface ProductsRepository {
  getAll: () => Promise<Product[]>;
  delete: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
}
