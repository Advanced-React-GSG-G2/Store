import { toProduct } from "../adapters/toProduct";
import type { ProductsRepository } from "./ProductsRepository";
import type { Product } from "../entities/Product";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data.products.map(toProduct);
    },
  };
};
