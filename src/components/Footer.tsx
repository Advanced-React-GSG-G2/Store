export const Footer = () => {
  return (
    <footer className="w-full border-t  bg-[#527fbe] py-8">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl font-extrabold text-white font-serif">
            Store
          </h1>

          <nav className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            <a
              href="#"
              className="hover:underline hover:decoration-white hover:decoration-2 transition-all duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:underline hover:decoration-white hover:decoration-2 transition-all duration-200"
            >
              Products
            </a>
            <a
              href="#"
              className="hover:underline hover:decoration-white hover:decoration-2 transition-all duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="hover:underline hover:decoration-white hover:decoration-2 transition-all duration-200"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
