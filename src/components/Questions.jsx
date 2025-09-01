import React, { useState } from "react";
import GlowButton from "./GLowButton";

const faqs = [
  {
    q: "How does Rodexco work?",
    a: "Rodexco partners with creators to align brand opportunities, growth strategy, and monetization. We handle outreach, negotiation, and long-term partnership development so you can stay focused on creating.",
  },
  {
    q: "What kinds of creators do you typically represent?",
    a: "We work with video-first creators across YouTube, TikTok, Twitch, and Shorts/Reels who have strong audience trust and consistent content output.",
  },
  {
    q: "What makes Rodexco different?",
    a: "We focus on sustainable, long-term value. Beyond one-off brand deals, we help creators build repeatable revenue, product lines, and scalable systems.",
  },
  {
    q: "What is Rodexco Ventures?",
    a: "A co-building arm where we incubate products with creators, combining your audience insight with our product, GTM, and operational expertise.",
  },
  {
    q: "How can I get started?",
    a: "Submit your application and we’ll reach out if there’s a strong fit. From there, we’ll align on goals and begin onboarding.",
  },
];

const AccordionItem = ({ index, isOpen, onToggle, question, answer }) => {
  return (
    <div className="border-b border-white/10">
      <button
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
        onClick={onToggle}
        className="w-full text-left py-5 flex items-center justify-between gap-6 group"
      >
        <span className="text-slate-200 text-base md:text-lg tracking-wide group-hover:text-white transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-transform ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm md:text-base text-slate-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-24 md:py-28 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[20%] h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute left-[25%] top-[28%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="2xl:max-w-[65%] max-w-[90%] mx-auto px-4">
        <div className="relative mb-20">
          {/* Radial glow behind heading */}
          <div className="pointer-events-none absolute z-0" aria-hidden
            style={{
              left: "-6%",
              top: "-20%",
              width: "55vw",
              height: "35vw",
              background:
                "radial-gradient(ellipse 65% 55% at 35% 55%, rgba(116,206,200,0.42) 0%, rgba(116,206,200,0.25) 35%, rgba(116,206,200,0.12) 60%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />
          <div className="pointer-events-none absolute z-0" aria-hidden
            style={{
              left: "10%",
              top: "0%",
              width: "40vw",
              height: "18vw",
              background:
                "radial-gradient(ellipse 70% 50% at 40% 40%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.12) 45%, transparent 80%)",
              filter: "blur(50px)",
            }}
          />
          <h2 className="relative z-10 text-[clamp(2rem,10vw,7rem)] font-extrabold tracking-tight leading-none text-white/90">
            QUESTIONS
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left column */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Frequently Asked Questions
            </h3>
            <p className="mt-4 mb-5 text-slate-400 text-sm md:text-base">
              Still can’t find the answer to your question? Submit your application
              to learn more.
            </p>
            <GlowButton>Apply Now</GlowButton>
          </div>

          {/* Right column: accordion */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-white/5/5 divide-y divide-white/5">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;


