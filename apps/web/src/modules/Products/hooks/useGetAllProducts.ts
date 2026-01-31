import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import { useMemo } from "react";
import type { Product, ProductFilters } from "../entities/Product";
import { applyProductFilters } from "../utils/applyProductFilters";

const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = (filters?: ProductFilters) => {
  const { getAll } = useProducts();
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY],
    queryFn: getAll,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const allProducts = useMemo(() => data ?? [], [data]);
  const filteredProducts = useMemo(
    () => applyProductFilters(allProducts, filters),
    [allProducts, filters]
  );

  const isEmpty = filteredProducts.length === 0;

  return {
    filteredProducts,
    allProducts,
    error,
    isLoading,
    isEmpty,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
