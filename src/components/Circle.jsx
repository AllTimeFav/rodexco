import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const topics = [
  {
    id: 1,
    title: "Introductory Call",
    description:
      "We start with a comprehensive consultation to understand your goals, challenges, and vision for the project.",
    angle: -90, // Top of circle
  },
  {
    id: 2,
    title: "Onboarding",
    description:
      "Complete project setup, team introductions, and establishing clear communication channels and workflows.",
    angle: -18, // 72 degrees clockwise from top
  },
  {
    id: 3,
    title: "Project Sessions",
    description: "Regular working sessions where we collaborate closely to build, iterate, and refine your solution.",
    angle: 54, // 144 degrees clockwise from top
  },
  {
    id: 4,
    title: "Ongoing Support",
    description: "Continuous assistance, maintenance, and optimization to ensure your project runs smoothly.",
    angle: 126, // 216 degrees clockwise from top
  },
  {
    id: 5,
    title: "Performance Iteration",
    description: "Data-driven improvements and feature enhancements based on real-world usage and feedback.",
    angle: 198, // 288 degrees clockwise from top
  },
]

export default function CircularTimeline() {
  const containerRef = useRef(null)
  const circleRef = useRef(null)
  const topicsRef = useRef([])
  const descriptionsRef = useRef([])
  const dotsRef = useRef([])
  const centerModelRef = useRef(null)
  const gradientBg1Ref = useRef(null)
  const gradientBg2Ref = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !circleRef.current) return

    const circle = circleRef.current
    const radius = 350
    const circumference = 2 * Math.PI * radius

    // Set up the circle stroke animation
    circle.style.strokeDasharray = `${circumference}`
    circle.style.strokeDashoffset = `${circumference}`

    // Initialize all topics as hidden initially - positioned below ground
    topics.forEach((_, index) => {
      const topic = topicsRef.current[index]
      const description = descriptionsRef.current[index]
      if (topic && description) {
        gsap.set(topic, { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" })
        gsap.set(description, { opacity: 0, y: 60, scale: 0.8 })
      }
    })

    // Initialize center model
    if (centerModelRef.current) {
      gsap.set(centerModelRef.current, { opacity: 0, scale: 0.3, rotationY: 180 })
    }

    // Initialize gradient backgrounds
    if (gradientBg1Ref.current && gradientBg2Ref.current) {
      gsap.set(gradientBg1Ref.current, { rotation: 0, scale: 1.2 });
      gsap.set(gradientBg2Ref.current, { rotation: 45, scale: 1.5 });
    }

    // Set up ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom bottom",
        scrub: 1,
        onEnter: () => {
          // Start animation immediately when entering trigger area
          circle.style.strokeDashoffset = circumference.toString()
          
          // Animate center model in
          if (centerModelRef.current) {
            gsap.to(centerModelRef.current, {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.5,
              ease: "back.out(1.7)",
            })
          }

          // Animate gradient backgrounds in
          if (gradientBg1Ref.current && gradientBg2Ref.current) {
            gsap.to(gradientBg1Ref.current, {
              opacity: 0.6,
              duration: 1.5,
              ease: "power2.out"
            });
            gsap.to(gradientBg2Ref.current, {
              opacity: 0.4,
              duration: 1.5,
              ease: "power2.out"
            });
          }
        },
        onUpdate: (self) => {
          const progress = self.progress
          
          // Update circle stroke - simple linear progress
          const offset = circumference - (progress * circumference)
          circle.style.strokeDashoffset = offset.toString()

          // Animate gradient backgrounds with scroll
          if (gradientBg1Ref.current && gradientBg2Ref.current) {
            gsap.to(gradientBg1Ref.current, {
              rotation: progress * 180,
              scale: 1.2 + progress * 0.3,
              duration: 0.1
            });
            gsap.to(gradientBg2Ref.current, {
              rotation: 45 + progress * -360,
              scale: 1.5 - progress * 0.5,
              duration: 0.1
            });
          }

          // Calculate which topic should be active based on progress
          const totalSteps = topics.length
          const currentStep = Math.min(Math.floor(progress * totalSteps), totalSteps - 1)
          
          // Update topic and description visibility with ground emergence effect
          topics.forEach((_, index) => {
            const topic = topicsRef.current[index]
            const description = descriptionsRef.current[index]

            if (topic && description) {
              if (index === currentStep) {
                // Current active topic - emerging from ground
                gsap.to(topic, { 
                  opacity: 1, 
                  y: 0, 
                  clipPath: "inset(0% 0 0% 0)",
                  duration: 0.8, 
                  ease: "power3.out" 
                })
                
                // Show description when topic is active
                gsap.to(description, { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  duration: 0.6, 
                  ease: "power2.out" 
                })
              } else if (index < currentStep) {
                // Previous completed topics - keep visible but dimmed
                gsap.to(topic, { opacity: 0.6, y: 0, clipPath: "inset(0% 0 0% 0)", duration: 0.3, ease: "power2.out" })
                gsap.to(description, { opacity: 0.3, y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
              } else {
                // Future topics - hidden below ground
                gsap.to(topic, { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)", duration: 0.3, ease: "power2.out" })
                gsap.to(description, { opacity: 0, y: 60, scale: 0.8, duration: 0.3, ease: "power2.out" })
              }
            }
          })
          
          // Update dot visibility based on progress
          const stepProgress = 1 / totalSteps
          topics.forEach((_, index) => {
            const dot = dotsRef.current[index]
            
            if (dot) {
              const dotShouldBeVisible = progress >= (index * stepProgress) + (stepProgress * 0.1)
              
              if (dotShouldBeVisible) {
                gsap.to(dot, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
              } else {
                gsap.set(dot, { opacity: 0, scale: 0.8 })
              }
            }
          })
        },
        onLeave: () => {
          // Reset when leaving the trigger area
          circle.style.strokeDashoffset = circumference.toString()
          topics.forEach((_, index) => {
            const topic = topicsRef.current[index]
            const description = descriptionsRef.current[index]
            const dot = dotsRef.current[index]
            if (topic && description) {
              gsap.set(topic, { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" })
              gsap.set(description, { opacity: 0, y: 60, scale: 0.8 })
            }
            if (dot) {
              gsap.set(dot, { opacity: 0, scale: 0.8 })
            }
          })
          
          // Reset center model
          if (centerModelRef.current) {
            gsap.set(centerModelRef.current, { opacity: 0, scale: 0.3, rotationY: 180 })
          }

          // Reset gradient backgrounds
          if (gradientBg1Ref.current && gradientBg2Ref.current) {
            gsap.set(gradientBg1Ref.current, { opacity: 0, rotation: 0, scale: 1.2 });
            gsap.set(gradientBg2Ref.current, { opacity: 0, rotation: 45, scale: 1.5 });
          }
        },
        onEnterBack: () => {
          // Handle scrolling back up - ensure first topic is hidden
          circle.style.strokeDashoffset = circumference.toString()
          topics.forEach((_, index) => {
            const topic = topicsRef.current[index]
            const description = descriptionsRef.current[index]
            const dot = dotsRef.current[index]
            if (topic && description) {
              gsap.set(topic, { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" })
              gsap.set(description, { opacity: 0, y: 60, scale: 0.8 })
            }
            if (dot) {
              gsap.set(dot, { opacity: 0, scale: 0.8 })
            }
          })
          
          // Reset center model
          if (centerModelRef.current) {
            gsap.set(centerModelRef.current, { opacity: 0, scale: 0.3, rotationY: 180 })
          }

          // Reset gradient backgrounds
          if (gradientBg1Ref.current && gradientBg2Ref.current) {
            gsap.set(gradientBg1Ref.current, { opacity: 0, rotation: 0, scale: 1.2 });
            gsap.set(gradientBg2Ref.current, { opacity: 0, rotation: 45, scale: 1.5 });
          }
        },
        onLeaveBack: () => {
          // Additional safety reset when scrolling back up beyond trigger
          circle.style.strokeDashoffset = circumference.toString()
          topics.forEach((_, index) => {
            const topic = topicsRef.current[index]
            const description = descriptionsRef.current[index]
            const dot = dotsRef.current[index]
            if (topic && description) {
              gsap.set(topic, { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" })
              gsap.set(description, { opacity: 0, y: 60, scale: 0.8 })
            }
            if (dot) {
              gsap.set(dot, { opacity: 0, scale: 0.8 })
            }
          })
          
          // Reset center model
          if (centerModelRef.current) {
            gsap.set(centerModelRef.current, { opacity: 0, scale: 0.3, rotationY: 180 })
          }

          // Reset gradient backgrounds
          if (gradientBg1Ref.current && gradientBg2Ref.current) {
            gsap.set(gradientBg1Ref.current, { opacity: 0, rotation: 0, scale: 1.2 });
            gsap.set(gradientBg2Ref.current, { opacity: 0, rotation: 45, scale: 1.5 });
          }
        }
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const getTopicPosition = (angle, radius) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    }
  }

  return (
    <div className="bg-transparent">
      {/* Mobile: list view */}
      <div className="md:hidden px-4 py-12">
        <h3 className="text-2xl text-white font-semibold mb-6">How we work</h3>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={`m-${topic.id}`} className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal-400/70 to-teal-200/40 text-black font-bold flex items-center justify-center">
                  {topic.id}
                </div>
                <div>
                  <h4 className="text-white text-lg font-medium">{topic.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">{topic.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="hidden md:block min-h-[300vh] relative">
        {/* Gradient backgrounds that will move with scrolling */}
        <div 
          ref={gradientBg1Ref}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(94, 114, 235, 0.4) 0%, transparent 50%)",
            transition: "opacity 0.5s ease",
          }}
        ></div>
        <div 
          ref={gradientBg2Ref}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 70%, rgba(255, 107, 107, 0.3) 0%, transparent 50%)",
            transition: "opacity 0.5s ease",
          }}
        ></div>

        {/* Sticky container for the circle */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl mx-auto px-4">
            {/* SVG Circle */}
            <div className="flex justify-center">
              <svg width="1000" height="1000" viewBox="0 0 1000 1000" className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
                {/* Background circle - low opacity, always visible */}
                <circle cx="500" cy="500" r="350" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
                {/* Animated progress circle */}
                <circle
                  ref={circleRef}
                  cx="500"
                  cy="500"
                  r="350"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform="rotate(-90 500 500)"
                />
                
                {/* Topic dots on the circle - will appear progressively */}
                {topics.map((topic, index) => {
                  const position = getTopicPosition(topic.angle, 350)
                  return (
                    <circle
                      key={`dot-${topic.id}`}
                      cx={500 + position.x}
                      cy={500 + position.y}
                      r="8"
                      fill="white"
                      ref={(el) => {
                        if (el) {
                          dotsRef.current[index] = el
                          // Set initial state with GSAP
                          gsap.set(el, { opacity: 0, scale: 0.8 })
                        }
                      }}
                    />
                  )
                })}
              </svg>
            </div>

            {/* 3D Model in Center of Circle */}
            <div 
              ref={centerModelRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="relative">
                {/* Radial background for the model */}
                <div 
                  className="absolute inset-0 -m-12 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(circle, rgba(116, 206, 200, 0.3) 0%, rgba(116, 206, 200, 0.05) 50%, transparent 100%)",
                    filter: "blur(30px)",
                  }}
                ></div>
              </div>
            </div>

            {/* Topics positioned around the circle */}
            {topics.map((topic, index) => {
              const position = getTopicPosition(topic.angle, 350)
              const isLeft = position.x < 0

              return (
                <div key={topic.id} className="absolute inset-0 flex items-center justify-center">
                  {/* Topic title */}
                  <div
                    ref={(el) => (topicsRef.current[index] = el)}
                    className="absolute text-white font-semibold text-sm md:text-base lg:text-lg text-center max-w-32"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {topic.title}
                  </div>

                  {/* Description box - no border, smooth animation */}
                  <div
                    ref={(el) => (descriptionsRef.current[index] = el)}
                    className={`absolute w-64 md:w-80 p-6 bg-transparent rounded-lg ${
                      isLeft ? "text-left" : "text-right"
                    }`}
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: `translate(${isLeft ? '-100%' : '0'}, -50%)`,
                      marginLeft: isLeft ? '-20px' : '20px',
                      transformOrigin: 'bottom center'
                    }}
                  >
                    <p className="text-gray-300 text-sm leading-relaxed">{topic.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}