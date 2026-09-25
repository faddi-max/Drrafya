import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import "./Footer.css";
import Drrafyalogo from "../assets/rafyalogo.png";
import { useTranslation } from "react-i18next";

const socials = [
  {
    key: "fb",
    Icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/drrafiyashoaib",
  },
  {
    key: "ig",
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/drrafiyazahir",
  },
  {
    key: "yt",
    Icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@dr.rafiyazahir4639",
  },
  {
    key: "tw",
    Icon: Twitter,
    label: "Twitter",
    href: "https://x.com/Drrafiyazahir",
  },
];

const lifecycleLinks = [
  { label: "Home", href: "#preconception" },
  { label: "IUI Treatment", href: "#pregnancy" },
  { label: "NICU Services", href: "#delivery" },
];

const resourceLinks = [
  { label: "Refund Policy", href: "/refundpolicy" },
  { label: "Privacy Policy", href: "/privacypolcy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [activeSocial, setActiveSocial] = useState(null);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  return (
    <footer
      className="modern-footer"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Ambient Glow */}
      <div className="footer-ambient-bg" />

      <div className="footer-inner">
        {/* MAIN BENTO GRID CONTAINERS */}
        <div className="bento-container">

          {/* Bento Box 1: Brand Header */}
          <div className="bento-box">
            <div>
              <img
                className="footer-logo"
                src={Drrafyalogo}
                alt={t("Dr. Rafiya Zahir")}
              />

              <p className="brand-bio-text">
                {t(
                  "A Lifesaving Choice for Mothers and Babies Utilizing Laparoscopic Technologies with Hundred Percent Satisfaction and No Loss Rate"
                )}
              </p>
            </div>

            {/* Social Links */}
            <div className="socials-row">
              {socials.map(({ key, Icon, label, href }) => {
                const isActive = activeSocial === key;

                return (
                  <motion.a
                    key={key}
                    href={href}
                    aria-label={label}
                    onMouseEnter={() => setActiveSocial(key)}
                    onMouseLeave={() => setActiveSocial(null)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 22,
                    }}
                    className="social-pill"
                    style={{
                      backgroundColor: isActive
                        ? "var(--rich-pink)"
                        : undefined,
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Bento Box 2: Lifecycle Hubs */}
          <div className="bento-box">
            <div>
              <p className="bento-title">
                {t("Quick Links")}
              </p>

              <ul className="bento-nav-list">
                {lifecycleLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      className="nav-item-link"
                      href={item.href}
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 3: Resources */}
          <div className="bento-box">
            <div>
              <p className="bento-title">
                {t("Policies")}
              </p>

              <ul className="bento-nav-list">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      className="nav-item-link"
                      href={item.href}
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 4: Direct Consultation */}
          <div className="bento-box">
            <div>
              <p className="bento-title">
                {t("Consultation")}
              </p>

              <div className="contact-stack">
                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Phone size={18} />
                  </div>

                  <a
                    className="contact-anchor"
                    href="https://wa.me/923217183160"
                  >
                    +92 3217183160
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Mail size={18} />
                  </div>

                  <a
                    className="contact-anchor"
                    href="mailto:clinic@drrafiya.com"
                  >
                    info@drrafiyazahir.com
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <MapPin size={18} />
                  </div>

                  <span>
                    {t(
                      "Darual Shifa Hospital, Tariq Road, Opposite G2 Marques, Sialkot."
                    )}
                  </span>
                </div>
              </div>
            </div>

            <a
              id="book"
              href="#book"
              className="btn-cta-gold"
            >
              <span>{t("Online Consultation")}</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* GIANT EDITORIAL WATERMARK */}
        <div className="brand-watermark-container">
          <p className="brand-watermark-text">
            {t("DR. RAFIYA ZAHIR")}
          </p>
        </div>

        {/* FOOTER BAR / LEGAL */}
        <div className="footer-bar">
          <p>
            © {new Date().getFullYear()}{" "}
            {t("Dr. Rafiya Zahir")}.{" "}
            {t("All rights reserved.")}
          </p>

          <div className="legal-links">
            <a
              href="/privacypolicy"
              className="legal-link"
            >
              {t("Privacy Policy")}
            </a>

            <a
              href="#terms"
              className="legal-link"
            >
              {t("Terms & Conditions")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}