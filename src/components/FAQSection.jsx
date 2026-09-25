import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQSection.css";
import faqsimage from "../assets/faqs.webp";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We provide women-focused healthcare services including consultations, specialist care, pregnancy support, fertility guidance, and access to helpful health tools and resources.",
  },
  {
    id: 2,
    question: "Can I book an appointment online?",
    answer:
      "Yes. You can book an appointment online and choose the available consultation option that best suits your needs.",
  },
  {
    id: 3,
    question: "Do you provide pregnancy and prenatal guidance?",
    answer:
      "Yes. We provide pregnancy-related guidance and resources to help you understand each stage of pregnancy and make informed healthcare decisions.",
  },
  {
    id: 4,
    question: "Can I consult a specialist?",
    answer:
      "Yes. You can access specialist care for women's health concerns and connect with qualified healthcare professionals based on your needs.",
  },
  {
    id: 5,
    question: "Are your health tools a replacement for medical advice?",
    answer:
      "No. Our calculators, trackers, and educational resources are designed to provide helpful information and support. They should not replace professional medical consultation or diagnosis.",
  },
  {
    id: 6,
    question: "How can I get help if I have more questions?",
    answer:
      "If you need additional assistance, you can contact our team or book a consultation to discuss your concerns with a healthcare professional.",
  },
];

export default function FAQSection() {
  const { t, i18n } = useTranslation();
  const [openId, setOpenId] = useState(1);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="faq-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="faq-container">

        {/* LEFT COLUMN */}
        <div className="faq-left-col">
          <div>
            <div className="faq-badge">
              <span className="faq-badge-dot" />
              <span>{t("FAQs")}</span>
            </div>

            <h2 className="faq-title">
              {t("Frequently Asked")}
              <br />
              {t("Questions")}
            </h2>
          </div>

          {/* BOOKING CARD */}
          <div className="faq-booking-card">
            <div className="booking-avatar-wrapper">
              <div className="booking-avatar-glow" />

              <img
                src={faqsimage}
                alt={t("Healthcare Representative")}
                className="booking-avatar"
              />
            </div>

            <h3 className="booking-card-title">
              {t("Book a 15 min call")}
            </h3>

            <p className="booking-card-desc">
              {t(
                "If you have any questions, just book a 15-minute call with us before subscribing"
              )}
            </p>

            <button
              type="button"
              className="booking-btn"
              onClick={() =>
                window.open(
                  "https://wa.me/923217183160",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              {t("Book a Free Call!")}
            </button>
          </div>
        </div>

        {/* FAQ ACCORDION */}
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
                  <h4 className="faq-question">
                    {t(item.question)}
                  </h4>

                  <span className="faq-toggle-icon">
                    {isOpen ? (
                      <X size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="faq-answer">
                        {t(item.answer)}
                      </p>
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