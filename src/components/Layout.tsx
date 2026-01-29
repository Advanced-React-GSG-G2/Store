import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <main className="mx-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
