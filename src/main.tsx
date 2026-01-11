import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createProductsModule } from "./modules/Products";

const { Provider: ProductsProvider } = createProductsModule();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </StrictMode>
);
