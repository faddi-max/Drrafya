import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

import questionsData from "../data/pregnancyQuestions.json";

import "./PregnancyQuestionsCenter.css";

export default function PregnancyQuestionsCenter() {
  const { t, i18n } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  /* ==========================================
     FILTER QUESTIONS
     ========================================== */

  const filteredQuestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return questionsData;
    }

    return questionsData.filter((item) => {
      const searchableText = [
        item.question,
        item.description,
        item.category,
        item.slug,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchTerm]);

  /* ==========================================
     VISIBLE QUESTIONS
     ========================================== */

  const visibleQuestions = filteredQuestions.slice(
    0,
    visibleCount
  );

  /* ==========================================
     LOAD MORE
     ========================================== */

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + 8, filteredQuestions.length)
    );
  };

  /* ==========================================
     SEARCH CHANGE
     ========================================== */

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setVisibleCount(8);
  };

  /* ==========================================
     CLEAR SEARCH
     ========================================== */

  const handleClearSearch = () => {
    setSearchTerm("");
    setVisibleCount(8);
  };

  return (
    <>
      <main
        className="question-center-page"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <section className="question-center-section">
          <div className="question-center-container">

            {/* ==========================================
                HEADER
                ========================================== */}

            <motion.div
              className="question-center-header"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <span className="question-center-tag">
                {t(
                  "Question Center",
                  "Question Center"
                )}
              </span>

              <h1 className="question-center-title">
                {t(
                  "Pregnancy Questions Center",
                  "Pregnancy Questions Center"
                )}
              </h1>

              <p className="question-center-subtitle">
                {t(
                  "Find clear, helpful answers to common pregnancy and women's health questions. Search our question library and explore helpful information in one place.",
                  "Find clear, helpful answers to common pregnancy and women's health questions. Search our question library and explore helpful information in one place."
                )}
              </p>
            </motion.div>

            {/* ==========================================
                SEARCH
                ========================================== */}

            <motion.div
              className="question-search-wrapper"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.08,
              }}
            >
              <Search
                size={19}
                className="question-search-icon"
              />

              <input
                type="search"
                className="question-search-input"
                value={searchTerm}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                placeholder={t(
                  "Search pregnancy questions...",
                  "Search pregnancy questions..."
                )}
                aria-label={t(
                  "Search pregnancy questions",
                  "Search pregnancy questions"
                )}
              />

              {searchTerm && (
                <button
                  type="button"
                  className="question-search-clear"
                  onClick={handleClearSearch}
                  aria-label={t(
                    "Clear search",
                    "Clear search"
                  )}
                >
                  ×
                </button>
              )}
            </motion.div>

            {/* ==========================================
                RESULTS COUNT
                ========================================== */}

            <div className="question-results-info">
              {searchTerm
                ? `${filteredQuestions.length} ${t(
                    "questions found",
                    "questions found"
                  )}`
                : `${questionsData.length} ${t(
                    "questions",
                    "questions"
                  )}`}
            </div>

            {/* ==========================================
                QUESTION CARDS
                ========================================== */}

            {visibleQuestions.length > 0 ? (
              <>
                <div className="question-center-grid">
                  {visibleQuestions.map((item, index) => (
                    <motion.article
                      key={item.id}
                      className="question-card"
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(
                          index * 0.04,
                          0.2
                        ),
                      }}
                    >
                      {/* IMAGE */}

                      <div
                        className="question-card-background"
                        style={{
                          backgroundImage: `url("${item.image}")`,
                        }}
                      />

                      {/* IMAGE TINT */}

                      <div className="question-card-image-tint" />

                      {/* QUESTION */}

                      <div className="question-card-question-wrap">
                        <h2 className="question-card-question">
                          {t(
                            item.question,
                            item.question
                          )}
                        </h2>
                      </div>

                      {/* HOVER CONTENT */}

                      <div className="question-card-hover">
                        <div className="question-card-hover-inner">

                          <p className="question-card-description">
                            {t(
                              item.description,
                              item.description
                            )}
                          </p>

                          <Link
                            to={`/pregnancyquestionscenter/${item.slug}`}
                            className="question-more-btn"
                          >
                            <span>
                              {t(
                                "More Info",
                                "More Info"
                              )}
                            </span>

                            <ArrowRight
                              size={14}
                              className="question-more-arrow"
                            />
                          </Link>

                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* ==========================================
                    LOAD MORE
                    ALWAYS VISIBLE
                    ========================================== */}

                <div className="question-load-more-wrapper">
                  <button
                    type="button"
                    className="question-load-more-btn"
                    onClick={handleLoadMore}
                  >
                    <span>
                      {t(
                        "Load More Questions",
                        "Load More Questions"
                      )}
                    </span>

                    <ArrowRight
                      size={16}
                      className="question-load-more-arrow"
                    />
                  </button>
                </div>
              </>
            ) : (
              /* ==========================================
                 NO RESULTS
                 ========================================== */

              <div className="question-state">
                <Search size={30} />

                <h3>
                  {t(
                    "No questions found",
                    "No questions found"
                  )}
                </h3>

                <p>
                  {t(
                    "Try searching with a different keyword.",
                    "Try searching with a different keyword."
                  )}
                </p>

                <button
                  type="button"
                  onClick={handleClearSearch}
                >
                  {t(
                    "View All Questions",
                    "View All Questions"
                  )}
                </button>
              </div>
            )}

          </div>
        </section>
      </main>

      {/* ==========================================
          TESTIMONIALS
          ========================================== */}

      <Testimonials />

      {/* ==========================================
          FAQ
          ========================================== */}

      <FAQSection />
    </>
  );
}