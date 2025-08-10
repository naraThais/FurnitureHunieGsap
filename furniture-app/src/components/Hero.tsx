import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";

// Registrar plugins
gsap.registerPlugin(SplitText);

const Hero: React.FC = () => {
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

  useGSAP(() => {
    // Animação do logo
    const logoSplit = new SplitText(".hero-logo", {
      type: "chars",
    });

    gsap.from(logoSplit.chars, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      delay: 0.5,
    });

    // Animação das categorias
    gsap.from(".category-item", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "expo.out",
      stagger: 0.15,
      delay: 1.5,
    });

    // Animação das imagens do grid
    gsap.from(".grid-image", {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      delay: 2,
    });
  }, []);

  return (
    <section className="hero-section relative w-full h-screen bg-black overflow-hidden">
      {/* Logo Central */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="hero-logo text-white text-8xl md:text-9xl font-light tracking-wider absolute top-40">
          HENIE
        </h1>
      </div>

      {/* Grid de Categorias e Imagens */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] z-10 px-8">
        <div className="grid grid-cols-4 gap-6 h-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-black bg-opacity-40 backdrop-blur-sm overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.title}
                className="grid-image w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="category-item absolute bottom-8 left-8">
                <h3 className="text-white text-base font-thin tracking-widest drop-shadow-lg">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background totalmente preto */}
      <div className="absolute inset-0 bg-black"></div>
    </section>
  );
};

export default Hero;
