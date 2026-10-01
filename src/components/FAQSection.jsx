
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQSection.css";
import faqsimage from "../assets/faqs.webp";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    id: 1,
    question: "What services does Dr. Rafia offer?",
    answer:
      "Dr. Rafia Zahir provides care and guidance across gynecology, obstetrics, fertility and infertility, including pregnancy care, fertility evaluation and women's health concerns.",
  },
  {
    id: 2,
    question: "Can I book an appointment online?",
    answer:
      "Yes. You can request an online consultation with Dr. Rafia, subject to availability and the appropriate clinical requirements.",
  },
  {
    id: 3,
    question: "Does Dr. Rafia provide fertility and infertility consultations?",
    answer:
      "Yes. Fertility and infertility are core areas of Dr. Rafia's clinical expertise. Consultations can help assess your history, concerns and appropriate next steps.",
  },
  {
    id: 4,
    question: "Can I consult Dr. Rafia from outside Pakistan?",
    answer:
      "Online consultation options may be available for eligible overseas patients, subject to clinical, licensing and service availability requirements.",
  },
  {
    id: 5,
    question: "Can I get help understanding my lab test results?",
    answer:
      "A healthcare professional can help you understand what a test result may mean in the context of your symptoms and medical history. A result should not be interpreted in isolation.",
  },
  {
    id: 6,
    question: "When should I see a gynecologist?",
    answer:
      "Consider speaking with a gynecologist when you have persistent or concerning symptoms, menstrual problems, reproductive-health concerns, pregnancy-related questions or fertility concerns.",
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
              {t("Questions About Women's Health")}
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
