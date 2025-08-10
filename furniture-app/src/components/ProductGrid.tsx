import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import image from "../assets/arch.jpg";
import image2 from "../assets/producto.jpg";
import image3 from "../assets/furniture.jpg";
import image4 from "../assets/product.jpg";
import image5 from "../assets/interior.jpg";
import image6 from "../assets/chair.jpg";

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const movingImageRef = useRef(null);
  const bentoGridRef = useRef(null);
  const firstGridItemRef = useRef(null);

  const images = [image, image2, image3, image4, image5, image6];

  const heroImage = images[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "200% top",
          scrub: 1.2,
          pin: true,
        },
      });

      // Fade out da máscara
      tl.to(maskRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Aparição da imagem que se move
      tl.fromTo(
        movingImageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        0.4
      );

      // Movimento da imagem para a posição do primeiro item do grid
      tl.to(
        movingImageRef.current,
        {
          left: () => {
            const firstItemRect =
              firstGridItemRef.current?.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (!firstItemRect || !containerRect) return "50%";

            return `${firstItemRect.left - containerRect.left}px`;
          },
          top: () => {
            const firstItemRect =
              firstGridItemRef.current?.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (!firstItemRect || !containerRect) return "50%";

            return `${firstItemRect.top - containerRect.top}px`;
          },
          width: () => {
            const firstItemRect =
              firstGridItemRef.current?.getBoundingClientRect();
            return firstItemRect ? `${firstItemRect.width}px` : "384px";
          },
          height: () => {
            const firstItemRect =
              firstGridItemRef.current?.getBoundingClientRect();
            return firstItemRect ? `${firstItemRect.height}px` : "384px";
          },
          transform: "translate(0, 0)",
          borderRadius: "1rem",
          duration: 1.2,
          ease: "power2.inOut",
        },
        1.2
      );

      // Aparecer os outros itens do grid (exceto o primeiro)
      tl.fromTo(
        ".grid-item:not(.first-item)",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        1.8
      );

      // Fazer a imagem que se move desaparecer e o primeiro item do grid aparecer
      tl.to(
        movingImageRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      );

      tl.fromTo(
        ".first-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Máscara "HENIE" */}
        <div
          ref={maskRef}
          className="absolute inset-0 flex items-center justify-center z-10 bg-black"
        >
          <h2
            className="font-black leading-none tracking-wider select-none"
            style={{
              fontSize: "clamp(8rem, 25vw, 25rem)",
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 30px rgba(255,255,255,0.1)",
              userSelect: "none",
            }}
          >
            HENIE
          </h2>
        </div>

        {/* Imagem que se move */}
        <div
          ref={movingImageRef}
          className="absolute w-96 h-96 opacity-0 z-30 rounded-2xl shadow-2xl"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity, width, height",
          }}
        />

        {/* Grid Bento maior e centralizado */}
        <div
          ref={bentoGridRef}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 grid grid-cols-4 grid-rows-3 gap-6 w-full max-w-6xl max-h-[80vh] z-20"
          style={{ height: "auto" }}
        >
          <div
            id="products"
            ref={firstGridItemRef}
            className="grid-item first-item col-span-2 row-span-2 rounded-2xl overflow-hidden opacity-0 shadow-2xl"
          >
            <img
              src={images[0]}
              alt="Produto Principal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid-item rounded-2xl overflow-hidden opacity-0 shadow-xl">
            <img
              src={images[1]}
              alt="Produto 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid-item row-span-2 rounded-2xl overflow-hidden opacity-0 shadow-xl">
            <img
              src={images[2]}
              alt="Produto 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid-item rounded-2xl overflow-hidden opacity-0 shadow-xl">
            <img
              src={images[3]}
              alt="Produto 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid-item col-span-2 rounded-2xl overflow-hidden opacity-0 shadow-xl">
            <img
              src={images[4]}
              alt="Produto 5"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid-item rounded-2xl overflow-hidden opacity-0 shadow-xl">
            <img
              src={images[5]}
              alt="Produto 6"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
