import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { createProductsModule } from "./modules/Products";

const { Provider: ProductsProvider } = createProductsModule();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>
);
