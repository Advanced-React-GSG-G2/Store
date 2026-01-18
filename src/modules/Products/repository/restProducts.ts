import { toProduct } from "../adapters/toProduct";
import type { ProductsRepository } from "./ProductsRepository";
import type { Product } from "../entities/Product";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository & { getProductById: (id: string) => Promise<Product | null> } => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(`${BASE_URL}?limit=100`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data.products.map(toProduct);
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return;
    },

    getProductById: async (id: string): Promise<Product | null> => {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return toProduct(data);
    },
  };
};
