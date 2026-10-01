
import { motion } from "framer-motion";
import { HeartPulse, Baby, Dna } from "lucide-react";
import heroImg from "../assets/hero.png";
import "./Hero.css";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="start" className="hero-section">
      {/* MAIN ROYAL BLUE CONTAINER */}
      <div className="hero-card">

        {/* Abstract Vector Line Overlay */}
        <div className="hero-vector-bg">
          <svg
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="520"
              y="-80"
              width="480"
              height="480"
              rx="160"
              stroke="white"
              strokeWidth="60"
            />
            <rect
              x="700"
              y="120"
              width="550"
              height="550"
              rx="200"
              stroke="white"
              strokeWidth="60"
            />
            <circle
              cx="180"
              cy="380"
              r="280"
              stroke="white"
              strokeWidth="60"
            />
          </svg>
        </div>

        <div className="hero-grid">

          {/* LEFT: HEADLINE + DESCRIPTION + CTA */}
          <div className="hero-left-col">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="hero-title"
            >
              {t(
                "Expert Care for Every Stage of Your Women's Health Journey"
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="hero-description"
            >
              {t(
                "From periods and PCOS to pregnancy, fertility and infertility, Dr. Rafia Zahir provides trusted medical guidance and personalized care for women in Pakistan and around the world."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <a href="#get-started" className="btn-get-started">
                {t("Explore Women's Health")}
              </a>
            </motion.div>
          </div>

          {/* CENTER: DOCTOR PORTRAIT CUTOUT */}
          <div className="hero-center-col">
            <motion.img
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              src={heroImg}
              alt="Doctor"
              className="doctor-img"
            />
          </div>

          {/* RIGHT: RATING BADGE & TAGLINE */}
          <div className="hero-right-col">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="social-badge-box"
            >
              <div className="avatar-pill">
                <div className="avatar-group-images">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                </div>

                <span className="social-count">5.5k</span>
              </div>

              <p className="social-tagline">
                {t("Trusted By Happy Patients For Exceptional Care")}
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* BOTTOM OVERLAPPING SPECIALTY WIDGET */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        className="bottom-widget-container"
      >
        <div className="search-bar-card">

          {/* Field 1: Gynecologist */}
          <div className="field-group">
            <div className="field-icon-box">
              <HeartPulse size={20} />
            </div>

            <div className="field-text-box">
              <span className="field-title-text">
                {t("Specialty")}
              </span>

              <span className="field-main-text">
                {t("Gynecologist")}
              </span>
            </div>
          </div>

          {/* Field 2: Obstetrician */}
          <div className="field-group">
            <div className="field-icon-box">
              <Baby size={20} />
            </div>

            <div className="field-text-box">
              <span className="field-title-text">
                {t("Specialty")}
              </span>

              <span className="field-main-text">
                {t("Obstetrician")}
              </span>
            </div>
          </div>

          {/* Field 3: Fertility & Infertility Specialist */}
          <div className="field-group">
            <div className="field-icon-box">
              <Dna size={20} />
            </div>

            <div className="field-text-box">
              <span className="field-title-text">
                {t("Specialty")}
              </span>

              <span className="field-main-text">
                {t("Fertility & Infertility Specialist")}
              </span>
            </div>
          </div>

          {/* Button */}
          <button className="btn-search-doctor">
            {t("Consult Dr. Rafia")}
          </button>

        </div>
      </motion.div>
    </section>
  );
}
