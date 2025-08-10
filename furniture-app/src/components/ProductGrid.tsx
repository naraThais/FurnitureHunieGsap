import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/img1.jpg"; // Imagem local

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = () => {
  const image = img1;

  useGSAP(() => {
    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#product-reveal",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
      },
    });

    revealTimeline
      .to(".text-mask", {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        ".reveal-image",
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.3
      );
  });

  return (
    <>
      <div
        id="product-reveal"
        className="relative h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Imagem de fundo */}
        <div
          className="reveal-image absolute inset-0 opacity-0 scale-110"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Texto como máscara */}
        <div className="text-mask absolute inset-0 flex items-center justify-center z-10">
          <h2
            className="font-black leading-none tracking-wider select-none"
            style={{
              fontSize: "25rem",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            HENIE
          </h2>
        </div>
      </div>

      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Próxima Seção
          </h3>
          <p className="text-xl text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>
      </section>

      <section className="h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Mais Conteúdo</h3>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
