import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import image from "../assets/img3.jpg";

const Features: React.FC = () => {
  useGSAP(() => {
    // Split e animação para títulos
    const titleSplit = new SplitText(".features-title", { type: "words" });
    gsap.from(titleSplit.words, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.08,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".features-title",
        start: "top 80%",
      },
    });

    // Split e animação para parágrafos
    const paragraphSplit = new SplitText(".features-paragraph", {
      type: "lines",
    });
    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".features-paragraph",
        start: "top 85%",
      },
    });

    // Cards subindo do baixo
    gsap.from(".feature-card", {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section className="relative bg-white px-80 py-32 mt-[100px] mb-[100px]">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 rotate-90 tracking-widest text-black font-bold text-sm">
        HENIE
      </div>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-serif mb-10 features-title">
          {" "}
          {/* aumentei de mb-6 para mb-10 */}
          We Use What
          <br />
          We Build.
        </h1>

        <p className=" features-paragraph max-w-3xl text-gray-600 mb-20 leading-relaxed">
          At the heart of our processes is a deep-seated belief in the quality
          and potential of HNIE. Before anything reaches your hands, it
          undergoes rigorous testing and scrutiny. We stand behind every
          feature, every security measure, and every innovation, ensuring that
          each meets our high standards.
        </p>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-20 relative w-full">
          <div className=" feature-card flex flex-col items-start text-left space-y-6">
            <div className="rounded-t-full overflow-hidden w-72 h-96">
              <img
                src={image}
                alt="block1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-gray-800">KIM HO</h3>
            <p className="text-sm text-gray-600">
              HNIE has helped put my relationship with my clients into
              perspective so I can better understand their point of view.
            </p>
          </div>
          {/* Bloco 2 */}
          <div className=" feature-card flex flex-col items-start text-left space-y-6">
            <div className="rounded-full overflow-hidden w-48 h-48">
              <img
                src={image}
                alt="block2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-gray-800">MATTHEW GARDNER</h3>
            <p className="text-sm text-gray-600">
              HNIE helped me find the perfect birthday gift for my wife while
              avoiding guilt on our part and removing friction for the next
              year.
            </p>
          </div>
          {/* Bloco 3 */}
          <div className=" feature-card flex flex-col items-start text-left space-y-6">
            <div className="rounded-[50px] overflow-hidden w-80 h-40">
              <img
                src={image}
                alt="block3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-gray-800">JAMES SPIEGEL</h3>
            <p className="text-sm text-gray-600">
              HNIE lets me show up every day at my best self, free from the
              limitations of my own memory and the hassle of app hopping.
            </p>
          </div>
          {/* Bloco 4 */}
          <div className="feature-card flex flex-col items-start text-left space-y-6">
            <div className="rounded-xl overflow-hidden w-48 h-64">
              <img
                src={image}
                alt="block4"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-gray-800">DEXTER THOMPSON</h3>
            <p className="text-sm text-gray-600">
              HNIE is my secret weapon for synthesizing ideas from my notes,
              generating topics, and reducing all friction between thought and
              action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
