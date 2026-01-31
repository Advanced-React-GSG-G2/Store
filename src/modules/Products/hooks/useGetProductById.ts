import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";
import { useGetAllProducts } from "./useGetAllProducts";

const GET_PRODUCT_BY_ID_QUERY_KEY = "product";

export const useGetProductById = (id: string) => {
  const { getById } = useProducts();
  const queryClient = useQueryClient();

  return useQuery<Product>({
    queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id],
    queryFn: () => getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const allProducts = queryClient.getQueryData<Product[]>([
        useGetAllProducts.queryKey,
      ]);
      return allProducts?.find((product) => product.id === id);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState([useGetAllProducts.queryKey])?.dataUpdatedAt,
  });
};

useGetProductById.queryKey = GET_PRODUCT_BY_ID_QUERY_KEY;
