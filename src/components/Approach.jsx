import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Play, CheckCircle2, Sparkles } from "lucide-react";
import "./Approach.css";
import { useTranslation } from "react-i18next";

const ease = [0.16, 1, 0.3, 1];

const points = [
  {
    title: "Evidence Based",
    desc: "Vetted against global medical standards.",
  },
  {
    title: "Culturally Attuned",
    desc: "Tailored to local dietary and family dynamics.",
  },
];

export default function Approach() {
  const { t } = useTranslation();

  return (
    <section id="media" className="editorial-section">
      {/* Background Soft Glow */}
      <div className="editorial-bg-glow" />

      <div className="editorial-container">

        {/* LEFT MEDIA DISPLAY */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="media-editorial-wrapper"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="media-editorial-card"
            >
              <div className="media-viewport">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1400&auto=format&fit=crop"
                  alt={t("Women Healthcare")}
                />

                <div className="media-dark-overlay" />

                {/* PLAY BUTTON */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="play-trigger-btn"
                >
                  <div className="play-aura">
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="play-center"
                    >
                      <Play
                        size={22}
                        fill="#D6457D"
                        className="text-[#D6457D]"
                        style={{ marginLeft: "3px" }}
                      />
                    </motion.div>
                  </div>
                </motion.button>

                {/* FLOATING GLASS STAT WIDGET */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease,
                  }}
                  className="floating-glass-chip"
                >
                  <div className="chip-avatar-group">
                    <div
                      className="chip-avatar"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')`,
                      }}
                    />

                    <div
                      className="chip-avatar"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80')`,
                      }}
                    />

                    <div
                      className="chip-avatar"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80')`,
                      }}
                    />
                  </div>

                  <div>
                    <p className="chip-title">
                      {t("10k+ Women")}
                    </p>

                    <p className="chip-sub">
                      {t("Supported in Pakistan")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </Reveal>

        {/* RIGHT CONTENT SECTION */}
        <Reveal delay={0.08}>
          <div>
            <div className="header-pill">
              <Sparkles size={14} />
              {t("Beyond Medicine")}
            </div>

            <h2 className="header-title">
              {t("A")}{" "}
              <span className="title-accent">
                {t("Human-Centered")}
              </span>{" "}
              {t("Approach")}
            </h2>

            <p className="header-description">
              {t(
                "In Pakistan, women’s health issues are often ignored. We provide holistic care combining medical expertise with emotional wellness."
              )}
            </p>

            {/* INTERACTIVE CARDS */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                staggerChildren: 0.12,
                delayChildren: 0.2,
              }}
              className="editorial-cards-container"
            >
              {points.map((p) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease,
                  }}
                  className="editorial-item-card"
                >
                  <div className="card-icon-badge">
                    <CheckCircle2 size={22} />
                  </div>

                  <div>
                    <h4 className="card-heading">
                      {t(p.title)}
                    </h4>

                    <p className="card-body">
                      {t(p.desc)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}