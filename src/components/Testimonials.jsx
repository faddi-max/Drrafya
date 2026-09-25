import { useMemo, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "./Testimonials.css";

const reviews = [
  {
    name: "Tunde O",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    text: "Loft was a breath of fresh air. The apartment was neat, well-furnished, and in a secure area. I stayed for a work trip in Lekki and didn’t want to leave. Great value for money!",
  },
  {
    name: "Chinelo A",
    img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=400&auto=format&fit=crop",
    text: "From check-in to check-out, everything was smooth. The place was so cozy and had this modern vibe. I even hosted a small hangout with friends. Will definitely book again.",
  },
  {
    name: "Idris B.",
    img: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400&auto=format&fit=crop",
    text: "I needed a quiet place to relax and Loft delivered. The location was central, the Wi-Fi was strong, and the host was super responsive. 10/10 experience.",
  },
  {
    name: "Noor M.",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
    text: "Everything felt structured, safe, and supportive throughout my stay. Highly recommended for long term trips!",
  },
  {
    name: "Mariam K.",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
    text: "I felt completely comfortable and home. The layout was clear, simple, and very stylish.",
  },
  {
    name: "Iqra H.",
    img: "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?q=80&w=400&auto=format&fit=crop",
    text: "Communication was calm and professional throughout. Loved the aesthetics and comfort.",
  },
];

const PER_SLIDE_DESKTOP = 3;

function chunk(arr, size) {
  const out = [];

  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }

  return out;
}

export default function Testimonials() {
  const { t, i18n } = useTranslation();

  const slides = useMemo(
    () => chunk(reviews, PER_SLIDE_DESKTOP),
    []
  );

  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  const next = useCallback(() => {
    setDir(1);
    setPage((p) => (p + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDir(-1);
    setPage((p) => (p - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const variants = {
    enter: (d) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (d) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <section
      id="stories"
      className="tm-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="tm-container">
        <Reveal>
          <div className="tm-header">
            <p className="tm-badge">
              {t("Stories of Hope & Recovery")}
            </p>

            <h3 className="tm-title">
              {t("What patients say")}
            </h3>
          </div>
        </Reveal>

        <div className="tm-carousel-wrapper">
          {/* Prev Navigation Button */}
          <button
            type="button"
            onClick={prev}
            aria-label={t("Previous slide")}
            className="tm-nav-btn tm-nav-prev"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next Navigation Button */}
          <button
            type="button"
            onClick={next}
            aria-label={t("Next slide")}
            className="tm-nav-btn tm-nav-next"
          >
            <ChevronRight size={22} />
          </button>

          <div className="tm-viewport">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -90) next();
                  if (info.offset.x > 90) prev();
                }}
              >
                <div className="tm-grid">
                  {slides[page].map((r, idx) => (
                    <div
                      key={r.name}
                      className={`tm-card tm-card-${idx % 3}`}
                    >
                      <div>
                        <div className="tm-profile">
                          <img
                            src={r.img}
                            alt={r.name}
                            className="tm-avatar"
                          />

                          <div className="tm-user-info">
                            <p className="tm-user-name">
                              {r.name}
                            </p>

                            <span className="tm-user-status">
                              {t("Verified Patient")}
                            </span>
                          </div>
                        </div>

                        <p className="tm-quote">
                          {t(r.text)}
                        </p>
                      </div>

                      <div className="tm-quote-icon">
                        <Quote
                          size={28}
                          className="fill-current"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Pagination */}
          <div className="tm-pagination">
            {slides.map((_, i) => {
              const active = i === page;

              return (
                <button
                  key={i}
                  type="button"
                  aria-label={t("Go to slide {{number}}", {
                    number: i + 1,
                  })}
                  onClick={() => {
                    setDir(i > page ? 1 : -1);
                    setPage(i);
                  }}
                  className={`tm-dot ${
                    active
                      ? "tm-dot-active"
                      : "tm-dot-inactive"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}