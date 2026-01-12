import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product, ProductFilters } from "../entities/Product";
import { applyProductFilters } from "../utils/applyProductFilters";

export const useGetAllProducts = (filters?: ProductFilters) => {
  const { getAll } = useProducts();
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAll,
  });

  const allProducts = data ?? [];
  const products = useMemo(
    () => applyProductFilters(allProducts, filters),
    [allProducts, filters],
  );

  return {
    products,
    allProducts,
    error,
    isLoading,
  };
};
