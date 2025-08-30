import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HeadlineSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    // Set up continuous left-moving animation
    const container = containerRef.current;
    if (container) {
      // Clone the content for seamless loop
      const content = container.children[0];
      const clone = content.cloneNode(true);
      container.appendChild(clone);

      // Set initial position
      gsap.set(container, { x: 0 });

      // Create infinite left-moving animation
      gsap.to(container, {
        x: -content.offsetWidth,
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    }

    // Set up section-wide hover effects
    const section = sectionRef.current;
    if (section) {
      // Hover enter animation for entire section
      section.addEventListener('mouseenter', () => {
        // Animate all arrows
        arrowRefs.current.forEach((arrow) => {
          if (arrow) {
            gsap.to(arrow, {
              rotation: 360,
              scale: 1.2,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });

        // Animate all text
        textRefs.current.forEach((text) => {
          if (text) {
            gsap.to(text, {
              color: "#7bdbd4",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });

      // Hover leave animation for entire section
      section.addEventListener('mouseleave', () => {
        // Reset all arrows
        arrowRefs.current.forEach((arrow) => {
          if (arrow) {
            gsap.to(arrow, {
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });

        // Reset all text
        textRefs.current.forEach((text) => {
          if (text) {
            gsap.to(text, {
              color: "#ffffff",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }

    // Cleanup function
    return () => {
      if (section) {
        section.removeEventListener('mouseenter', () => {});
        section.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-16 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden mt-10">
      {/* Enhanced background with subtle rays */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(116, 206, 200, 0.3) 0%, rgba(116, 206, 200, 0.1) 40%, rgba(116, 206, 200, 0.05) 70%, transparent 100%)",
          filter: "blur(60px)",
        }}
      ></div>
      
      {/* Moving content container - full width for seamless scrolling */}
      <div className="w-full relative z-10">
        <div 
          ref={containerRef}
          className="flex items-center space-x-16 whitespace-nowrap relative z-10"
          style={{ width: 'max-content' }}
        >
          {/* First phrase */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <span 
              ref={(el) => (textRefs.current[0] = el)}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300"
            >
              Reduce Your Workload
            </span>
            <div 
              ref={(el) => (arrowRefs.current[0] = el)}
              className="w-10 h-10 text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>

          {/* Second phrase */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <span 
              ref={(el) => (textRefs.current[1] = el)}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300"
            >
              Increase Your Revenue
            </span>
            <div 
              ref={(el) => (arrowRefs.current[1] = el)}
              className="w-10 h-10 text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>

          {/* Third phrase */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <span 
              ref={(el) => (textRefs.current[2] = el)}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300"
            >
              Grow Your Audience
            </span>
            <div 
              ref={(el) => (arrowRefs.current[2] = el)}
              className="w-10 h-10 text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>

          {/* Additional phrases for seamless loop */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300">
              Reduce Your Workload
            </span>
            <div className="w-10 h-10 text-white transition-all duration-300 cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300">
              Increase Your Revenue
            </span>
            <div className="w-10 h-10 text-white transition-all duration-300 cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white transition-colors duration-300">
              Grow Your Audience
            </span>
            <div className="w-10 h-10 text-white transition-all duration-300 cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4l-8 8h16l-8-8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadlineSection;
