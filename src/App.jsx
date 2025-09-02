import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClearPath from "./components/ClearPath";
import Transform from "./components/Transform";
import Process from "./components/Process";
import CircularTimeline from "./components/Circle";
import HeadlineSection from "./components/HeadlineSection";
import PartnersWords from "./components/PartnersWords";
import ClientTestimonials from "./components/ClientTestimonials";
import Questions from "./components/Questions";
import RoadmapCTA from "./components/RoadmapCTA";
import Footer from "./components/Footer";
import InlinePrisma from "./components/InlinePrisma";
import Contact from "./components/Contact";

function App() {
  // Add smooth scrolling CSS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
       html {
         scroll-behavior: auto;
         scroll-padding-top: 0;
         scroll-snap-type: none;
       }
       
       body {
         scroll-behavior: auto;
         overflow-x: hidden;
         -webkit-overflow-scrolling: touch;
       }
       
       /* Enhanced smooth scrolling for all elements */
       * {
         scroll-behavior: auto;
       }
       
     `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Start CSS-driven animations only when in view
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-animate-on-view]'));
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add('in-view');
          } else {
            target.classList.remove('in-view');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <>
            <div className="relative bg-gradient-to-b from-[#050a0b] via-[#0b1b1f] to-[#040708] text-slate-200 font-primary">
              <InlinePrisma position={[0,0,0]} />
              <div className="2xl:max-w-[65%] max-w-[90%] mx-auto sm:px-4 px-2 sm:py-6 py-2">
                <Header />
                <Hero />
                <ClearPath />
              </div>
              <Transform />
              <div className="2xl:max-w-[65%] max-w-[90%] mx-auto px-4 py-6">
                <Process />
                <CircularTimeline />
              </div>
              <HeadlineSection />
              <PartnersWords />
              <ClientTestimonials />
              <Questions />
              <RoadmapCTA />
              <Footer />
            </div>
          </>
        } />
        
                  {/* Contact Route */}
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
