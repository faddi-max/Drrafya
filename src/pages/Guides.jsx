import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  X,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";

import guidesData from "../data/guides.json";

import "./Guides.css";

export default function Guides() {
  const { t, i18n } = useTranslation();

  const [selectedGuide, setSelectedGuide] = useState(null);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  const openDownloadModal = (guide) => {
    if (!guide.downloadUrl) {
      return;
    }

    setSelectedGuide(guide);
    setEmail("");
    setWhatsapp("");
  };

  const closeDownloadModal = () => {
    if (isDownloading) {
      return;
    }

    setSelectedGuide(null);
    setEmail("");
    setWhatsapp("");
  };

  useEffect(() => {
    if (!selectedGuide) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDownloadModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedGuide, isDownloading]);

  const handleDownload = async (event) => {
    event.preventDefault();

    if (!selectedGuide?.downloadUrl) {
      return;
    }

    if (!email.trim() || !whatsapp.trim()) {
      return;
    }

    setIsDownloading(true);

    try {
      /*
       * The download URL comes directly from guides.json.
       *
       * We create a temporary anchor and trigger it programmatically.
       * This works for files hosted on your own domain and for servers
       * that allow browser downloads.
       */

      const link = document.createElement("a");

      link.href = selectedGuide.downloadUrl;
      link.download = "";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      link.remove();

      /*
       * Small delay gives the browser time to start the download
       * before closing the modal.
       */
      setTimeout(() => {
        setIsDownloading(false);
        setSelectedGuide(null);
        setEmail("");
        setWhatsapp("");
      }, 700);
    } catch (error) {
      console.error("Guide download failed:", error);
      setIsDownloading(false);
    }
  };

  return (
    <>
      <main
        className="guides-page"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <section className="guides-section">
          <div className="guides-container">

            {/* =========================
                HEADER
            ========================= */}

            <motion.header
              className="guides-header"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <span className="guides-tag">
                {t(
                  "RESOURCE CENTER",
                  "RESOURCE CENTER"
                )}
              </span>

              <h1 className="guides-title">
                {t(
                  "Download Our Guides",
                  "Download Our Guides"
                )}
              </h1>

              <p className="guides-subtitle">
                {t(
                  "Access comprehensive guides, technical specifications, and visual collections curated for professionals and enthusiasts alike.",
                  "Access comprehensive guides, technical specifications, and visual collections curated for professionals and enthusiasts alike."
                )}
              </p>
            </motion.header>

            {/* =========================
                GUIDES GRID
            ========================= */}

            <div className="guides-grid">
              {guidesData.map((guide, index) => (
                <motion.article
                  key={guide.id}
                  className="guide-card"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(
                      index * 0.07,
                      0.4
                    ),
                  }}
                >
                  <div className="guide-image-wrapper">
                    <img
                      src={guide.image}
                      alt={t(
                        guide.title,
                        guide.title
                      )}
                      className="guide-image"
                      loading="lazy"
                    />

                    <div className="guide-image-badge">
                      {t("Guide", "Guide")}
                    </div>
                  </div>

                  <div className="guide-card-content">
                    <h2 className="guide-card-title">
                      {t(
                        guide.title,
                        guide.title
                      )}
                    </h2>

                    <p className="guide-card-description">
                      {t(
                        guide.description,
                        guide.description
                      )}
                    </p>

                    <div className="guide-card-footer">
                      <button
                        type="button"
                        className={`guide-download-action ${
                          !guide.downloadUrl
                            ? "guide-download-disabled"
                            : ""
                        }`}
                        onClick={() =>
                          openDownloadModal(guide)
                        }
                        disabled={
                          !guide.downloadUrl
                        }
                      >
                        <span>
                          {t(
                            "Download",
                            "Download"
                          )}
                        </span>

                        <Download
                          size={16}
                          className="guide-download-icon"
                        />

                        <ArrowRight
                          size={15}
                          className="guide-arrow"
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          DOWNLOAD MODAL
      ========================= */}

      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            className="guide-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                closeDownloadModal();
              }
            }}
          >
            <motion.div
              className="guide-download-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-download-title"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* CLOSE */}

              <button
                type="button"
                className="guide-modal-close"
                onClick={closeDownloadModal}
                disabled={isDownloading}
                aria-label={t(
                  "Close",
                  "Close"
                )}
              >
                <X size={19} />
              </button>

              {/* MODAL TOP */}

              <div className="guide-modal-top">
                <div className="guide-modal-icon">
                  <Download size={22} />
                </div>

                <span className="guide-modal-kicker">
                  {t(
                    "FREE GUIDE",
                    "FREE GUIDE"
                  )}
                </span>

                <h2
                  id="guide-download-title"
                  className="guide-modal-title"
                >
                  {t(
                    "Download Guides",
                    "Download Guides"
                  )}
                </h2>

                <p className="guide-modal-description">
                  {t(
                    "Enter your details and get the file instantly.",
                    "Enter your details and get the file instantly."
                  )}
                </p>
              </div>

              {/* SELECTED GUIDE */}

              <div className="guide-modal-selected">
                <img
                  src={selectedGuide.image}
                  alt=""
                  className="guide-modal-selected-image"
                />

                <div>
                  <span>
                    {t("Selected Guide", "Selected Guide")}
                  </span>

                  <strong>
                    {t(
                      selectedGuide.title,
                      selectedGuide.title
                    )}
                  </strong>
                </div>
              </div>

              {/* FORM */}

              <form
                className="guide-download-form"
                onSubmit={handleDownload}
              >
                <div className="guide-form-field">
                  <label htmlFor="guide-email">
                    {t(
                      "Email Address",
                      "Email Address"
                    )}
                  </label>

                  <div className="guide-input-wrapper">
                    <Mail size={17} />

                    <input
                      id="guide-email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder={t(
                        "Enter your email address",
                        "Enter your email address"
                      )}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="guide-form-field">
                  <label htmlFor="guide-whatsapp">
                    {t(
                      "WhatsApp Number",
                      "WhatsApp Number"
                    )}
                  </label>

                  <div className="guide-input-wrapper">
                    <Phone size={17} />

                    <input
                      id="guide-whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(event) =>
                        setWhatsapp(event.target.value)
                      }
                      placeholder={t(
                        "Enter your WhatsApp number",
                        "Enter your WhatsApp number"
                      )}
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="guide-modal-download-btn"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <span className="guide-download-spinner" />

                      <span>
                        {t(
                          "Preparing Download...",
                          "Preparing Download..."
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {t(
                          "Download Now",
                          "Download Now"
                        )}
                      </span>

                      <Download size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* SECURITY */}

              <div className="guide-modal-security">
                <ShieldCheck size={16} />

                <span>
                  {t(
                    "100% Secure & Private",
                    "100% Secure & Private"
                  )}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Testimonials />
      <FAQSection />
    </>
  );
}