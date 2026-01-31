import { toProduct } from "../adapters/toProduct";
import type { ProductsRepository } from "./ProductsRepository";
import type { Product } from "../entities/Product";
import type { ProductDto } from "../dto/Product";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(`${BASE_URL}?limit=100`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data.products.map(toProduct);
    },
    getById: async (id: string): Promise<Product> => {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const dto: ProductDto = await response.json();
      return toProduct(dto);
    },
  };
};
