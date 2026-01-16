import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import {applyProductFilters} from "../utils/applyProductFilters"
const Get_ALL_PRODUCTS_QUERY_KEY = "products";
import {useMemo} from "react"

export const useGetAllProducts = (filters?: any) => {
  const { getAll } = useProducts();
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY],
    queryFn: getAll,
    staleTime: 1000 * 60,
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

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
