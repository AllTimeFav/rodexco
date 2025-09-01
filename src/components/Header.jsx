import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  // Set initial states when component mounts
  useEffect(() => {
    if (headerRef.current && logoRef.current && titleRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -40 });
      gsap.set(titleRef.current, { opacity: 0, y: -20 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    }
  }, []);

  // Animate when heroReady event fires (same logic as Hero component)
  useEffect(() => {
    const handleHeroReady = (event) => {
      if (event.detail.ready) {
        const headerTl = gsap.timeline();

        headerTl
          .to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          })
          .to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .to(
            logoRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            },
            '-=0.4'
          );

        // Scroll behavior (optional: make it interactive like Hero)
        gsap.to(headerRef.current, {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(headerRef.current, {
                opacity: 1 - progress * 0.5,
                y: -progress * 60,
              });
            },
          },
        });
      }
    };

    document.addEventListener('heroReady', handleHeroReady);

    return () => {
      document.removeEventListener('heroReady', handleHeroReady);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="flex justify-between items-center "
    >
      <h1
        ref={titleRef}
        className="text-[#74cec8] font-medium text-2xl tracking-tight"
      >
        Rodexco
      </h1>
      <div>
        <img
          ref={logoRef}
          src="/logos.png"
          alt="logo"
          className="w-13 h-13 rotate-180"
        />
      </div>
    </div>
  );
};

export default Header;
