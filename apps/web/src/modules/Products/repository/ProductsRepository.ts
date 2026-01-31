import type { Product } from "../entities/Product";

export interface ProductsRepository {
  getAll: () => Promise<Product[]>;
  getById: (id: string) => Promise<Product>;
}
