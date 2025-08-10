import React, { useState, useEffect, useRef } from "react";
import "./styles/global.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Features from "./components/Features";
import ProductGrid from "./components/ProductGrid";

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
      {!hideHeader && <Header />}
      <Hero />
      <Features />
      <div ref={productGridRef}>
        <ProductGrid />
      </div>
      <div className="w-900px"></div>
    </>
  );
}

export default App;
