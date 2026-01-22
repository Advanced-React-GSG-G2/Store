export const Header = () => {
  return (
    <header className="w-full  bg-[#527fbe]">
      <div className="mx-auto w-full max-w-7xl flex h-24 items-center justify-between px-4">
        <h1 className="text-5xl font-extrabold text-white font-serif">Store</h1>

        <nav className="flex items-center gap-6 text-sm text-gray-300">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Product
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};
