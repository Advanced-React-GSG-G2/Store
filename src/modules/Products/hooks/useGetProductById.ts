import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

const GET_PRODUCT_BY_ID_QUERY_KEY = "product";

export const useGetProductById = (id: string) => {
  const { getById } = useProducts();

  return useQuery<Product>({
    queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id],
    queryFn: () => getById(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
};

useGetProductById.queryKey = GET_PRODUCT_BY_ID_QUERY_KEY;
