import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

import image from "../assets/img1.jpg"; // Importa a imagem

// Registrar plugins
gsap.registerPlugin(SplitText);

const Hero: React.FC = () => {
  useGSAP(() => {
    // SplitText para o título
    const titleSplit = new SplitText(".hero-title", {
      type: "chars, words",
    });

    // SplitText para o parágrafo
    const paragraphSplit = new SplitText(".hero-subtitle", {
      type: "lines",
    });

    // Adiciona classe de gradiente se necessário
    titleSplit.chars.forEach((char) => char.classList.add("text-white"));

    // Animação do título - caracteres aparecem de baixo
    gsap.from(titleSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    // Animação do parágrafo - linhas aparecem com delay
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // Animação do botão
    gsap.from(".hero-button", {
      opacity: 0,
      x: -50,
      duration: 1.5,
      ease: "expo.out",
      delay: 1.5,
    });

    // Animação da imagem com parallax no scroll
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".hero-content", { y: -100, ease: "none" }, 0);
  }, []);

  return (
    <section className="hero-section flex items-center pt-20 justify-center">
      <div className="relative mx-auto w-[100%] h-[100vh]">
        <img
          className="object-cover w-full h-full hero-bg"
          src={image}
          alt="teste"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/90"></div>

        <div className="mb-4 absolute left-20 bottom-30 w-[50%]">
          <button className="hero-button uppercase bg-transparent border text-brown-200 px-6 py-6 h-16 w-1/2 rounded-full hover:bg-gray-100 hover:text-black transition-colors duration-300 ">
            Shop Now
          </button>
        </div>

        <div className="hero-content absolute right-20 bottom-30 text-right w-[50%]">
          <h1 className="hero-title text-3xl font-bold text-white overflow-hidden font-serif">
            Discover Your Perfect Furniture
          </h1>
          <p className="hero-subtitle text-2xl text-white mt-4 overflow-hidden">
            postion absolute quadro relativo e os outros div img img pega div
            inteira,seta tamanho na div, header fixed dois debaixo position
            absolute
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
