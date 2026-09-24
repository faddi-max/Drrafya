import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileCheck, Stethoscope, Clock } from "lucide-react";
import "./TrustSection.css";
import { useNavigate } from "react-router-dom";

export default function TrustSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const trustCards = [
    {
      id: 1,
      icon: <FileCheck className="trust-icon" size={36} />,
      title: t("Accurate", "Accurate"),
      description: t(
        "Fact-checked with the latest science-backed research",
        "Fact-checked with the latest science-backed research"
      ),
    },
    {
      id: 2,
      icon: <Stethoscope className="trust-icon" size={36} />,
      title: t("Trustworthy", "Trustworthy"),
      description: t(
        "Edited and reviewed by doctors and parenting professionals",
        "Edited and reviewed by doctors and parenting professionals"
      ),
    },
    {
      id: 3,
      icon: <Clock className="trust-icon" size={36} />,
      title: t("Timely", "Timely"),
      description: t(
        "Updated regularly to reflect the latest information",
        "Updated regularly to reflect the latest information"
      ),
    },
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        {/* Section Heading */}
        <h2 className="trust-title">
          {t("Why You Can Trust", "Why You Can Trust")}{" "}
          <span className="purple-accent">
            {t("What to Expect", "What to Expect")}
          </span>
        </h2>

        {/* Cards Grid */}
        <div className="trust-grid">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="trust-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="icon-wrapper">
                <div className="icon-inner-circle">{card.icon}</div>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="trust-cta">
          <h4 className="cta-title">
            {t("Read About Our Content Standards", "Read About Our Content Standards")}
          </h4>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(`/blogs`)}
          >
            {t("Read More", "Read More")}
          </motion.button>
        </div>
      </div>
    </section>
  );
}