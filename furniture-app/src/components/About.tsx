import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../assets/furniture.jpg";
import image2 from "../assets/producto.jpg";
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
      text: "MindPlace has helped put my creative mind with my clients and perspectives so I can better understand their points of view. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi iste nostrum, ipsum debitis aliquam harum deserunt recusandae sapiente reprehenderit iure doloremque repellendus a ab eum, assumenda dolores atque facilis.",
      image: image,
      imageClass: "w-96 h-[28rem] ",
      containerClass: "absolute top-20 left-20 ",
    },
    {
      id: 2,
      name: "MATTHEW GARDNER",
      role: "Product Manager",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi iste nostrum, ipsum debitis aliquam harum deserunt recusandae sapiente reprehenderit iure doloremque repellendus a ab eum, assumenda dolores atque facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi iste nostrum, ipsum debitis aliquam harum deserunt recusandae sapiente reprehenderit iure doloremque repellendus a ab eum, assumenda dolores atque facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi iste nostrum, ipsum debitis aliquam harum deserunt recusandae sapiente reprehenderit iure doloremque repellendus a ab eum, assumenda dolores atque facilis.",
      image: image2,
      imageClass: "w-96 h-80  ",
      containerClass: "absolute top-0  right-20",
    },
  ];

  return (
    <div
      id="about"
      ref={containerRef}
      className="min-h-screen relative overflow-hidden py-16 mt-10 bg-black"
    >
      {/* Letras laterais */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-6">
        <div className="hero-logo side-letters text-white text-lg font-bold">
          H
        </div>
        <div className="hero-logo side-letters text-white text-lg font-bold">
          E
        </div>
        <div className="hero-logo side-letters text-white text-lg font-bold">
          N
        </div>
        <div className="hero-logo side-letters text-white text-lg font-bold">
          I
        </div>
        <div className="hero-logo side-letters text-white text-lg font-bold">
          E
        </div>
      </div>

      {/* Letras laterais direita */}
      <div className="absolute right-8 top-1/3 space-y-4">
        <div className="hero-logo side-letters text-white text-2xl">✦</div>
        <div className="hero-logo side-letters text-white text-xl">❋</div>
        <div className="hero-logo side-letters text-white text-lg">✧</div>
        <div className="hero-logo side-letters text-white text-xl">✿</div>
      </div>

      <div className="main-container max-w-9xl mx-auto px-8">
        {/* Título principal */}
        <div className="main-title text-center mb-16 mt-40">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-wide">
            We Use What
            <br />
            <span className="changing-word text-shadow-blue-950">Build.</span>
          </h1>
          <p className="mt-12 text-white max-w-2xl mx-auto text-lg leading-relaxed">
            At the heart of our process is a deep-rooted belief in the quality
            and potential of MindPlace. Before anything reaches your hands, it
            undergoes rigorous internal testing. Our team uses MindPlace daily
            to refine every feature and every innovation, ensuring that each
            meets our high standards.
          </p>
        </div>

        {/* Grid de testemunhos */}
        <div className="testimonials-grid relative h-[100vh] max-w-7xl mx-auto mb-40">
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
                  <h3 className="font-bold text-base text-white">
                    {testimonial.name}
                  </h3>
                </div>
                <p className="text-white text-base leading-relaxed">
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
