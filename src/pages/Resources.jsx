import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toolsData } from "../components/ToolsAndFeatures";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";
import "./Resources.css";

export default function Resources() {
  const { t, i18n } = useTranslation();

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  return (
    <>
      {/* Resources / All Tools */}
      <section
        className="resources-section"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="resources-container">

          {/* Header */}
          <motion.div
            className="resources-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="resources-tag">
              {t("Resources")}
            </span>

            <h1 className="resources-title">
              {t("Tools & Resources")}
            </h1>

            <p className="resources-subtitle">
              {t(
                "Explore our complete collection of health calculators, trackers, guides, and helpful resources designed to support you throughout your journey."
              )}
            </p>
          </motion.div>

          {/* All Tools */}
          <div className="resources-grid">
            {toolsData.map((item, index) => {
              const IconSVG = item.Illustration;

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="resource-card"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                >
                  {/* Icon */}
                  <div className="resource-icon-wrapper">
                    <IconSVG />
                  </div>

                  {/* Content */}
                  <h2 className="resource-card-title">
                    {t(item.title)}
                  </h2>

                  <p className="resource-card-desc">
                    {t(item.description)}
                  </p>

                  {/* Action */}
                  <span className="resource-link-action">
                    <span>{t("Explore Tool")}</span>

                    <ArrowRight
                      size={14}
                      className="resource-arrow"
                    />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQSection />
    </>
  );
}