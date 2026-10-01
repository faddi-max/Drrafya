import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Baby,
  Activity,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Users,
  Hospital,
  Phone,
} from "lucide-react";

import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";

import "./NICUService.css";

const WHATSAPP_URL = "https://wa.me/923217183160";

const featureData = [
  {
    icon: Thermometer,
    title: "Optimized Support",
    description:
      "A controlled environment helps regulate temperature, humidity, and oxygen levels according to the baby's changing needs.",
  },
  {
    icon: Clock3,
    title: "Round-the-clock Care",
    description:
      "The neonatal care team closely monitors premature infants around the clock to identify and manage potential complications.",
  },
  {
    icon: Activity,
    title: "Advanced Equipment",
    description:
      "Specialized incubators, respiratory support systems, and monitoring equipment are used to support the needs of fragile newborns.",
  },
  {
    icon: Users,
    title: "Multidisciplinary Approach",
    description:
      "Gynecologists, pediatricians, neonatologists, and specialized nursing professionals work together to support mothers and newborns.",
  },
  {
    icon: HeartHandshake,
    title: "Family-centered Care",
    description:
      "Families receive updates, guidance, and opportunities for involvement as their baby progresses through neonatal care.",
  },
];

const processData = [
  {
    number: "01",
    title:
      "Assessing the baby's condition and determining treatment",
    description:
      "Upon admission, the neonatal healthcare team examines the baby's medical condition, identifies concerns, and determines the appropriate course of treatment.",
  },
  {
    number: "02",
    title:
      "Stabilization, monitoring, and support in NICUs",
    description:
      "The neonatal team stabilizes fragile newborns and provides ongoing monitoring to track their progress and adjust treatment when necessary.",
  },
  {
    number: "03",
    title:
      "Role of incubators in regulating temperature and humidity",
    description:
      "Incubators help babies with temperature regulation, humidity management, and reduction of outside contaminants while they continue to develop.",
  },
  {
    number: "04",
    title:
      "Importance of a multidisciplinary healthcare team",
    description:
      "Neonatal care may involve doctors, nurses, nutritionists, respiratory therapists, and other specialists working together around the newborn's needs.",
  },
  {
    number: "05",
    title:
      "Family Involvement and Education",
    description:
      "Family involvement, emotional support, education, and guidance help parents understand and participate in their child's care journey.",
  },
];

const reasonsData = [
  {
    icon: Hospital,
    title:
      "Proximity and accessibility for Sialkot residents",
    description:
      "Located in Sialkot, the incubator and NICU facilities are intended to make specialized neonatal care more accessible for local families.",
  },
  {
    icon: ShieldCheck,
    title:
      "Adherence to international standards and protocols",
    description:
      "The source material describes services designed around international standards and best practices in neonatal care.",
  },
  {
    icon: Activity,
    title:
      "Continual enhancement of NICU services",
    description:
      "The service aims to incorporate medical innovations and advancements in neonatology as the field develops.",
  },
  {
    icon: HeartHandshake,
    title:
      "A dedicated and compassionate team of professionals",
    description:
      "The source describes a team that includes neonatologists, specialized nurses, and support staff focused on both medical and emotional needs.",
  },
  {
    icon: Stethoscope,
    title:
      "Long-standing reputation for obstetric and gynecological care",
    description:
      "The source presents Dr. Rafiya as a gynecologist, laparoscopic surgeon, and infertility specialist with experience in women's healthcare.",
  },
];

const galleryData = [
  {
    image:
      "https://drrafiyazahir.com/wp-content/uploads/2023/06/What-are-Incubators.webp",
    alt: "What are incubators",
  },
  {
    image:
      "https://drrafiyazahir.com/wp-content/uploads/2023/06/Incubators-Are-Critical-for-Saving-Babies-Lives.webp",
    alt: "Incubators are critical for saving babies lives",
  },
  {
    image:
      "https://drrafiyazahir.com/wp-content/uploads/2023/06/Round-the-clock-Care-1-1.webp",
    alt: "Round the clock neonatal care",
  },
  {
    image:
      "https://drrafiyazahir.com/wp-content/uploads/2023/06/Advanced-Equipment-1-1.webp",
    alt: "Advanced neonatal equipment",
  },
  {
    image:
      "https://drrafiyazahir.com/wp-content/uploads/2023/06/Family-centered-Care-1-1.webp",
    alt: "Family centered care",
  },
];

function AppointmentButton({ children = "Book an Appointment" }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="nicu-primary-btn"
    >
      <span>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="nicu-section-header">
      {eyebrow && (
        <span className="nicu-eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

export default function NICUService() {
  const { t, i18n } = useTranslation();

  const isRTL =
    i18n.language === "ur" ||
    i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL
      ? "rtl"
      : "ltr";

    document.documentElement.lang =
      i18n.language || "en";

    return () => {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    };
  }, [isRTL, i18n.language]);

  return (
    <main
      className="nicu-page"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="nicu-hero">
        <div className="nicu-container nicu-hero-grid">
          <div className="nicu-hero-content">

            <span className="nicu-eyebrow">
              {t(
                "NICU Services",
                "NICU Services"
              )}
            </span>

            <h1>
              {t(
                "Supporting Newborns with Specialized Care and Expertise",
                "Supporting Newborns with Specialized Care and Expertise"
              )}
            </h1>

            <p className="nicu-hero-lead">
              {t(
                "An Aim To Save Countless infant’s Life With World-Class Incubaters or NICU Service in Sialkot",
                "An Aim To Save Countless infant’s Life With World-Class Incubaters or NICU Service in Sialkot"
              )}
            </p>

            <p className="nicu-hero-description">
              {t(
                "Dr. Rafiya brings advanced incubator and NICU services to Sialkot, providing specialized neonatal care for premature and at-risk newborns in a controlled and supportive environment.",
                "Dr. Rafiya brings advanced incubator and NICU services to Sialkot, providing specialized neonatal care for premature and at-risk newborns in a controlled and supportive environment."
              )}
            </p>

            <div className="nicu-hero-actions">
              <AppointmentButton />

              <a
                href="tel:+923217183160"
                className="nicu-secondary-btn"
              >
                <Phone size={17} />
                <span>
                  {t(
                    "Talk to Us",
                    "Talk to Us"
                  )}
                </span>
              </a>
            </div>

            <div className="nicu-hero-trust">
              <div>
                <CheckCircle2 size={17} />
                <span>
                  {t(
                    "Specialized neonatal care",
                    "Specialized neonatal care"
                  )}
                </span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>
                  {t(
                    "Family-centered approach",
                    "Family-centered approach"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="nicu-hero-visual">
            <div className="nicu-hero-image-wrap">
              <img
                src="https://drrafiyazahir.com/wp-content/uploads/2023/06/An-Aim-To-Save-Countless-infants-Life-With-World-Class-Incubaters-or-NICU-Services-in-Sialkot.webp"
                alt="NICU services in Sialkot"
              />

              <div className="nicu-floating-card">
                <div className="nicu-floating-icon">
                  <Baby size={21} />
                </div>

                <div>
                  <strong>
                    {t(
                      "Newborn Care",
                      "Newborn Care"
                    )}
                  </strong>

                  <span>
                    {t(
                      "Specialized support",
                      "Specialized support"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="nicu-section nicu-intro">
        <div className="nicu-container nicu-intro-grid">

          <div className="nicu-intro-image">
            <img
              src="https://drrafiyazahir.com/wp-content/uploads/2023/06/In-Pakistan-the-mortality-rate-for-newborns-has-been-a-growing-concern-with-many-deaths-attributed-to-insufficient-or-inaccessible-.webp"
              alt="Neonatal intensive care"
              loading="lazy"
            />
          </div>

          <div className="nicu-intro-content">
            <span className="nicu-eyebrow">
              {t(
                "A Haven of Compassion and Expertise",
                "A Haven of Compassion and Expertise"
              )}
            </span>

            <h2>
              {t(
                "NICU Service in Sialkot for Newborns and Premature Babies",
                "NICU Service in Sialkot for Newborns and Premature Babies"
              )}
            </h2>

            <p>
              {t(
                "In Pakistan, the mortality rate for newborns has been a growing concern with many deaths attributed to insufficient, or inaccessible, incubator and Neonatal Intensive Care Unit facilities.",
                "In Pakistan, the mortality rate for newborns has been a growing concern with many deaths attributed to insufficient, or inaccessible, incubator and Neonatal Intensive Care Unit facilities."
              )}
            </p>

            <p>
              {t(
                "Every year, countless newborns face serious challenges when proper neonatal intensive care is not readily accessible. Dr. Rafiya's NICU service in Sialkot is presented as a way for families to access modern neonatal care closer to home.",
                "Every year, countless newborns face serious challenges when proper neonatal intensive care is not readily accessible. Dr. Rafiya's NICU service in Sialkot is presented as a way for families to access modern neonatal care closer to home."
              )}
            </p>

            <AppointmentButton>
              {t(
                "Book an Appointment",
                "Book an Appointment"
              )}
            </AppointmentButton>
          </div>
        </div>
      </section>


      {/* =====================================================
          WHAT ARE INCUBATORS / NICUS
      ====================================================== */}

      <section className="nicu-section nicu-soft-section">
        <div className="nicu-container">

          <SectionHeader
            eyebrow={t(
              "Understanding Neonatal Care",
              "Understanding Neonatal Care"
            )}
            title={t(
              "What are Incubators and Neonatal Intensive Care Units (NICUs)?",
              "What are Incubators and Neonatal Intensive Care Units (NICUs)?"
            )}
            description={t(
              "Incubators and NICUs provide specialized environments for premature or at-risk newborns who require close monitoring and additional support.",
              "Incubators and NICUs provide specialized environments for premature or at-risk newborns who require close monitoring and additional support."
            )}
          />

          <div className="nicu-info-grid">

            <article className="nicu-info-card">
              <div className="nicu-card-icon">
                <Thermometer size={23} />
              </div>

              <h3>
                {t(
                  "Incubators",
                  "Incubators"
                )}
              </h3>

              <p>
                {t(
                  "Incubators are enclosed, regulated chambers designed to maintain a stable temperature and humidity, helping create a controlled environment for newborn growth and development.",
                  "Incubators are enclosed, regulated chambers designed to maintain a stable temperature and humidity, helping create a controlled environment for newborn growth and development."
                )}
              </p>
            </article>

            <article className="nicu-info-card">
              <div className="nicu-card-icon">
                <Activity size={23} />
              </div>

              <h3>
                {t(
                  "Neonatal Intensive Care Units",
                  "Neonatal Intensive Care Units"
                )}
              </h3>

              <p>
                {t(
                  "NICUs are specialized hospital units where newborns with serious health concerns, low birth weight, or a need for close monitoring can receive coordinated medical care.",
                  "NICUs are specialized hospital units where newborns with serious health concerns, low birth weight, or a need for close monitoring can receive coordinated medical care."
                )}
              </p>
            </article>

            <article className="nicu-info-card">
              <div className="nicu-card-icon">
                <HeartHandshake size={23} />
              </div>

              <h3>
                {t(
                  "Specialized Support",
                  "Specialized Support"
                )}
              </h3>

              <p>
                {t(
                  "Premature or sick babies may require specialized medical attention to support stability, monitoring, and recovery during the early stages of life.",
                  "Premature or sick babies may require specialized medical attention to support stability, monitoring, and recovery during the early stages of life."
                )}
              </p>
            </article>

          </div>
        </div>
      </section>


      {/* =====================================================
          WHY NICU IS IMPORTANT
      ====================================================== */}

      <section className="nicu-section">
        <div className="nicu-container nicu-split-grid">

          <div className="nicu-split-content">
            <span className="nicu-eyebrow">
              {t(
                "Why NICU Care Matters",
                "Why NICU Care Matters"
              )}
            </span>

            <h2>
              {t(
                "Why Incubators and NICUs Are Critical for Saving Babies' Lives",
                "Why Incubators and NICUs Are Critical for Saving Babies' Lives"
              )}
            </h2>

            <p>
              {t(
                "Premature or at-risk babies can face respiratory problems, jaundice, infections, unstable metabolism, and other complications.",
                "Premature or at-risk babies can face respiratory problems, jaundice, infections, unstable metabolism, and other complications."
              )}
            </p>

            <p>
              {t(
                "Incubators and NICUs provide a controlled environment, close monitoring, and specialized medical interventions designed around the needs of fragile newborns.",
                "Incubators and NICUs provide a controlled environment, close monitoring, and specialized medical interventions designed around the needs of fragile newborns."
              )}
            </p>

            <div className="nicu-check-list">
              <div>
                <CheckCircle2 size={19} />
                <span>
                  {t(
                    "Close monitoring",
                    "Close monitoring"
                  )}
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  {t(
                    "Specialized interventions",
                    "Specialized interventions"
                  )}
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  {t(
                    "Controlled environment",
                    "Controlled environment"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="nicu-feature-image">
            <img
              src="https://drrafiyazahir.com/wp-content/uploads/2023/06/Incubators-Are-Critical-for-Saving-Babies-Lives.webp"
              alt="Incubators and neonatal care"
              loading="lazy"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          KEY FEATURES
      ====================================================== */}

      <section className="nicu-section nicu-soft-section">
        <div className="nicu-container">

          <SectionHeader
            eyebrow={t(
              "Our NICU Service",
              "Our NICU Service"
            )}
            title={t(
              "Key Features of Our Incubators and NICU Service in Sialkot",
              "Key Features of Our Incubators and NICU Service in Sialkot"
            )}
            description={t(
              "The source material highlights several elements of the neonatal care service, from environmental support to family involvement.",
              "The source material highlights several elements of the neonatal care service, from environmental support to family involvement."
            )}
          />

          <div className="nicu-feature-grid">
            {featureData.map(
              (feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    className="nicu-feature-card"
                    key={feature.title}
                  >
                    <div className="nicu-feature-card-icon">
                      <Icon size={22} />
                    </div>

                    <h3>
                      {t(
                        feature.title,
                        feature.title
                      )}
                    </h3>

                    <p>
                      {t(
                        feature.description,
                        feature.description
                      )}
                    </p>
                  </article>
                );
              }
            )}
          </div>

        </div>
      </section>


      {/* =====================================================
          GALLERY
      ====================================================== */}

      <section className="nicu-section nicu-gallery-section">
        <div className="nicu-container">

          <SectionHeader
            eyebrow={t(
              "Neonatal Care Environment",
              "Neonatal Care Environment"
            )}
            title={t(
              "Specialized Facilities and Family-centered Care",
              "Specialized Facilities and Family-centered Care"
            )}
            description={t(
              "A selection of the imagery provided in the original NICU service material.",
              "A selection of the imagery provided in the original NICU service material."
            )}
          />

          <div className="nicu-gallery">
            {galleryData.map(
              (item, index) => (
                <div
                  className={`nicu-gallery-item nicu-gallery-item-${index + 1}`}
                  key={item.image}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="nicu-section">
        <div className="nicu-container">

          <SectionHeader
            eyebrow={t(
              "The Care Journey",
              "The Care Journey"
            )}
            title={t(
              "What Is the Process of Utilizing Incubators and Our NICU Service in Sialkot?",
              "What Is the Process of Utilizing Incubators and Our NICU Service in Sialkot?"
            )}
            description={t(
              "The source material describes a five-step pathway covering assessment, stabilization, incubator support, multidisciplinary care, and family education.",
              "The source material describes a five-step pathway covering assessment, stabilization, incubator support, multidisciplinary care, and family education."
            )}
          />

          <div className="nicu-process">

            {processData.map(
              (step, index) => (
                <article
                  className="nicu-process-item"
                  key={step.number}
                >
                  <div className="nicu-process-number">
                    {step.number}
                  </div>

                  <div className="nicu-process-content">
                    <span className="nicu-process-label">
                      {t(
                        `STEP (${index + 1})`,
                        `STEP (${index + 1})`
                      )}
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
                  </div>
                </article>
              )
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          CTA BAND
      ====================================================== */}

      <section className="nicu-cta-section">
        <div className="nicu-container">
          <div className="nicu-cta-box">

            <div className="nicu-cta-icon">
              <Baby size={28} />
            </div>

            <div className="nicu-cta-content">
              <span className="nicu-eyebrow">
                {t(
                  "Specialized Newborn Care",
                  "Specialized Newborn Care"
                )}
              </span>

              <h2>
                {t(
                  "Looking for NICU or incubator care in Sialkot?",
                  "Looking for NICU or incubator care in Sialkot?"
                )}
              </h2>

              <p>
                {t(
                  "Connect with the team to discuss your baby's care needs and available neonatal services.",
                  "Connect with the team to discuss your baby's care needs and available neonatal services."
                )}
              </p>
            </div>

            <AppointmentButton>
              {t(
                "Book an Appointment",
                "Book an Appointment"
              )}
            </AppointmentButton>

          </div>
        </div>
      </section>


      {/* =====================================================
          WHY OUR SERVICE
      ====================================================== */}

      <section className="nicu-section nicu-soft-section">
        <div className="nicu-container">

          <SectionHeader
            eyebrow={t(
              "Why Families Choose Accessible NICU Care",
              "Why Families Choose Accessible NICU Care"
            )}
            title={t(
              "Our Infant Incubators and NICU Service in Sialkot",
              "Our Infant Incubators and NICU Service in Sialkot"
            )}
            description={t(
              "The original service material highlights accessibility, standards, continuing development, compassionate professionals, and experience in women's healthcare.",
              "The original service material highlights accessibility, standards, continuing development, compassionate professionals, and experience in women's healthcare."
            )}
          />

          <div className="nicu-reasons-grid">
            {reasonsData.map(
              (reason) => {
                const Icon = reason.icon;

                return (
                  <article
                    className="nicu-reason-card"
                    key={reason.title}
                  >
                    <div className="nicu-reason-icon">
                      <Icon size={21} />
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

                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nicu-card-link"
                    >
                      {t(
                        "Book an Appointment",
                        "Book an Appointment"
                      )}

                      <ArrowRight
                        size={15}
                      />
                    </a>
                  </article>
                );
              }
            )}
          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="nicu-final-cta">
        <div className="nicu-container">
          <div className="nicu-final-cta-inner">

            <div>
              <span className="nicu-eyebrow">
                {t(
                  "Dr. Rafya Zahir",
                  "Dr. Rafya Zahir"
                )}
              </span>

              <h2>
                {t(
                  "Specialized care for mothers and newborns",
                  "Specialized care for mothers and newborns"
                )}
              </h2>

              <p>
                {t(
                  "For questions about neonatal care or available services, contact the clinic directly.",
                  "For questions about neonatal care or available services, contact the clinic directly."
                )}
              </p>
            </div>

            <AppointmentButton>
              {t(
                "Contact Us",
                "Contact Us"
              )}
            </AppointmentButton>

          </div>
        </div>
      </section>


      {/* =====================================================
          EXISTING PROJECT TESTIMONIALS
      ====================================================== */}

      <section className="nicu-existing-section">
        <Testimonials />
      </section>


      {/* =====================================================
          EXISTING PROJECT FAQ
      ====================================================== */}

      <section className="nicu-existing-section nicu-faq-section">
        <FAQSection />
      </section>

    </main>
  );
}