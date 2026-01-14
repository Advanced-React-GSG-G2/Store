import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";

const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY],
    queryFn: getAll,
    staleTime: 1000 * 60,
  });

  return {
    products,
    isEmpty: error,
    isLoading,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;