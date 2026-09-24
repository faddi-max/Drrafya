import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQSection.css";
import faqsimage from '../assets/faqs.webp';
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    id: 1,
    question: "What does your agency specialize in?",
    answer:
      "We specialize in helping startups design, build, and scale AI-powered products. Our expertise includes AI strategy, UX/UI design, automation tools, and product development for SaaS, tech, and data-driven businesses.",
  },
  {
    id: 2,
    question: "Do you work with early-stage startups?",
    answer:
      "Yes, we work closely with early-stage startups to refine their MVP, validate product ideas, and construct scalable software architectures from the ground up.",
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer:
      "A typical design and MVP build usually takes between 4 to 8 weeks depending on the complexity of features and integrations required.",
  },
  {
    id: 4,
    question: "Can you integrate AI into my existing product?",
    answer:
      "Absolutely. We can perform custom LLM integrations, train fine-tuned models, and craft user interfaces that embed intelligent automation smoothly into your existing ecosystem.",
  },
  {
    id: 5,
    question: "What do you need from me to get started?",
    answer:
      "Just a brief overview of your product vision, target audience, and key goals. We will guide you through the initial scoping call to uncover all specifications.",
  },
  {
    id: 6,
    question: "How do you ensure quality?",
    answer:
      "We run rigorous user testing, component-driven design systems, and continuous integration workflows to guarantee polish, speed, and reliability.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);
  const navigate = useNavigate();

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        
        {/* LEFT COLUMN */}
        <div className="faq-left-col">
          <div>
            <div className="faq-badge">
              <span className="faq-badge-dot" />
              <span>FAQs</span>
            </div>
            <h2 className="faq-title">
              Frequently Asked<br />Questions
            </h2>
          </div>

          {/* BOOKING CARD */}
          <div className="faq-booking-card">
            <div className="booking-avatar-wrapper">
              <div className="booking-avatar-glow" />
              <img
                src={faqsimage}
                alt="Representative"
                className="booking-avatar"
              />
            </div>

            <h3 className="booking-card-title">Book a 15 min call</h3>
            <p className="booking-card-desc">
              If you have any questions, just book a 15-minute call with us before subscribing
            </p>

            <button type="button" className="booking-btn"   onClick={() => window.open('https://wa.me/923217183160', '_blank', 'noopener,noreferrer')}>
              Book a Free Call!
            </button>
          </div>
        </div>

        <div className="faq-accordion-list">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="faq-item"
                onClick={() => toggleFAQ(item.id)}
              >
                <div className="faq-header">
                  <h4 className="faq-question">{item.question}</h4>
                  <span className="faq-toggle-icon">
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="faq-answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}