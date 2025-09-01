
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { gsap } from "gsap"
import { useNavigate } from "react-router-dom"


const questions = [
  {
    id: "name",
    question: "What's your name?",
    placeholder: "Enter your full name...",
    type: "text",
  },
  {
    id: "email",
    question: "What's your email address?",
    placeholder: "Enter your email...",
    type: "email",
  },
  {
    id: "serviceType",
    question: "What service are you interested in?",
    placeholder: "Select a service",
    type: "multiselect",
    options: [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "E-commerce Solutions",
      "Digital Marketing",
      "Consulting",
    ],
  },
  {
    id: "phone",
    question: "What's your phone number?",
    placeholder: "Enter your phone number...",
    type: "tel",
  },
  {
    id: "message",
    question: "Tell us about your project",
    placeholder: "Describe your project in detail...",
    type: "textarea",
  },
]

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    phone: "",
    message: "",
  })
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  const questionRef = useRef(null)
  const inputRef = useRef(null)
  const progressRef = useRef(null)
  const navigate = useNavigate()
  const currentQuestion = questions[currentStep]

  // Typing animation effect
  useEffect(() => {
    setIsTyping(true)
    setDisplayedText("")

    const text = currentQuestion.question
    let index = 0

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentStep])

  // GSAP animations
  useEffect(() => {
    if (questionRef.current && inputRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )

      gsap.fromTo(
        inputRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      )
    }
  }, [currentStep])

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentStep + 1) / questions.length) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [currentStep])

  const toggleService = (service) => {
    setFormData(prev => {
      const currentServices = prev.serviceType
      if (currentServices.includes(service)) {
        return {
          ...prev,
          serviceType: currentServices.filter(s => s !== service)
        }
      } else {
        return {
          ...prev,
          serviceType: [...currentServices, service]
        }
      }
    })
  }

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      case "name":
      case "phone":
      case "message":
        return value.trim().length > 0
      case "serviceType":
        return value !== ""
      default:
        return true
    }
  }

  const handleNext = () => {
    const currentValue = formData[currentQuestion.id]

    if (!validateField(currentQuestion.id, currentValue)) {
      // Add shake animation for invalid input
      if (inputRef.current) {
        gsap.to(inputRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.5,
          ease: "power2.out",
        })
      }
      return
    }

    if (currentStep < questions.length - 1) {
      // Animate current content out
      if (questionRef.current && inputRef.current) {
        gsap.to([questionRef.current, inputRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentStep(currentStep + 1)
          },
        })
      }
    } else {
      // Submit form
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      if (questionRef.current && inputRef.current) {
        gsap.to([questionRef.current, inputRef.current], {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentStep(currentStep - 1)
          },
        })
      }
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
    alert("Thank you! Your message has been sent.")
    navigate("/")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
  }

  const updateFormData = (value) => {
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const renderInput = () => {
    const currentValue = formData[currentQuestion.id]

    switch (currentQuestion.type) {
      case "multiselect":
        return (
          <div className="w-full max-w-2xl">
            {/* Instructions text */}
            <div className="text-slate-300 text-lg mb-4">
              <p>Select all that apply.</p>
              <p className="text-slate-400 text-sm mt-1">Choose as many as you like</p>
            </div>

            {/* Options dropdown - always visible for this design */}
            <div
              className="bg-transparent space-y-2"
            >
              {currentQuestion.options?.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index); // A, B, C, etc.
                const isSelected = formData.serviceType.includes(option);

                return (
                  <div
                    key={option}
                    className={`px-4 py-3 text-lg cursor-pointer flex items-center justify-between border-b border-slate-600 hover:border-[#7bdbd4] transition-colors ${isSelected ? "text-[#7bdbd4]" : "text-white"
                      }`}
                    onClick={() => toggleService(option)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium mr-3 w-6 text-center">
                        {optionLetter}.
                      </span>
                      {option}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#7bdbd4]" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      case "select":
        return (
          <Select value={currentValue} onValueChange={updateFormData}>
            <SelectTrigger className="w-full max-w-2xl h-16 text-4xl md:text-2xl bg-transparent border-0 border-b-2 border-[#7bdbd4] text-[#7bdbd4] placeholder-slate-400 focus:border-[#7bdbd4] focus:ring-0 focus:outline-none px-0 rounded-none">
              <SelectValue placeholder={currentQuestion.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border border-slate-600 text-white text-lg">
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option} value={option} className="text-lg py-3 focus:bg-slate-700">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "textarea":
        return (
          <Textarea
            value={currentValue}
            onChange={(e) => updateFormData(e.target.value)}
            placeholder={currentQuestion.placeholder}
            onKeyDown={handleKeyPress}
            className="w-full max-w-2xl ml-2 text-4xl md:text-2xl bg-transparent border-0 border-b-2 border-[#7bdbd4] text-[#7bdbd4] placeholder-slate-400 focus:ring-0 focus:outline-none px-0 resize-none rounded-none"
            autoFocus={!isTyping}
          />
        )

      default:
        return (
          <Input
            type={currentQuestion.type}
            value={currentValue}
            onChange={(e) => updateFormData(e.target.value)}
            placeholder={currentQuestion.placeholder}
            onKeyDown={handleKeyPress}
            className="w-full max-w-2xl h-16 font-light text-xl md:text-4xl bg-transparent border-0 border-b-2 border-[#7bdbd4] text-[#7bdbd4] placeholder-[#7bdbd4] px-0 rounded-none ml-2"
            autoFocus={!isTyping}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a0b] via-[#0b1b1f] to-[#040708] relative overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #74cec8 0%, #0b1b1f 40%, #050a0b 80%)",
          filter: "blur(100px)",
          opacity: 0.3,
        }}
      ></div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-700 relative z-20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#74cec8] to-[#7bdbd4] transition-all duration-500"
          style={{ width: "0%" }}
        />
      </div>

      {/* Step Indicator */}
      {/* <div className="flex justify-center pt-8 pb-4 relative z-20">
        <span className="text-sm text-slate-300">
          Step {currentStep + 1} of {questions.length}
        </span>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex min-h-[90vh] flex-col items-center justify-center px-6 pb-20 relative z-10 font-primary">
        <div className="w-full max-w-2xl space-y-8">
          {/* Question with number */}
          <div ref={questionRef} className="flex items-start space-x-3">
            <div className="flex items-center pt-1">
              <span className="text-lg md:text-xl flex items-center space-x-2 text-[#7bdbd4]">
                {currentStep + 1} <ArrowRight className="w-5 h-5" />
              </span>
            </div>
            <div className="flex-1 space-y-2 text-left">
              <h2 className="text-xl md:text-2xl text-white text-balance">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </h2>
            </div>
          </div>

          {/* Input Field - aligned with question text, not the number */}
          <div ref={inputRef} className="flex justify-end">
            <div className="w-full max-w-2xl ml-10"> {/* Offset to align with question text */}
              {renderInput()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 ml-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-slate-300 disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 text-lg font-medium bg-[#7bdbd4] text-black cursor-pointer"
            >
              {currentStep === questions.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}