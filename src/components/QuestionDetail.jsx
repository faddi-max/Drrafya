import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./QuestionDetail.css";

export default function QuestionDetail() {
  const { t, i18n } = useTranslation();

  const isRTL =
    i18n.language === "ur" ||
    i18n.language === "ar";

  return (
    <main
      className="question-detail-page"
      dir={isRTL ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <div className="question-detail-container">

        {/* Breadcrumb */}
        <nav
          className="question-breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link to="/">
            {t("Home", "Home")}
          </Link>

          <ChevronRight size={15} />

          <Link to="/pregnancyquestionscenter">
            {t(
              "Pregnancy Questions",
              "Pregnancy Questions"
            )}
          </Link>

          <ChevronRight size={15} />

          <span>
            {t(
              "Can You Drink Wine While Pregnant?",
              "Can You Drink Wine While Pregnant?"
            )}
          </span>
        </nav>

        {/* Article */}
        <article className="question-article">

          {/* Header */}
          <header className="question-article-header">
            <span className="question-detail-tag">
              {t("Pregnancy", "Pregnancy")}
            </span>

            <h1>
              {t(
                "Can You Drink Wine While Pregnant?",
                "Can You Drink Wine While Pregnant?"
              )}
            </h1>

            <p className="question-article-intro">
              {t(
                "Understanding what is safe to eat and drink during pregnancy can be confusing. Here is what you should know about alcohol and pregnancy.",
                "Understanding what is safe to eat and drink during pregnancy can be confusing. Here is what you should know about alcohol and pregnancy."
              )}
            </p>
          </header>

          {/* Featured Image */}
          <div className="question-featured-image">
            <img
              src="https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&w=1400&q=85"
              alt={t(
                "Pregnancy health",
                "Pregnancy health"
              )}
            />
          </div>

          {/* Article Content */}
          <div className="question-article-content">

            <section className="question-content-section">
              <h2>
                {t(
                  "Can Pregnant Women Drink Wine?",
                  "Can Pregnant Women Drink Wine?"
                )}
              </h2>

              <p>
                {t(
                  "Alcohol consumption during pregnancy is a common concern for expecting mothers. Questions often arise about whether an occasional glass of wine is safe.",
                  "Alcohol consumption during pregnancy is a common concern for expecting mothers. Questions often arise about whether an occasional glass of wine is safe."
                )}
              </p>

              <p>
                {t(
                  "Current medical guidance recommends avoiding alcohol during pregnancy because alcohol can cross the placenta and reach the developing baby.",
                  "Current medical guidance recommends avoiding alcohol during pregnancy because alcohol can cross the placenta and reach the developing baby."
                )}
              </p>
            </section>

            <section className="question-content-section">
              <h2>
                {t(
                  "Is Wine During Pregnancy Safe?",
                  "Is Wine During Pregnancy Safe?"
                )}
              </h2>

              <p>
                {t(
                  "There is no established amount of alcohol that has been proven to be completely safe during pregnancy. Because individual responses can vary, avoiding alcohol is the safest approach.",
                  "There is no established amount of alcohol that has been proven to be completely safe during pregnancy. Because individual responses can vary, avoiding alcohol is the safest approach."
                )}
              </p>

              <p>
                {t(
                  "If you have consumed alcohol before realizing you were pregnant, speak with your healthcare provider. They can discuss your situation and provide appropriate guidance.",
                  "If you have consumed alcohol before realizing you were pregnant, speak with your healthcare provider. They can discuss your situation and provide appropriate guidance."
                )}
              </p>
            </section>

            <section className="question-content-section">
              <h2>
                {t(
                  "Risks of Drinking Alcohol During Pregnancy",
                  "Risks of Drinking Alcohol During Pregnancy"
                )}
              </h2>

              <p>
                {t(
                  "Alcohol exposure during pregnancy can affect fetal development. The risks can depend on factors such as the amount consumed, frequency of consumption, and stage of pregnancy.",
                  "Alcohol exposure during pregnancy can affect fetal development. The risks can depend on factors such as the amount consumed, frequency of consumption, and stage of pregnancy."
                )}
              </p>

              <p>
                {t(
                  "Alcohol exposure is associated with fetal alcohol spectrum disorders, which can affect physical development, learning, behavior, and other aspects of health.",
                  "Alcohol exposure is associated with fetal alcohol spectrum disorders, which can affect physical development, learning, behavior, and other aspects of health."
                )}
              </p>
            </section>

            <section className="question-content-section">
              <h2>
                {t(
                  "What Should You Do?",
                  "What Should You Do?"
                )}
              </h2>

              <p>
                {t(
                  "If you are pregnant or trying to conceive, avoiding alcoholic beverages is the safest choice.",
                  "If you are pregnant or trying to conceive, avoiding alcoholic beverages is the safest choice."
                )}
              </p>

              <p>
                {t(
                  "If avoiding alcohol is difficult, talk openly with your healthcare provider. Professional support can help you find a safe and practical way forward.",
                  "If avoiding alcohol is difficult, talk openly with your healthcare provider. Professional support can help you find a safe and practical way forward."
                )}
              </p>
            </section>

            {/* Medical Note */}
            <div className="question-medical-note">
              <strong>
                {t("Medical Note", "Medical Note")}
              </strong>

              <p>
                {t(
                  "This information is for educational purposes and should not replace advice, diagnosis, or treatment from a qualified healthcare professional.",
                  "This information is for educational purposes and should not replace advice, diagnosis, or treatment from a qualified healthcare professional."
                )}
              </p>
            </div>

          </div>
        </article>

        {/* Back */}
        <div className="question-detail-footer">
          <Link
            to="/pregnancyquestionscenter"
            className="question-back-btn"
          >
            {isRTL ? (
              <ArrowRight size={17} />
            ) : (
              <ArrowLeft size={17} />
            )}

            {t(
              "Back to Questions",
              "Back to Questions"
            )}
          </Link>
        </div>

      </div>
    </main>
  );
}