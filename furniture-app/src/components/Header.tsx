import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ajuste o valor 80 para a altura que você quer como "fim da hero"
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black text-white shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo/Brand */}
          <div className=" hero-logo text-xl font-bold pl-4">❋ HENIE ❋</div>

          {/* Navigation Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <a href="#home" className="hover:opacity-70">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:opacity-70">
                  About
                </a>
              </li>
              <li>
                <a href="#products" className="hover:opacity-70">
                  Products
                </a>
              </li>
            </ul>
          </nav>

          {/* Cart/Actions */}
        </div>
      </div>
    </header>
  );
};

export default Header;
