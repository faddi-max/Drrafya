
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileCheck, Stethoscope, Clock } from "lucide-react";
import "./TrustSection.css";
import { useNavigate } from "react-router-dom";

export default function TrustSection() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  const trustCards = [
    {
      id: 1,
      icon: <FileCheck className="trust-icon" size={36} />,
      title: t("Evidence-Based"),
      description: t(
        "Health information is developed from established medical knowledge and reviewed with appropriate clinical standards."
      ),
    },
    {
      id: 2,
      icon: <Stethoscope className="trust-icon" size={36} />,
      title: t("Expert-Led"),
      description: t(
        "Medical content is led or reviewed by qualified healthcare professionals with clearly identified expertise."
      ),
    },
    {
      id: 3,
      icon: <Clock className="trust-icon" size={36} />,
      title: t("Kept Up to Date"),
      description: t(
        "Important health information is reviewed and updated as medical guidance evolves."
      ),
    },
  ];

  return (
    <section
      className="trust-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="trust-container">
        {/* Section Heading */}
        <h2 className="trust-title">
          {t("Why Women Can Trust Dr. Rafia's Medical Guidance")}
        </h2>

        {/* Cards Grid */}
        <div className="trust-grid">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="trust-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <div className="icon-wrapper">
                <div className="icon-inner-circle">
                  {card.icon}
                </div>
              </div>

              <h3 className="card-title">
                {card.title}
              </h3>

              <p className="card-desc">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="trust-cta">
          <h4 className="cta-title">
            {t("Read Our Medical & Editorial Standards")}
          </h4>

          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/blogs")}
          >
            {t("Read Our Medical & Editorial Standards")}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
