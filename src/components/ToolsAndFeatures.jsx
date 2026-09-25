import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./ToolsAndFeatures.css";

const DueDateIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <rect x="10" y="14" width="44" height="42" rx="8" stroke="#000" strokeWidth="2.5" />
    <path d="M10 26H54" stroke="#000" strokeWidth="2.5" />
    <rect x="18" y="8" width="6" height="12" rx="3" fill="#F28BB6" />
    <rect x="40" y="8" width="6" height="12" rx="3" fill="#F28BB6" />
    <path d="M32 40C32 40 26 38 26 44C26 48 30 50 32 52C34 50 38 48 38 44C38 38 32 40 32 40Z" fill="#F28BB6" />
    <path d="M10 48H54" stroke="#CCA331" strokeWidth="2.5" strokeDasharray="4 4" />
  </svg>
);

const OvulationIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <path d="M32 14C24 24 10 32 10 42C10 52 20 60 32 60C44 60 54 52 54 42C54 32 40 24 32 14Z" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <path d="M32 20C32 20 18 34 18 42C18 50 24 54 32 54C40 54 46 50 46 42C46 34 32 20 32 20Z" fill="#F28BB6" fillOpacity=".4" stroke="#F28BB6" strokeWidth="1.5" />
    <circle cx="32" cy="42" r="6" fill="#CCA331" stroke="#000" strokeWidth="2" />
  </svg>
);

const RegistryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <rect x="10" y="24" width="44" height="32" rx="6" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <path d="M8 18H56V24H8V18Z" fill="#F28BB6" stroke="#000" strokeWidth="2.5" />
    <path d="M32 18V56" stroke="#000" strokeWidth="2.5" />
    <path d="M32 18C32 18 22 8 16 12C10 16 18 18 32 18Z" fill="#CCA331" stroke="#000" strokeWidth="2" />
    <path d="M32 18C32 18 42 8 48 12C54 16 46 18 32 18Z" fill="#CCA331" stroke="#000" strokeWidth="2" />
  </svg>
);

const BabyProductsIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <path d="M20 20H44L40 50H24L20 20Z" fill="#FFF" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 20C26 12 38 12 38 20" stroke="#F28BB6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="36" r="6" fill="#CCA331" stroke="#000" strokeWidth="1.5" />
    <path d="M28 44H36" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GenderPredictorIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <circle cx="24" cy="30" r="10" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <path d="M24 40V54M18 46H30" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="44" cy="30" r="10" fill="#F28BB6" stroke="#000" strokeWidth="2.5" />
    <path d="M50 24L58 16M58 16H52M58 16V22" stroke="#F28BB6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BabyFeedingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <rect x="22" y="26" width="20" height="32" rx="6" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <rect x="26" y="20" width="12" height="6" fill="#CCA331" stroke="#000" strokeWidth="2" />
    <path d="M29 14C29 11 35 11 35 14V20H29V14Z" fill="#F28BB6" stroke="#000" strokeWidth="1.5" />
    <path d="M22 42H42" stroke="#F28BB6" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

const WeightGainIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <rect x="14" y="20" width="36" height="36" rx="8" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <path d="M22 32C22 26 42 26 42 32" stroke="#000" strokeWidth="2.5" />
    <path d="M32 32L38 26" stroke="#F28BB6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="22" cy="48" r="3" fill="#CCA331" />
    <circle cx="32" cy="48" r="3" fill="#CCA331" />
    <circle cx="42" cy="48" r="3" fill="#CCA331" />
  </svg>
);

const IvfIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <circle cx="32" cy="32" r="18" fill="#FFF" stroke="#000" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="10" fill="#F28BB6" fillOpacity=".4" stroke="#F28BB6" strokeWidth="1.5" />
    <path d="M10 20C18 28 18 36 10 44" stroke="#CCA331" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 20C46 28 46 36 54 44" stroke="#CCA331" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const BirthChartIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="tool-svg">
    <path d="M32 10L38 24L52 26L42 36L46 50L32 42L18 50L22 36L12 26L26 24L32 10Z" fill="#FFF" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="6" fill="#F28BB6" stroke="#000" strokeWidth="1.5" />
    <path d="M32 6V10M32 54V58M6 32H10M54 32H58" stroke="#CCA331" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const toolsData = [
  {
    id: "due-date",
    title: "Due Date Calculator",
    description: "Calculate your estimated delivery date based on your last menstrual period.",
    Illustration: DueDateIcon,
    href: "/due-date-calculator",
  },
  {
    id: "ovulation",
    title: "Ovulation Calculator",
    description: "Identify your peak fertile windows accurately to maximize your chances of conceiving.",
    Illustration: OvulationIcon,
    href: "/ovulation-calculator",
  },
  {
    id: "conceptiondatecalculator",
    title: "Conception Date Calculator",
    description: "Use our Conception Date Calculator to find out the most likely date you conceived your little bundle.",
    Illustration: RegistryIcon,
    href: "/conception-date-calculator",
  },
  {
    id: "baby-products",
    title: "Baby Products",
    description: "Explore clinical and mom-approved essential gear for your baby.",
    Illustration: BabyProductsIcon,
    href: "#baby-products",
  },
  {
    id: "chinese-gender",
    title: "Chinese Gender Predictor",
    description: "A fun traditional chart to predict your baby's gender using birth dates.",
    Illustration: GenderPredictorIcon,
    href: "/chinese-gender-predictor",
  },
  {
    id: "feeding-tracker",
    title: "Baby Feeding Tracker",
    description: "Track nursing sessions, bottle feeds, and daily sleep logs with ease.",
    Illustration: BabyFeedingIcon,
    href: "#feeding-tracker",
  },
  {
    id: "weight-gain",
    title: "Pregnancy Weight Gain Calculator",
    description: "Monitor healthy, trimester-by-trimester weight progress tailored to you.",
    Illustration: WeightGainIcon,
    href: "/pregnancy-weight-gain-calculator",
  },
  {
    id: "ivf-due-date",
    title: "IVF Due Date Calculator",
    description: "Precise date calculations tailored specifically for IVF transfer dates.",
    Illustration: IvfIcon,
    href: "/ivf-due-date-calculator",
  },
  {
    id: "birth-chart",
    title: "Birth Chart Calculator",
    description: "Discover astrological insights and birth alignment details for your newborn.",
    Illustration: BirthChartIcon,
    href: "/birth-chart-calculator",
  },
];

export default function ToolsAndFeatures() {
  const { t, i18n } = useTranslation();

  const isRTL =
    i18n.language?.startsWith("ur") ||
    i18n.language?.startsWith("ar");

  return (
    <section className="tools-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="tools-container">

        <div className="tools-header">
          <span className="tools-tag">
            {t("Interactive Suite")}
          </span>

          <h2 className="tools-title">
            {t("Tools & Features")}
          </h2>

          <p className="tools-subtitle">
            {t(
              "Essential calculators, smart trackers, and helpful tools designed to support your journey."
            )}
          </p>
        </div>

        <div className="tools-bento-grid">
          {toolsData.slice(0, 3).map((item, index) => {
            const IconSVG = item.Illustration;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                className="tool-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <div className="tool-icon-wrapper">
                  <IconSVG />
                </div>

                <h3 className="tool-card-title">
                  {t(item.title)}
                </h3>

                <p className="tool-card-desc">
                  {t(item.description)}
                </p>

                <span className="tool-link-action">
                  <span>{t("Explore Tool")}</span>
                  <ArrowRight size={14} className="tool-arrow" />
                </span>
              </motion.a>
            );
          })}
        </div>

        <div className="tools-explore-wrapper">
          <a href="/resources" className="tools-explore-btn">
            <span>{t("Explore All Tools")}</span>
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}