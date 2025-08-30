import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlowButton from "./GLowButton";

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    phone: "",
    message: "",
  });

  const formRefs = useRef([]);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");

  const formSteps = [
    {
      field: "name",
      label: "What's your name?",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      field: "email",
      label: "What's your email?",
      type: "email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      field: "serviceType",
      label: "What service do you need?",
      type: "select",
      options: [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Digital Marketing",
        "Consulting",
        "Other",
      ],
      required: true,
    },
    {
      field: "phone",
      label: "What's your phone number?",
      type: "tel",
      placeholder: "Enter your phone number",
      required: false,
    },
    {
      field: "message",
      label: "Tell us about your project",
      type: "textarea",
      placeholder: "Describe your project, goals, and any specific requirements...",
      required: true,
    },
  ];

  // Typing effect for labels
  useEffect(() => {
    if (currentStep < formSteps.length) {
      const label = formSteps[currentStep].label;
      setCurrentLabel(label);
      setIsTyping(true);
      setTypingText("");
      
      let index = 0;
      const timer = setInterval(() => {
        if (index < label.length) {
          setTypingText(label.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !isTyping) {
        if (currentStep < formSteps.length - 1) {
          handleNext();
        } else {
          handleSubmit();
        }
      } else if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, isTyping, navigate]);

  // Validation function
  const validateField = (field, value) => {
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case "name":
        return value.trim().length >= 2;
      case "serviceType":
        return value.trim().length > 0;
      case "message":
        return value.trim().length >= 10;
      case "phone":
        return value.trim().length === 0 || /^[\+]?[1-9][\d]{0,15}$/.test(value);
      default:
        return true;
    }
  };

  const handleNext = () => {
    const currentField = formSteps[currentStep].field;
    const currentValue = formData[currentField];
    
    if (validateField(currentField, currentValue)) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Show validation error (you can add a toast or error state here)
      console.log(`Please fill in ${currentField} correctly`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const renderField = (step, index) => {
    const { field, label, type, placeholder, options, required } = step;
    const isCurrentStep = index === currentStep;

    if (!isCurrentStep) return null;

    return (
      <motion.div
        key={field}
        ref={(el) => (formRefs.current[index] = el)}
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -100, opacity: 0, scale: 0.9 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          duration: 0.6 
        }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-medium text-white mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {typingText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            )}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#74cec8] to-[#4ade80] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {type === "select" ? (
            <motion.select
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:border-[#74cec8] focus:ring-2 focus:ring-[#74cec8]/20 transition-all duration-300"
              required={required}
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            >
              <option value="">Select a service</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </motion.select>
          ) : type === "textarea" ? (
            <motion.textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              rows={6}
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:border-[#74cec8] focus:ring-2 focus:ring-[#74cec8]/20 transition-all duration-300 resize-none"
              required={required}
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          ) : (
            <motion.input
              type={type}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:border-[#74cec8] focus:ring-2 focus:ring-[#74cec8]/20 transition-all duration-300"
              required={required}
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          )}

          <motion.div 
            className="flex justify-between items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {currentStep > 0 && (
              <motion.button
                onClick={handlePrevious}
                className="px-6 py-3 text-slate-300 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back
              </motion.button>
            )}

            {currentStep < formSteps.length - 1 ? (
              <GlowButton onClick={handleNext}>Next</GlowButton>
            ) : (
              <GlowButton onClick={handleSubmit}>Send Message</GlowButton>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          {formSteps.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "bg-[#74cec8] scale-125"
                  : idx < currentStep
                  ? "bg-[#4ade80]"
                  : "bg-slate-600"
              }`}
              whileHover={{ scale: 1.2 }}
              transition={{ delay: idx * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a0b] via-[#0b1b1f] to-[#040708] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #74cec8 0%, #0b1b1f 40%, #050a0b 80%)",
          filter: "blur(100px)",
          opacity: 0.3,
        }}
      ></div>


      <div className="relative z-20 pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 pt-4 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-medium text-white text-center tracking-tight">
            Let's Build Something Amazing
          </h1>
          <p className="text-slate-300 text-center mt-4 text-lg">
            Tell us about your project and we'll get back to you within 24 hours
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="relative z-10 pt-4 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-300 text-lg mb-2">
              Step {currentStep + 1} of {formSteps.length}
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#74cec8] to-[#4ade80] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[50vh] px-4">
        <AnimatePresence mode="wait">
          {renderField(formSteps[currentStep], currentStep)}
        </AnimatePresence>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <motion.div 
        className="relative z-10 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            💡 Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Enter</kbd> to continue, <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Esc</kbd> to go back
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;