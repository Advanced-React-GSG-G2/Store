import { createRootRoute, createRoute, Navigate } from "@tanstack/react-router";
import { Products } from "./modules/Products/views";
import { ProductDetails } from "./modules/Products/views/components/ProductDetails";
import { Header } from "./components/Header";

const rootRoute = createRootRoute({
  component: Header,
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
