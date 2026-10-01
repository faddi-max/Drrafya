import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
  Activity,
} from "lucide-react";

import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";

import "./Services.css";

const Services = () => {
  const { t } = useTranslation();

  const serviceBenefits = [
    {
      icon: <HeartPulse size={26} />,
      title: "Minimally invasive",
      description:
        "IUI is a simple fertility treatment that is less invasive than many other assisted reproductive procedures.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Very Cost-effective",
      description:
        "IUI can be a more affordable fertility treatment option for suitable patients.",
    },
    {
      icon: <Activity size={26} />,
      title: "Notable success rates",
      description:
        "IUI may improve the chances of conception for appropriately selected patients.",
    },
    {
      icon: <Users size={26} />,
      title: "Can be combined with other fertility treatments",
      description:
        "IUI can be combined with fertility medicines and monitoring when medically appropriate.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Initial consultations and tests",
      description:
        "Your medical history and fertility needs are reviewed, followed by appropriate examinations and fertility tests.",
    },
    {
      number: "02",
      title: "Ovulation induction and monitoring",
      description:
        "When appropriate, medication may be used to support ovulation while follicle development is monitored.",
    },
    {
      number: "03",
      title: "Sperm preparation",
      description:
        "A semen sample is prepared in the laboratory to select and concentrate suitable sperm.",
    },
    {
      number: "04",
      title: "Intrauterine insemination procedure",
      description:
        "The prepared sperm is carefully placed inside the uterus around the time of ovulation.",
    },
    {
      number: "05",
      title: "Post-procedure care and follow-up appointments",
      description:
        "You receive guidance about aftercare and the appropriate timing for follow-up.",
    },
    {
      number: "06",
      title: "Pregnancy testing and early pregnancy monitoring",
      description:
        "A pregnancy test is performed at the appropriate time, followed by early monitoring when needed.",
    },
  ];

  const reasons = [
    {
      icon: <Stethoscope size={26} />,
      title: "Expertise and experience",
      description:
        "Receive fertility care guided by professional experience and an individualized treatment approach.",
    },
    {
      icon: <Activity size={26} />,
      title: "Personalized treatment",
      description:
        "Your treatment plan is developed according to your individual fertility needs and medical circumstances.",
    },
    {
      icon: <HeartPulse size={26} />,
      title: "Patient-focused approach",
      description:
        "We focus on clear communication, support, and helping you understand each stage of treatment.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Comfort and convenience",
      description:
        "Access specialized fertility care in Sialkot with guidance throughout your treatment journey.",
    },
  ];

  return (
    <main className="services-page">

      {/* ================= HERO ================= */}
      <section className="services-hero">
        <div className="services-container services-hero-grid">

          <div className="services-hero-content">
            <span className="services-eyebrow">
              {t(
                "IUI Treatment in Sialkot",
                "IUI Treatment in Sialkot"
              )}
            </span>

            <h1>
              {t(
                "Innovative and High-Quality IUI Treatment in Sialkot",
                "Innovative and High-Quality IUI Treatment in Sialkot"
              )}
            </h1>

            <p>
              {t(
                "Specialized fertility care designed to support couples on their journey toward parenthood with professional guidance and individualized treatment.",
                "Specialized fertility care designed to support couples on their journey toward parenthood with professional guidance and individualized treatment."
              )}
            </p>

            <div className="services-hero-actions">
              <Link
                to="/book-appointment"
                className="services-primary-btn"
              >
                {t(
                  "Book an Appointment",
                  "Book an Appointment"
                )}
                <ArrowRight size={18} />
              </Link>

              <a
                href="tel:+923217183160"
                className="services-secondary-btn"
              >
                <CalendarDays size={18} />
                {t("Call Us", "Call Us")}
              </a>
            </div>
          </div>

          <div className="services-hero-card">
            <div className="services-hero-card-content">
              <HeartPulse size={34} />

              <strong>
                {t(
                  "Personalized Fertility Care",
                  "Personalized Fertility Care"
                )}
              </strong>

              <span>
                {t(
                  "Professional support throughout your IUI journey.",
                  "Professional support throughout your IUI journey."
                )}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="services-intro">
        <div className="services-container services-two-column">

          <div className="services-intro-image">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
              alt="Fertility consultation"
            />
          </div>

          <div className="services-section-content">
            <span className="services-eyebrow">
              {t("Our Approach", "Our Approach")}
            </span>

            <h2>
              {t(
                "Supporting Your Journey to Parenthood",
                "Supporting Your Journey to Parenthood"
              )}
            </h2>

            <p>
              {t(
                "Every fertility journey is different. Our approach focuses on understanding your individual circumstances and providing appropriate fertility treatment with professional guidance.",
                "Every fertility journey is different. Our approach focuses on understanding your individual circumstances and providing appropriate fertility treatment with professional guidance."
              )}
            </p>

            <p>
              {t(
                "If IUI is suitable for you, we guide you through the treatment process from initial assessment and monitoring through insemination and follow-up.",
                "If IUI is suitable for you, we guide you through the treatment process from initial assessment and monitoring through insemination and follow-up."
              )}
            </p>
          </div>

        </div>
      </section>

      {/* ================= INFERTILITY PROBLEMS ================= */}
      <section className="services-problems">
        <div className="services-container">

          <div className="services-centered-heading">
            <span className="services-eyebrow">
              {t(
                "Understanding Infertility",
                "Understanding Infertility"
              )}
            </span>

            <h2>
              {t(
                "What Are the Common Problems Leading to Infertility?",
                "What Are the Common Problems Leading to Infertility?"
              )}
            </h2>

            <p>
              {t(
                "Infertility can have several possible causes, which is why an individual assessment is important before choosing a treatment.",
                "Infertility can have several possible causes, which is why an individual assessment is important before choosing a treatment."
              )}
            </p>
          </div>

          <div className="services-problem-grid">

            <article className="services-problem-card">
              <HeartPulse size={28} />

              <h3>
                {t(
                  "Ovulation Problems",
                  "Ovulation Problems"
                )}
              </h3>

              <p>
                {t(
                  "Irregular or absent ovulation can affect the chances of natural conception.",
                  "Irregular or absent ovulation can affect the chances of natural conception."
                )}
              </p>
            </article>

            <article className="services-problem-card">
              <Activity size={28} />

              <h3>
                {t(
                  "Sperm-Related Factors",
                  "Sperm-Related Factors"
                )}
              </h3>

              <p>
                {t(
                  "Problems with sperm count, movement, or quality may contribute to difficulty conceiving.",
                  "Problems with sperm count, movement, or quality may contribute to difficulty conceiving."
                )}
              </p>
            </article>

            <article className="services-problem-card">
              <ShieldCheck size={28} />

              <h3>
                {t(
                  "Unexplained Infertility",
                  "Unexplained Infertility"
                )}
              </h3>

              <p>
                {t(
                  "Sometimes routine fertility investigations do not identify a clear cause of infertility.",
                  "Sometimes routine fertility investigations do not identify a clear cause of infertility."
                )}
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ================= IUI INTRO ================= */}
      <section className="services-iui">
        <div className="services-container services-two-column">

          <div className="services-section-content">
            <span className="services-eyebrow">
              {t("IUI Services", "IUI Services")}
            </span>

            <h2>
              {t(
                "IUI Services Now Available in Sialkot",
                "IUI Services Now Available in Sialkot"
              )}
            </h2>

            <p>
              {t(
                "Intrauterine insemination, commonly known as IUI, is a fertility treatment in which prepared sperm is placed directly into the uterus around the time of ovulation.",
                "Intrauterine insemination, commonly known as IUI, is a fertility treatment in which prepared sperm is placed directly into the uterus around the time of ovulation."
              )}
            </p>

            <p>
              {t(
                "Our fertility care is designed to help suitable patients understand their options and receive appropriate treatment based on their individual circumstances.",
                "Our fertility care is designed to help suitable patients understand their options and receive appropriate treatment based on their individual circumstances."
              )}
            </p>

            <Link
              to="/book-appointment"
              className="services-text-btn"
            >
              {t(
                "Book an Appointment",
                "Book an Appointment"
              )}
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="services-iui-image">
            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80"
              alt="IUI fertility treatment"
            />
          </div>

        </div>
      </section>

      {/* ================= WHAT IS IUI ================= */}
      <section className="services-explanation">
        <div className="services-container services-two-column">

          <div className="services-explanation-image">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
              alt="Medical fertility care"
            />
          </div>

          <div className="services-section-content">
            <span className="services-eyebrow">
              {t(
                "Understanding IUI",
                "Understanding IUI"
              )}
            </span>

            <h2>
              {t(
                "What is Artificial Insemination or IUI?",
                "What is Artificial Insemination or IUI?"
              )}
            </h2>

            <p>
              {t(
                "Artificial insemination is a fertility treatment that places prepared sperm directly into the uterus. IUI may be recommended in certain fertility situations after appropriate assessment.",
                "Artificial insemination is a fertility treatment that places prepared sperm directly into the uterus. IUI may be recommended in certain fertility situations after appropriate assessment."
              )}
            </p>

            <div className="services-check-list">

              <div>
                <CheckCircle2 size={20} />

                <span>
                  {t(
                    "Treatment is timed around ovulation.",
                    "Treatment is timed around ovulation."
                  )}
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />

                <span>
                  {t(
                    "Prepared sperm is placed directly into the uterus.",
                    "Prepared sperm is placed directly into the uterus."
                  )}
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />

                <span>
                  {t(
                    "Treatment suitability is assessed individually.",
                    "Treatment suitability is assessed individually."
                  )}
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="services-benefits">
        <div className="services-container">

          <div className="services-centered-heading">
            <span className="services-eyebrow">
              {t(
                "Benefits of IUI",
                "Benefits of IUI"
              )}
            </span>

            <h2>
              {t(
                "Advantages of Artificial Insemination",
                "Advantages of Artificial Insemination"
              )}
            </h2>
          </div>

          <div className="services-benefit-grid">

            {serviceBenefits.map((benefit) => (
              <article
                className="services-benefit-card"
                key={benefit.title}
              >
                <div className="services-benefit-icon">
                  {benefit.icon}
                </div>

                <h3>
                  {t(
                    benefit.title,
                    benefit.title
                  )}
                </h3>

                <p>
                  {t(
                    benefit.description,
                    benefit.description
                  )}
                </p>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="services-process">
        <div className="services-container">

          <div className="services-centered-heading">
            <span className="services-eyebrow">
              {t(
                "Treatment Process",
                "Treatment Process"
              )}
            </span>

            <h2>
              {t(
                "Our Step-by-Step IUI Treatment Process",
                "Our Step-by-Step IUI Treatment Process"
              )}
            </h2>

            <p>
              {t(
                "The exact treatment plan varies according to each patient's medical circumstances.",
                "The exact treatment plan varies according to each patient's medical circumstances."
              )}
            </p>
          </div>

          <div className="services-process-grid">

            {processSteps.map((step) => (
              <article
                className="services-process-card"
                key={step.number}
              >
                <span className="services-process-number">
                  {step.number}
                </span>

                <h3>
                  {t(
                    step.title,
                    step.title
                  )}
                </h3>

                <p>
                  {t(
                    step.description,
                    step.description
                  )}
                </p>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="services-why">
        <div className="services-container">

          <div className="services-centered-heading">
            <span className="services-eyebrow">
              {t(
                "Why Choose Us",
                "Why Choose Us"
              )}
            </span>

            <h2>
              {t(
                "Professional Care Designed Around You",
                "Professional Care Designed Around You"
              )}
            </h2>
          </div>

          <div className="services-why-grid">

            {reasons.map((reason) => (
              <article
                className="services-why-card"
                key={reason.title}
              >
                <div className="services-why-icon">
                  {reason.icon}
                </div>

                <h3>
                  {t(
                    reason.title,
                    reason.title
                  )}
                </h3>

                <p>
                  {t(
                    reason.description,
                    reason.description
                  )}
                </p>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="services-stats">
        <div className="services-container services-stats-grid">

          <div className="services-stat">
            <strong>900+</strong>
            <span>
              {t(
                "IUI Treatments",
                "IUI Treatments"
              )}
            </span>
          </div>

          <div className="services-stat">
            <strong>600+</strong>
            <span>
              {t(
                "C-Sections",
                "C-Sections"
              )}
            </span>
          </div>

          <div className="services-stat">
            <strong>99%</strong>
            <span>
              {t(
                "Success Rate",
                "Success Rate"
              )}
            </span>
          </div>

          <div className="services-stat">
            <strong>500+</strong>
            <span>
              {t(
                "Normal Deliveries",
                "Normal Deliveries"
              )}
            </span>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= FAQ ================= */}
      <FAQSection />

    </main>
  );
};

export default Services;