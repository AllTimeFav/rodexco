import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PartnersWords = () => {
  const partnersRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    // Set initial hidden states
    gsap.set([partnersRef.current, wordsRef.current], { 
      opacity: 0, 
      y: 100, 
      clipPath: "inset(100% 0 0 0)" 
    });

    // Create timeline for staggered appearance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: partnersRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        scrub: 1.5,
      }
    });

    // Animate "PARTNERS" first
    tl.to(partnersRef.current, {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0% 0)",
      duration: 1.2,
      ease: "power3.out",
    }, 0);

    // Animate "WORDS" with slight delay and offset
    tl.to(wordsRef.current, {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0% 0)",
      duration: 1.2,
      ease: "power3.out",
    }, 0.3);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full py-32 relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced background with subtle rays */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(116, 206, 200, 0.2) 0%, rgba(116, 206, 200, 0.1) 40%, rgba(116, 206, 200, 0.05) 70%, transparent 100%)",
          filter: "blur(80px)",
        }}
      ></div>
      
      {/* Main content container with width constraints */}
      <div className="lg:max-w-[60%] md:max-w-[90%] mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col justify-center relative">
          
          {/* PARTNERS text - positioned left and slightly above */}
          <h1
            ref={partnersRef}
            className="text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white leading-none tracking-tight mb-8 lg:mb-0 lg:mr-8"
            
          >
            PARTNERS
          </h1>

          {/* WORDS text - positioned right and slightly below */}
          <h1
            ref={wordsRef}
            className="text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black self-end text-white leading-none tracking-tight lg:ml-8"
            
          >
            WORDS
          </h1>

        </div>
      </div>
    </div>
  );
};

export default PartnersWords;
