import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WeUseWhatWeBuild = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animação do título principal
      gsap.fromTo(
        ".main-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".main-container",
            start: "top 80%",
          },
        }
      );

      // Animação de mudança de palavras no "Build"
      const words = ["Build.", "Create.", "Design.", "Craft.", "Make."];
      let currentIndex = 0;

      const changeWord = () => {
        gsap.to(".changing-word", {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % words.length;
            const el = document.querySelector(".changing-word");
            if (el) el.textContent = words[currentIndex];
            gsap.to(".changing-word", {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      };

      const wordInterval = setInterval(changeWord, 2500);

      // Animação dos cards de testemunho - fade + scale simples
      gsap.fromTo(
        ".testimonial-item",
        { opacity: 0, scale: 0.9, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax suave geral dos cards (movimenta todos em y leve)
      ScrollTrigger.create({
        trigger: ".testimonials-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const cards = document.querySelectorAll(".testimonial-item");
          cards.forEach((card, index) => {
            const speed = 0.1 + index * 0.05;
            const yPos = self.progress * speed * 40;
            gsap.set(card, { y: yPos });
          });
        },
      });

      // Animação fluida de scroll para Caroline e Emily (cards 3 e 4)
      const cardsToAnimate = document.querySelectorAll(".testimonial-item");

      cardsToAnimate.forEach((card) => {
        if (
          card.classList.contains("bottom-32") || // Caroline
          card.classList.contains("bottom-20") // Emily
        ) {
          gsap.to(card, {
            y: 50,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".testimonials-grid",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Hover nas imagens
      const images = document.querySelectorAll(".testimonial-image");
      images.forEach((img) => {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Animação das letras laterais
      gsap.fromTo(
        ".side-letters",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".main-container",
            start: "top 85%",
          },
        }
      );

      // Cleanup na desmontagem do componente
      return () => {
        clearInterval(wordInterval);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  const testimonials = [
    {
      id: 1,
      name: "JOHN SMITH",
      role: "Creative Director",
      text: "MindPlace has helped put my creative mind with my clients and perspectives so I can better understand their points of view.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      imageClass: "w-96 h-[28rem] rounded-[2.5rem]",
      containerClass: "absolute top-20 left-0",
    },
    {
      id: 2,
      name: "MATTHEW GARDNER",
      role: "Product Manager",
      text: "MindPlace helped me find the perfect mindful gift for my wife and undelete clarity into our part and removing friction for next year.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      imageClass: "w-80 h-80 rounded-full",
      containerClass: "absolute top-0 right-20",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden py-16 mt-10"
    >
      {/* Letras laterais */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-6">
        <div className="side-letters text-black text-lg font-bold">H</div>
        <div className="side-letters text-black text-lg font-bold">E</div>
        <div className="side-letters text-black text-lg font-bold">N</div>
        <div className="side-letters text-black text-lg font-bold">I</div>
        <div className="side-letters text-black text-lg font-bold">E</div>
      </div>

      {/* Letras laterais direita */}
      <div className="absolute right-8 top-1/3 space-y-4">
        <div className="side-letters text-black text-2xl">✦</div>
        <div className="side-letters text-black text-xl">❋</div>
        <div className="side-letters text-black text-lg">✧</div>
        <div className="side-letters text-black text-xl">✿</div>
      </div>

      <div className="main-container max-w-7xl mx-auto px-8">
        {/* Título principal */}
        <div className="main-title text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-wide">
            We Use What
            <br />
            <span className="changing-word text-black-500">Build.</span>
          </h1>
          <p className="mt-12 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            At the heart of our process is a deep-rooted belief in the quality
            and potential of MindPlace. Before anything reaches your hands, it
            undergoes rigorous internal testing. Our team uses MindPlace daily
            to refine every feature and every innovation, ensuring that each
            meets our high standards.
          </p>
        </div>

        {/* Grid de testemunhos */}
        <div className="testimonials-grid relative h-[100vh] max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`testimonial-item ${testimonial.containerClass}`}
            >
              {/* Imagem */}
              <div
                className={`${testimonial.imageClass} testimonial-image overflow-hidden shadow-2xl mb-8 relative`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                {(testimonial.id === 2 || testimonial.id === 3) && (
                  <div
                    className={`absolute inset-0 ${
                      testimonial.id === 2
                        ? "bg-black/60"
                        : "bg-gradient-to-r from-amber-500/70 to-black-500/70"
                    } flex items-center justify-center`}
                  >
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-2">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm opacity-90">
                        {testimonial.id === 2
                          ? "CEO & FOUNDER"
                          : "CREATIVE DIRECTOR"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações do testemunho */}
              <div className={`max-w-sm mb-20`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        1500000000000 + testimonial.id
                      }?w=100&h=100&fit=crop&crop=face`}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeUseWhatWeBuild;
