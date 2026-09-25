import Reveal from "./Reveal";
import { Users, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import "./CommunityCTA.css";
import { useTranslation } from "react-i18next";

export default function CommunityCTA() {
  const { t, i18n } = useTranslation();

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  return (
    <section
      id="community"
      className="cm-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle Background Glows */}
      <div className="cm-glow cm-glow-left" />
      <div className="cm-glow cm-glow-right" />

      <div className="cm-container">
        <Reveal>
          <div className="cm-card">
            {/* Top Badge */}
            <div className="cm-badge-wrapper">
              <span className="cm-badge-dot" />
              <p className="cm-badge">{t("COMMUNITY")}</p>
            </div>

            {/* Heading */}
            <h3 className="cm-title">
              {t("Where Community Meets")}{" "}
              <span className="cm-title-accent">
                {t("Expertise")}
              </span>
            </h3>

            {/* Subtitle */}
            <p className="cm-description">
              {t(
                "Join a dedicated space where women support women—guided by expert knowledge, real resources, and meaningful connection."
              )}
            </p>

            {/* Feature Highlights Grid */}
            <div className="cm-features">
              <div className="cm-feature-pill">
                <Users className="cm-feature-icon" size={16} />
                <span>{t("Peer Support")}</span>
              </div>

              <div className="cm-feature-pill">
                <Sparkles className="cm-feature-icon" size={16} />
                <span>{t("Expert Guidance")}</span>
              </div>

              <div className="cm-feature-pill">
                <ShieldCheck className="cm-feature-icon" size={16} />
                <span>{t("Private Groups")}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="cm-action">
              <a
                href="https://wa.me/923217183160"
                className="cm-cta-btn"
              >
                <span>{t("Join Our Community")}</span>
                <ArrowRight
                  size={18}
                  className="cm-btn-icon"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}