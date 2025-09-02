import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowButton from './GLowButton';

gsap.registerPlugin(ScrollTrigger);

const Transform = () => {
  const transformHeadingRefs = useRef([]);
  const transformParagraphRef = useRef(null);
  const transformImagesRefs = useRef([]);

  useEffect(() => {
    const setupScrollAnimations = () => {
      // Set initial hidden states
      gsap.set(transformHeadingRefs.current, { opacity: 0, y: -100, clipPath: "inset(100% 0 0 0)" });
      gsap.set(transformParagraphRef.current, { opacity: 0, y: 100, scale: 0.9, clipPath: "inset(0% 0 100% 0)" });
      gsap.set(transformImagesRefs.current, { opacity: 0, scale: 0.8, y: -20 });

      // Transform headings with ground emergence effect
      transformHeadingRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0% 0)",
            duration: 0.5,
            ease: "power3.out",
                         scrollTrigger: {
               trigger: ref,
               start: "top 90%",
               end: "bottom 10%",
               toggleActions: "play none none reverse",
               scrub: 1.5, // Much smoother scrolling
             },
          });
        }
      });

      // Transform paragraph (fire on enter without scrub)
      gsap.to(transformParagraphRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        clipPath: "inset(0 0 0 0)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: transformParagraphRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

             // Transform images with stagger and floating animation
       transformImagesRefs.current.forEach((img, index) => {
         if (img) {
           // Initial appearance
           gsap.to(img, {
             opacity: 1,
             scale: 1,
             y: 0,
             duration: 0.8,
             delay: index * 0.2,
             ease: "back.out(1.7)",
             scrollTrigger: {
               trigger: img,
               start: "top bottom",
               end: "bottom top",
               toggleActions: "play none none reverse",
               scrub: 1.5, // Much smoother scrolling
             },
           });

           // Continuous floating animation (independent of scroll)
           gsap.to(img, {
             y: "+=6",
             duration: 2.2,
             ease: "power1.inOut",
             yoyo: true,
             repeat: -1,
             delay: index * 0.3,
           });

           // Pop-out effect when scrolling up (going out of view)
           gsap.to(img, {
             scale: 0.3,
             opacity: 0,
             y: -30,
             duration: 0.8,
             ease: "power2.out",
             scrollTrigger: {
               trigger: img,
               start: "top bottom",
               end: "bottom top",
               toggleActions: "play none none reverse",
               scrub: 1.5,
             },
           });

           // Pop-in effect when scrolling down (coming into view)
           gsap.to(img, {
             scale: 1,
             opacity: 1,
             y: 0,
             duration: 0.8,
             ease: "power3.out",
             scrollTrigger: {
               trigger: img,
               start: "top bottom",
               end: "bottom top",
               toggleActions: "play none none reverse",
               scrub: 1.5,
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
    <div className="w-full">
      <div className="flex flex-col items-center bg-[#7bdbd4] text-gray-900 -mt-20 mb-10 overflow-hidden relative">
        {/* Enhanced radial background for transform section */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)",
            filter: "blur(40px)",
          }}
        ></div>
        
        <div className="leading-15text-center mt-10 mb-10 relative z-10 px-4">
          <h1
            ref={(el) => (transformHeadingRefs.current[0] = el)}
            className="text-[clamp(1.5rem,6vw,3.5rem)] tracking-tighter mt-6"
          >
            Transform your passion into profit
          </h1>
        </div>
        
        <p
          ref={transformParagraphRef}
          className="text-center mb-10 text-[clamp(1rem,2.2vw,1.3rem)] max-w-full md:max-w-[70%] lg:max-w-[55%] xl:max-w-[38%] font-light px-6"
        >
          Like so many of our creators, unlock the potential of your creativity with Rodexco support and guidance.
        </p>
        
        <div className="px-4">
          <GlowButton className='mb-10 text-base md:text-lg px-6 py-2 cursor-pointer' simple={true} onClick={() => navigate('/contact')}>Get in Touch</GlowButton>
        </div>
        
        {/* Images Section */}
        <div className="flex -space-x-4 md:-space-x-6 -mb-10 relative z-10">
          <img
            ref={(el) => (transformImagesRefs.current[0] = el)}
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="Creator 1"
            className="w-18 h-18 md:w-27 md:h-27 rounded-full object-cover shadow-lg relative z-0"
          />
          <img
            ref={(el) => (transformImagesRefs.current[1] = el)}
            src="https://randomuser.me/api/portraits/men/4.jpg"
            alt="Creator 2"
            className="w-20 h-20 md:w-30 md:h-30 rounded-full object-cover shadow-lg overflow-hidden relative z-20"
          />
          <img
            ref={(el) => (transformImagesRefs.current[2] = el)}
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="Creator 3"
            className="w-18 h-18 md:w-27 md:h-27 rounded-full object-cover shadow-lg relative z-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Transform;
