import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Products } from "./modules/Products/views";

function App() {
  return (
    <>
      <Header />
      <div className="mx-10">
        <Products />
      </div>
      <Footer />
    </>
  );
}

export default App;
