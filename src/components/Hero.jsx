import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import GlowButton from './GLowButton';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const avatarsRef = useRef([]);
  const navigate = useNavigate();

  // Set initial hidden states immediately when component mounts
  useEffect(() => {
    // Hide all hero elements initially
    if (leftTextRef.current && rightTextRef.current && paragraphRef.current && buttonRef.current) {
      gsap.set([leftTextRef.current, rightTextRef.current, paragraphRef.current], {
        opacity: 0,
        y: 120,
        clipPath: "inset(0 0 100% 0)",
      });
      
      gsap.set(buttonRef.current, { opacity: 0, y: 40, scale: 0.8 });
      gsap.set(avatarsRef.current, { opacity: 0, scale: 0.5 });
    }
  }, []);

  useEffect(() => {
    const handleHeroReady = (event) => {
      if (event.detail.ready) {
        // Initial animation timeline
        const initialTl = gsap.timeline();
        
        // Set initial hidden state for hero elements - positioned below ground
        gsap.set([leftTextRef.current, rightTextRef.current, paragraphRef.current], {
          opacity: 0,
          y: 120,
          clipPath: "inset(0 0 100% 0)",
        });
        
        // Set initial hidden state for other elements
        gsap.set(buttonRef.current, { opacity: 0, y: 40, scale: 0.8 });
        gsap.set(avatarsRef.current, { opacity: 0, scale: 0.5 });

        // Initial page load animation
        initialTl.to(leftTextRef.current, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.2,
          ease: "power3.out"
        })
        .to(rightTextRef.current, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.8")
        .to(paragraphRef.current, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.6")
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(avatarsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.2");

        // Hero section scroll animations - only for initial reveal, not continuous
        const heroScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "top 20%",
            scrub: 2.5, // Much smoother, slower scrolling
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Pop-away effect when scrolling down
              if (progress > 0.1) {
                const yOffset = progress * 100;
                const clipOffset = progress * 100;
                
                if (leftTextRef.current) {
                  gsap.set(leftTextRef.current, { 
                    y: yOffset, 
                    clipPath: `inset(${clipOffset}% 0 0% 0)`, 
                    opacity: 1 - progress * 0.3 
                  });
                }
                
                if (rightTextRef.current) {
                  gsap.set(rightTextRef.current, { 
                    y: yOffset, 
                    clipPath: `inset(${clipOffset}% 0 0% 0)`, 
                    opacity: 1 - progress * 0.3 
                  });
                }
                
                if (paragraphRef.current) {
                  gsap.set(paragraphRef.current, { 
                    y: yOffset * 0.8, 
                    clipPath: `inset(${clipOffset * 0.8}% 0 0% 0)`, 
                    opacity: 1 - progress * 0.4 
                  });
                }
              }
            },
            onLeave: () => {
              // Pop-away effect when scrolling down
              if (leftTextRef.current) {
                gsap.set(leftTextRef.current, { y: 100, clipPath: "inset(0% 0 100% 0)", opacity: 0.9 });
              }
              if (rightTextRef.current) {
                gsap.set(rightTextRef.current, { y: 100, clipPath: "inset(0% 0 100% 0)", opacity: 0.7 });
              }
              if (paragraphRef.current) {
                gsap.set(paragraphRef.current, { y: 80, clipPath: "inset(0% 0 100% 0)", opacity: 0.6 });
              }
            },
            onEnterBack: () => {
              // Rise-up effect when scrolling back up
              if (leftTextRef.current) {
                gsap.to(leftTextRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.2, 
                  ease: "power3.out" 
                });
              }
              if (rightTextRef.current) {
                gsap.to(rightTextRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.2, 
                  ease: "power3.out" 
                });
              }
              if (paragraphRef.current) {
                gsap.to(paragraphRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.2, 
                  ease: "power3.out" 
                });
              }
            }
          }
        });

        // Additional ScrollTrigger specifically for rise-up animation when scrolling back to hero
        const heroRiseUpTl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top 80%",
            end: "top 20%",
            scrub: 1.8,
            onEnterBack: () => {
              // Rise-up effect when scrolling back up to hero section
              if (leftTextRef.current) {
                gsap.to(leftTextRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.5, 
                  ease: "power3.out" 
                });
              }
              if (rightTextRef.current) {
                gsap.to(rightTextRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.5, 
                  ease: "power3.out" 
                });
              }
              if (paragraphRef.current) {
                gsap.to(paragraphRef.current, { 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)", 
                  opacity: 1, 
                  duration: 1.5, 
                  ease: "power3.out" 
                });
              }
            }
          }
        });

        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          initialTl.kill();
          heroScrollTl.kill();
          heroRiseUpTl.kill();
        };
      }
    };

    document.addEventListener('heroReady', handleHeroReady);
    
    return () => {
      document.removeEventListener('heroReady', handleHeroReady);
    };
  }, []);

  return (
    <div className="lg:mt-30 mt-10 flex flex-col min-h-[80vh] justify-center relative">
      <div className="flex flex-col lg:justify-between items-center justify-between lg:items-end lg:flex-row mt-10 lg:mt-20">
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, #74cec8 0%, #0b1b1f 60%, #050a0b 100%)",
            filter: "blur(80px)",
            opacity: 0.35,
          }}
        ></div>

        {/* Dotted Background */}
        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 z-0
          w-full h-[70%] max-w-none max-h-none
          lg:w-[70%] lg:max-w-[500px] lg:h-[80%] lg:max-h-[400px] md:w-[70%] md:max-w-[500px] md:h-[80%] md:max-h-[400px] sm:w-[70%] sm:max-w-[500px] sm:h-[80%] sm:max-h-[400px]
          bg-[radial-gradient(circle,_rgba(255,255,255,0.2)2.7px,_transparent_1.5px)]
          bg-[size:50px_50px] rounded-xl pointer-events-none
        "></div>

        <div className="flex flex-col space-y-15 lg:space-y-40">
          <div className="flex flex-col flex-wrap lg:flex-row lg:space-x-4 lg:space-y-0">
            <h1
              ref={leftTextRef}
              className="lg:text-8xl text-6xl whitespace-nowrap md:text-8xl self-start font-medium text-white tracking-tighter"
            >
              Your Vision.
            </h1>
            <h1
              className="lg:text-8xl lg:hidden text-6xl whitespace-nowrap text-left md:text-8xl sm:self-end font-medium text-white tracking-tighter"
            >
              Our Mission.
            </h1>
          </div>
          <p
            ref={paragraphRef}
            className="text-slate-100 font-light mt-2 text-xl lg:w-[75%]"
          >
            Rodexco helps creators build scalable businesses through
            strategic guidance, operational support, and diversified
            monetization.
          </p>
        </div>
        <h1 ref={rightTextRef} className="hidden lg:text-8xl lg:block font-medium w-[80%] tracking-tighter">
          Our Mission.
        </h1>
      </div>

              {/* Social proof + CTA */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex -space-x-4 mb-2 relative">
            {/* Radial background gradients behind avatars */}
            {[
              "https://randomuser.me/api/portraits/women/1.jpg",
              "https://randomuser.me/api/portraits/men/2.jpg",
              "https://randomuser.me/api/portraits/women/3.jpg",
              "https://randomuser.me/api/portraits/men/4.jpg",
            ].map((src, i) => (
              <div key={i} className="relative">
                {/* Radial background for each avatar */}
                <div 
                  className="absolute inset-0 w-10 h-10 rounded-full opacity-30"
                  style={{ 
                    background: `radial-gradient(circle, rgba(116, 206, 200, 0.4) 0%, rgba(116, 206, 200, 0.2) 50%, rgba(116, 206, 200, 0.05) 80%, transparent 100%)`,
                    filter: "blur(8px)",
                    zIndex: 0,
                  }}
                ></div>
                <img
                  src={src}
                  alt="avatar"
                  className="w-10 h-10 rounded-full bg-slate-800 relative z-10"
                  ref={(el) => (avatarsRef.current[i] = el)}
                />
              </div>
            ))}
          </div>
        <span className="text-slate-300 text-base mb-4">
          100+ Creators trust Rodexco
        </span>
        <div ref={buttonRef}>
          <GlowButton onClick={() => navigate('/contact')}>Apply Now</GlowButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
