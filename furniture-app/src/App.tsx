import { useState, useEffect, useRef } from "react";
import "./styles/global.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import WeUseWhatWeBuild from "./components/About";
import ProductGrid from "./components/ProductGrid";
import Cursor from "./components/ui/Curso";
function App() {
  const [hideHeader, setHideHeader] = useState(false);
  const productGridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o ProductGrid estiver visível, esconder o header
        setHideHeader(entry.isIntersecting);
      },
      { threshold: 0.1 } // Começa a esconder quando 10% do ProductGrid aparece
    );

    if (productGridRef.current) {
      observer.observe(productGridRef.current);
    }

    return () => {
      if (productGridRef.current) {
        observer.unobserve(productGridRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="frame">
        <Cursor />
        {!hideHeader && <Header />}
        <Hero />
        <WeUseWhatWeBuild />
        <div ref={productGridRef}>
          <ProductGrid />
        </div>
        <div className="w-900px"></div>
      </div>
    </>
  );
}

export default App;
