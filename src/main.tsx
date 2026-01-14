import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createProductsModule } from "./modules/Products";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const { Provider: ProductsProvider } = createProductsModule();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, 
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
        <ProductsProvider>
          <App />
        </ProductsProvider>
    </QueryClientProvider>
  </StrictMode>
);
