import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardStack3D from './Card';

gsap.registerPlugin(ScrollTrigger);

const ClearPath = () => {
  const clearPathRefs = useRef([]);
  const clearPathImagesRefs = useRef([]);
  const clearPathParagraphRef = useRef(null);
  const cardSectionRef = useRef(null);

  useEffect(() => {
    const setupScrollAnimations = () => {
      // Set initial hidden states
      gsap.set(clearPathRefs.current, { opacity: 0, y: 100, clipPath: "inset(0 0 100% 0)" });
      gsap.set(clearPathImagesRefs.current, { opacity: 0, scale: 0, y: 0 });
      gsap.set(clearPathParagraphRef.current, { opacity: 0, y: 60, scale: 0.9 });

      // A CLEAR PATH headings with ground emergence effect
      clearPathRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0% 0)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            },
          });
        }
      });

      // A CLEAR PATH paragraph
      gsap.to(clearPathParagraphRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: clearPathParagraphRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: 1.5, // Much smoother scrolling
        },
      });
      // Images: pop-in on enter + scroll-based floating
      clearPathImagesRefs.current.forEach((img, index) => {
        if (!img) return;

        // Pop-in effect when coming into view
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse",
            scrub: 1.2,
          },
        });

        // // Scroll-scrubbed floating movement
        // gsap.to(img, {
        //   y: index % 2 === 0 ? "+=14" : "-=14",
        //   ease: "power2.out",
        //   scrollTrigger: {
        //     trigger: img,
        //     start: "top bottom",
        //     end: "bottom top",
        //     scrub: 1.2,
        //   },
        // });

        // // Subtle pop-out as it exits upwards
        // gsap.to(img, {
        //   scale: 0.92,
        //   opacity: 0.85,
        //   duration: 0.6,
        //   ease: "power2.out",
        //   scrollTrigger: {
        //     trigger: img,
        //     start: "top 60%",
        //     end: "top 30%",
        //     toggleActions: "play none none reverse",
        //     scrub: 1.2,
        //   },
        // });
      });
    };

    const timer = setTimeout(setupScrollAnimations, 10);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center justify-center lg:mt-20 min-h-[40vh]">
        {/* Large text */}
        <div className="absolute inset-0 md:mx-auto md:max-w-[60%] max-w-full flex flex-col items-center justify-center pointer-events-none select-none" style={{ zIndex: 3 }}>
          <div
            ref={(el) => (clearPathRefs.current[0] = el)}
            className="text-white font-bold text-[16vw] sm:text-[12vw] lg:text-[5vw] leading-none tracking-wider self-start sm:m lg:ml-20"
          >
            A
          </div>
          <div
            ref={(el) => (clearPathRefs.current[1] = el)}
            className="text-white font-bold text-[16vw] sm:text-[12vw] lg:text-[5vw] leading-none tracking-wider self-stretch lg:ml-30  ml-10"
          >
            CLEAR
          </div>
          <div
            ref={(el) => (clearPathRefs.current[2] = el)}
            className="text-white font-bold text-[16vw] sm:text-[12vw] lg:text-[5vw] leading-none tracking-wider lg:ml-60 sm:ml-40 self-end"
          >
            PATH
          </div>
        </div>

        {/* Avatars positioned around the text */}
        <img
          ref={(el) => (clearPathImagesRefs.current[0] = el)}
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="avatar"
          className="absolute top-12 left-1/2 sm:-translate-x-[6rem] -translate-x-[3rem] sm:-translate-y-[2rem] translate-y-[1rem] sm:w-18 sm:h-18 w-12 h-12 rounded-full shadow-lg"
          style={{ zIndex: 4 }}
        />
        <img
          ref={(el) => (clearPathImagesRefs.current[1] = el)}
          src="https://randomuser.me/api/portraits/men/2.jpg"
          alt="avatar"
          className="absolute sm:bottom-25 bottom-30 lg:left-[30%] left-[26%] sm:w-20 sm:h-20 w-15 h-15 translate-y-[2rem] rounded-full shadow-lg"
          style={{ zIndex: 4 }}
        />
        <img
          ref={(el) => (clearPathImagesRefs.current[2] = el)}
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="avatar"
          className="absolute top-1/2 right-[20%] sm:-translate-y-1/2 -translate-y-15 sm:w-16 sm:h-16 w-10 h-10 rounded-full shadow-lg"
          style={{ zIndex: 4 }}
        />

        {/* Enhanced radial backgrounds for each image */}
        {/* Top image radial background */}
        <div
          className="absolute top-12 left-1/2 sm:-translate-x-[6rem] -translate-x-[3rem] sm:-translate-y-[2rem] translate-y-[1rem] sm:w-18 sm:h-18 w-12 h-12 rounded-full opacity-25"
          style={{
            zIndex: 3,
            background: "radial-gradient(circle, rgba(116, 206, 200, 0.5) 0%, rgba(116, 206, 200, 0.2) 40%, rgba(116, 206, 200, 0.1) 70%, transparent 100%)",
            filter: "blur(12px)",
          }}
        ></div>

        {/* Bottom left image radial background */}
        <div
          className="absolute sm:bottom-25 bottom-30 lg:left-[30%] left-[26%] translate-y-[2rem] sm:w-20 sm:h-20 w-15 h-15 rounded-full opacity-30"
          style={{
            zIndex: 3,
            background: "radial-gradient(circle, rgba(116, 206, 200, 0.6) 0%, rgba(116, 206, 200, 0.3) 35%, rgba(116, 206, 200, 0.1) 65%, transparent 100%)",
            filter: "blur(15px)",
          }}
        ></div>

        {/* Right image radial background */}
        <div
          className="absolute top-1/2 right-[20%] sm:-translate-y-1/2 -translate-y-15 sm:w-16 sm:h-16 w-10 h-10 rounded-full opacity-20"
          style={{
            zIndex: 3,
            background: "radial-gradient(circle, rgba(116, 206, 200, 0.4) 0%, rgba(116, 206, 200, 0.2) 45%, rgba(116, 206, 200, 0.05) 75%, transparent 100%)",
            filter: "blur(10px)",
          }}
        ></div>
      </div>

      <div className="w-full flex justify-center mt-10">
        <p
          ref={clearPathParagraphRef}
          className="text-slate-200 text-center text-[clamp(1.5rem,6vw,4rem)]"
        >
          Rodexco empowers creators to navigate, innovate, and lead in the creator economy.
        </p>
      </div>

      <div className="mt-20 relative" ref={cardSectionRef}>
        {/* Dotted background for Card section */}
        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0
          w-full h-[60%] max-w-none max-h-none
          lg:w-[70%] lg:max-w-[500px] lg:h-[70%] lg:max-h-[400px] md:w-[70%] md:max-w-[500px] md:h-[70%] md:max-h-[400px] sm:w-[70%] sm:max-w-[500px] sm:h-[70%] sm:max-h-[400px]
          bg-[radial-gradient(circle,_rgba(255,255,255,0.12)2px,_transparent_1px)]
          bg-[size:35px_35px] rounded-xl pointer-events-none opacity-30
        "></div>

        <div className="relative z-10">
          <CardStack3D />
        </div>
      </div>
    </div>
  );
};

export default ClearPath;
