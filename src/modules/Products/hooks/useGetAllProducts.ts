import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";

const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
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
