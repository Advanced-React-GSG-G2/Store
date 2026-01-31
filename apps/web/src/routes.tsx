import { createRootRoute, createRoute, Navigate } from "@tanstack/react-router";
import { Products } from "./modules/Products/views";
import { Layout } from "./components/Layout";
import { ProductDetails } from "./modules/Products/views/components/ProductDetails";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => <Navigate to="/" />,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Products,
});
export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetails,
});

export const routeTree = rootRoute.addChildren([productsRoute, productRoute]);
