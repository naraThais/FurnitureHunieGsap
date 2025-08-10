import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const movingImageRef = useRef(null);
  const bentoGridRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&crop=center",
  ];

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

      tl.to(maskRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.fromTo(
        movingImageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        0.4
      );

      tl.to(
        movingImageRef.current,
        {
          x: () => {
            const gridRect = bentoGridRef.current?.getBoundingClientRect();
            const imageRect = movingImageRef.current?.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (!gridRect || !imageRect || !containerRect) return 0;

            // Posição relativa do item 1 do grid
            const targetX =
              gridRect.left - containerRect.left - imageRect.left + 0;

            return targetX;
          },
          y: () => {
            const gridRect = bentoGridRef.current;
            const imageRect = movingImageRef.current;
            const containerRect = containerRef.current;

            if (!gridRect || !imageRect || !containerRect) return 0;

            // Posição relativa do item 1 do grid
            const targetY =
              gridRect.top - containerRect.top - imageRect.top + 0;

            return targetY;
          },
          scale: 0.85,
          borderRadius: "1rem",
          duration: 1.2,
          ease: "power2.inOut",
        },
        1.2
      );

      tl.fromTo(
        ".grid-item",
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
          className="absolute w-96 h-96 opacity-0 z-20 rounded-2xl shadow-2xl"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        />

        {/* Grid Bento maior e centralizado */}
        <div
          ref={bentoGridRef}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 grid grid-cols-4 grid-rows-3 gap-6 w-full max-w-6xl max-h-[80vh]"
          style={{ height: "auto" }}
        >
          <div className="grid-item col-span-2 row-span-2 rounded-2xl overflow-hidden opacity-0 shadow-2xl">
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

      {/* Espaço para scroll */}
      <div className="h-screen" />
    </>
  );
};

export default ProductGrid;
