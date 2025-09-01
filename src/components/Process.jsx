import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const processHeadingRefs = useRef([]);

  useEffect(() => {
    const setupScrollAnimations = () => {
      // Set initial hidden states
      gsap.set(processHeadingRefs.current, { opacity: 0, y: 100, clipPath: "inset(0 0 100% 0)" });

      // Process headings with ground emergence effect
      processHeadingRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0% 0)",
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play none none reverse",
              scrub: 0.5, // Much smoother scrolling
            },
          });
        }
      });
    };

    const timer = setTimeout(setupScrollAnimations, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="lg:max-w-[65%] md:max-w-[90%] mx-auto relative ">
      {/* Dotted background for Process section */}
      <div className="
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0
        w-full h-[80%] max-w-none max-h-none
        lg:w-[80%] lg:max-w-[600px] lg:h-[100%] lg:max-h-[800px] md:w-[80%] md:max-w-[600px] md:h-[90%] md:max-h-[500px] sm:w-[80%] sm:max-w-[600px] sm:h-[90%] sm:max-h-[500px]
        bg-[radial-gradient(circle,_rgba(255,255,255,0.75)2px,_transparent_1px)]
        bg-[size:40px_40px] rounded-xl pointer-events-none opacity-40
      "></div>

      <div className="flex flex-col items-center min-h-[15vh] md:min-h-[50vh] justify-center text-[clamp(3.5rem,9vw,7.5rem)] md:text-[clamp(3.5rem,9vw,7.5rem)] font-bold max-w-[90%] mx-auto font-secondary relative z-10 ">
        <h1
          ref={(el) => (processHeadingRefs.current[0] = el)}
          className="self-start mt-4 mb-1 md:mt-0 md:mb-0"
        >
          OUR
        </h1>
        <h1
          ref={(el) => (processHeadingRefs.current[1] = el)}
          className="self-end md:mt-0"
        >
          PROCESS
        </h1>
      </div>
    </div>
  );
};

export default Process;
