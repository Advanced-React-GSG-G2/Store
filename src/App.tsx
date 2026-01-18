import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Products } from "./modules/Products/views";
import { ProductDetails } from "./modules/Products/views/ProductDetails";

function App() {
  return (
    <Router>
      <Header />
      <div className="mx-10">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
