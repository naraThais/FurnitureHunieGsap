import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Simulando as importações das suas imagens
const image1 =
  "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=800&h=600&fit=crop";
const image2 =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop";
const image3 =
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop";
const image4 =
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop";

// Registrar plugins
gsap.registerPlugin();

const Hero = () => {
  const tickerRef = useRef(null);
  const logoRef = useRef(null);

  // Dados das categorias
  const categories = [
    {
      title: "ARCHITECTURE",
      image: image1,
    },
    {
      title: "INTERIOR",
      image: image2,
    },
    {
      title: "FURNITURE",
      image: image3,
    },
    {
      title: "PRODUCTS",
      image: image4,
    },
  ];

  // Duplicar para loop infinito
  const duplicatedCategories = [...categories, ...categories, ...categories];

  useGSAP(() => {
    // Animação do logo com split text simulado
    const logoChars = logoRef.current.querySelectorAll(".char");

    gsap.from(logoChars, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      delay: 0.5,
    });

    // Animação dos items do ticker
    gsap.from(".ticker-item", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.15,
      delay: 1.5,
    });

    // Ticker infinito com GSAP
    const tickerItems = tickerRef.current.querySelector(".ticker-track");
    const tickerWidth = tickerItems.scrollWidth / 3; // Dividido por 3 porque temos 3 sets

    gsap.set(tickerItems, { x: 0 });

    const tickerTl = gsap.timeline({ repeat: -1 });
    tickerTl.to(tickerItems, {
      x: -tickerWidth,
      duration: 25,
      ease: "none",
    });

    // Pausar no hover
    tickerRef.current.addEventListener("mouseenter", () => {
      tickerTl.pause();
    });

    tickerRef.current.addEventListener("mouseleave", () => {
      tickerTl.play();
    });
  }, []);

  // Função para dividir texto em caracteres
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative w-full h-screen bg-black overflow-hidden">
        {/* Logo Central */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1
            ref={logoRef}
            className="hero-logo text-white text-8xl md:text-9xl font-light tracking-wider absolute top-40"
          >
            {splitText("HENIE")}
          </h1>
        </div>

        {/* Ticker no lugar do Grid */}
        <div
          ref={tickerRef}
          className="absolute bottom-0 left-0 right-0 h-[350px] z-10 overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>

          <div className="ticker-container h-full flex items-end pb-4">
            <div className="ticker-track flex">
              {duplicatedCategories.map((category, index) => (
                <div
                  key={`${category.title}-${index}`}
                  className="ticker-item flex-shrink-0 mx-6 relative group cursor-pointer"
                >
                  {/* Imagem */}
                  <div className="relative w-80 h-[320px] bg-gray-900 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Título */}
                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-white text-base font-thin tracking-widest drop-shadow-lg">
                        {category.title}
                      </h3>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background totalmente preto */}
        <div className="absolute inset-0 bg-black"></div>
      </section>
    </div>
  );
};

export default Hero;
