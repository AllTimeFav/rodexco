import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import GlowButton from './GLowButton';

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialRef = useRef(null);
  const avatarRefs = useRef([]);
  const ringRefs = useRef([]);
  const quoteRef = useRef(null);
  const nameRef = useRef(null);
  const imageRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      quote: "Rodexco changed my entire workflow for the better. Seriously, my opportunities have quadrupled and my stress is a fraction of what it was. I feel taken care of, and that means SO much.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      color: "#F97316",
      duration: 0.9
    },
    {
      name: "Alex Chen",
      quote: "The platform is incredibly intuitive and the results speak for themselves. My revenue has increased by 300% since I started using Rodexco. It's like having a personal growth coach.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      color: "#8B5CF6",
      duration: 0.8
    },
    {
      name: "Mars Rodriguez",
      quote: "I was skeptical at first, but Rodexco has completely transformed how I approach content creation. The community support and tools are game-changing. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      color: "#22C55E",
      duration: 1.0
    }
  ];

  useEffect(() => {
    // Initial animation setup
    gsap.set([testimonialRef.current, quoteRef.current, nameRef.current, imageRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in initial testimonial
    const initialDuration = testimonials[0].duration || 0.8;
    const tl = gsap.timeline();
    tl.to(testimonialRef.current, { opacity: 1, y: 0, duration: initialDuration, ease: "power3.out" })
      .to(quoteRef.current, { opacity: 1, y: 0, duration: initialDuration, ease: "power3.out" }, "-=0.4")
      .to(nameRef.current, { opacity: 1, y: 0, duration: Math.max(0.5, initialDuration - 0.2), ease: "power3.out" }, "-=0.6")
      .to(imageRef.current, { opacity: 1, y: 0, duration: initialDuration, ease: "power3.out" }, "-=0.4");

    // Animate avatars with stagger
    gsap.to(avatarRefs.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // Prepare avatar progress rings
    const circumference = 2 * Math.PI * 48; // viewBox r=48
    ringRefs.current.forEach((ring) => {
      if (!ring) return;
      gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference });
    });
  }, []);

  // Animate current avatar progress ring on change
  useEffect(() => {
    const circumference = 2 * Math.PI * 48;
    // reset all
    ringRefs.current.forEach((ring, idx) => {
      if (!ring) return;
      gsap.killTweensOf(ring);
      gsap.set(ring, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        stroke: testimonials[idx]?.color || '#ffffff'
      });
    });

    const currentRing = ringRefs.current[currentTestimonial];
    if (currentRing) {
      gsap.set(currentRing, { stroke: testimonials[currentTestimonial].color, strokeDashoffset: 0 });
      gsap.to(currentRing, {
        strokeDashoffset: circumference,
        duration: testimonials[currentTestimonial].duration || 1,
        ease: 'none'
      });
    }
  }, [currentTestimonial]);

  const switchTestimonial = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentTestimonial + 1) % testimonials.length
      : (currentTestimonial - 1 + testimonials.length) % testimonials.length;

    // Animate out current testimonial
    const tl = gsap.timeline();
    tl.to([quoteRef.current, nameRef.current, imageRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    })
    .call(() => {
      setCurrentTestimonial(newIndex);
    })
    .to([quoteRef.current, nameRef.current, imageRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    });

    // Animate avatar selection
    gsap.to(avatarRefs.current, {
      scale: 0.8,
      opacity: 0.6,
      duration: 0.3,
      ease: "power2.in"
    });

    gsap.to(avatarRefs.current[newIndex], {
      scale: 1.1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });

    // Reset other avatars
    avatarRefs.current.forEach((avatar, index) => {
      if (index !== newIndex) {
        gsap.to(avatar, {
          scale: 1,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="w-full py-32 relative overflow-hidden backdrop-blur-sm">
      {/* Global soft dots background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      ></div>

      {/* Subtle radial glows */}
      <div 
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(255, 165, 0, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      ></div>
      <div 
        className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      ></div>

      <div className="lg:max-w-[65%] md:max-w-[90%] mx-auto px-4 py-6 relative z-10">
        {/* Top row: heading and CTA aligned */}
        <div ref={testimonialRef} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <h2 className="text-3xl lg:text-5xl text-white leading-tight">Hear it from our clients</h2>
          <div className="flex items-center gap-6 md:text-right">
            <h3 className="text-lg lg:text-2xl text-white">Ready to Learn More?</h3>
            <GlowButton className='cursor-pointer' onClick={() => navigate('/contact')}>Get in Touch</GlowButton>
          </div>
        </div>

        {/* Trusted by */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="space-y-4">
            <p className="text-base lg:text-xl text-white/80">Trusted by</p>

            {/* Client Avatars */}
            <div className="flex space-x-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  ref={(el) => (avatarRefs.current[index] = el)}
                  className={`w-16 h-16 rounded-full border-1 transition-all duration-300 cursor-pointer`}
                  onClick={() => {
                    if (index !== currentTestimonial) {
                      setCurrentTestimonial(index);
                      // Animate avatar selection
                      gsap.to(avatarRefs.current, {
                        scale: 0.8,
                        opacity: 0.6,
                        duration: 0.3,
                        ease: "power2.in"
                      });
                      gsap.to(avatarRefs.current[index], {
                        scale: 1.1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                      });
                      // Reset other avatars
                      avatarRefs.current.forEach((avatar, idx) => {
                        if (idx !== index) {
                          gsap.to(avatar, {
                            scale: 1,
                            opacity: 0.8,
                            duration: 0.3,
                            ease: "power2.out"
                          });
                        }
                      });
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                      style={{ border: index === currentTestimonial ? `2px solid ${testimonial.color}` : undefined }}
                    />
                    {/* animated progress ring */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
                      <circle
                        ref={(el) => (ringRefs.current[index] = el)}
                        cx="50"
                        cy="50"
                        r="48"
                        strokeWidth="4"
                        strokeLinecap="round"
                        stroke={testimonial.color}
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote 
              ref={quoteRef}
              className="text-xl lg:text-2xl text-white leading-relaxed italic mt-6"
            >
              "{currentData.quote}"
            </blockquote>

            {/* Navigation Arrows */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => switchTestimonial('prev')}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
              >
                <svg 
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button
                onClick={() => switchTestimonial('next')}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
              >
                <svg 
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Image column (right on lg) */}
          <div className="relative mt-10 lg:mt-0">
          <div 
            ref={imageRef}
            className="relative w-full rounded-2xl overflow-hidden"
          >
            {/* Dotted square background behind the image, centered */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 rounded-xl"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }}
            ></div>
            <div className="w-full flex justify-center">
              <img
                src={currentData.image}
                alt={currentData.name}
                className="w-[55%] h-[55%] object-cover"
              />
            </div>
            {/* Accent bars on both sides */}
            <div className="absolute right-0 top-0 w-3 h-full" style={{ backgroundColor: currentData.color }}></div>
            <div className="absolute left-0 top-0 w-3 h-full" style={{ backgroundColor: currentData.color }}></div>
          </div>
          
          {/* Name below image */}
          <p 
            ref={nameRef}
            className="text-lg font-medium mt-4 text-center"
            style={{ color: currentData.color }}
          >
            {currentData.name}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
