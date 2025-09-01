import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const DATA = [
  {
    tag: "Brand Partnerships",
    heading:
      "We craft strategic partnerships to grow earnings and reach by leveraging the right datapoints and network.",
    sub: "We’re here to simplify the complexity, guiding you with insights to help your business thrive.",
  },
  {
    tag: "Business Development",
    heading:
      "We help you to review your entire business structure, identifying the most meaningful opportunities to increase.",
    sub: "We’re here to simplify the complexity, guiding you with strategic insights and hands-on support to help your business thrive.",
  },
  {
    tag: "Growth Strategy",
    heading:
      "We connect clients, capital and systems so you can launch and scale new ventures faster and more confidently.",
    sub: "We turn signals into plans so you can execute with clarity.",
  },
];

export default function CardDeck3D() {
  const [active, setActive] = useState(1);
  const cardsRef = useRef([]);

  // initial placement
  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      const t = getPose(i - active);
      gsap.set(el, t.base);
      gsap.set(el.querySelector(".glow"), { opacity: t.glow });
    });
  }, []);

  // animate on active change
  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      const t = getPose(i - active);
      gsap.to(el, { ...t.base, duration: 0.9, ease: "power3.inOut" });
      gsap.to(el.querySelector(".glow"), {
        opacity: t.glow,
        duration: 0.6,
        ease: "power3.inOut",
      });
      // instant z-index switch so the active card is on top
      gsap.set(el, { zIndex: 30 - Math.abs(i - active) });
    });
  }, [active]);

  return (
    <section className="relative bg-transparent w-full overflow-hidden flex items-center justify-center">
      {/* subtle dot grid on top */}
      <div
        className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-[720px] h-20 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.44) 1.2px, transparent 2.2px)",
          backgroundSize: "54px 34px",
        }}
      />

      {/* deck */}
      <div className="relative w-full max-w-7xl h-[500px] sm:h-[520px] perspective-[1200px] md:perspective-[1400px] flex items-center justify-center">
        {DATA.map((c, i) => (
          <article
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => setActive(i)}
            className="
              card absolute cursor-pointer select-none
              w-[380px] max-w-[60vw] sm:h-[520px] h-[380px]
              sm:rounded-3xl rounded-lg bg-[#040708]
            "
          >
            {/* soft cyan rim/glow when active */}
            <div className="glow pointer-events-none absolute -inset-px rounded-[28px] opacity-1" />
            
            {/* Additional subtle background glow for all cards */}
            <div className="pointer-events-none absolute -inset-2 rounded-[32px] opacity-20"
                 style={{
                   background: "radial-gradient(circle, rgba(116, 206, 200, 0.3) 0%, rgba(116, 206, 200, 0.1) 50%, transparent 100%)",
                   filter: "blur(8px)",
                 }}
            />

            <div className="p-4 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full">
              <div className={`${i === active ? 'opacity-100' : 'opacity-50'} items-center rounded-full border border-black text-[#74cec8] text-sm font-medium`}>
                {c.tag}
              </div>

              <h3
                className={`
                  mt-4 sm:mt-6 font-light tracking-tight text-white
                  leading-snug
                  text-[clamp(1.2rem,2vw,1.8rem)]
                ${i === active ? 'opacity-100' : 'opacity-50'}`}
              >
                {c.heading}
              </h3>

              <p className={`mt-4 sm:mt-6 text-slate-300/90 text-[15px] leading-6 max-w-[54ch] ${i === active ? 'opacity-100' : 'opacity-50'}`}>
                {c.sub}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Pose values tuned to match the reference shot */
function getPose(offset) {
  // clamp to -1, 0, 1 (only three cards)
  const s = Math.max(-1, Math.min(1, offset));
  const base = {
    x: s * 200,              // side spacing
    z: s === 0 ? 0 : -160,   // push sides back slightly
    rotateY: s * 15,         // subtle 3D yaw like the image
    rotateZ: s * 10,          // planar tilt to mimic the photo
    scale: s === 0 ? 1 : 1,  // Increased scale for background cards
    opacity: s === 0 ? 1 : 1, // Increased opacity for better visibility
    filter: s === 0 ? "blur(0px)" : "blur(0.5px)", // Reduced blur
    transformPerspective: 1200,
    transformStyle: "preserve-3d",
  };
  const glow = s === 0 ? 1 : 0.3; // Background cards get subtle glow too
  return { base, glow };
}
