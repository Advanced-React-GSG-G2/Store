import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { createProductsModule } from "./modules/Products";

const { Provider: ProductsProvider } = createProductsModule();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60_000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </QueryClientProvider>
  </StrictMode>
);
