import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import Rafyalogo from "../assets/rafyalogo.png";

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("Home");

  const [currentLang, setCurrentLang] = useState(
    i18n.language || "en"
  );

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const servicesRef = useRef(null);
  const mobileMenuRef = useRef(null);

  /* ---------------------------------------------
     LANGUAGE
  --------------------------------------------- */

  useEffect(() => {
    if (i18n.language) {
      setCurrentLang(i18n.language);
    }
  }, [i18n.language]);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;

    setCurrentLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  /* ---------------------------------------------
     CLOSE DESKTOP SERVICES DROPDOWN
  --------------------------------------------- */

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ---------------------------------------------
     ESCAPE + SCROLL
  --------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setServicesOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ---------------------------------------------
     BODY SCROLL LOCK
  --------------------------------------------- */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ---------------------------------------------
     MOBILE MENU
  --------------------------------------------- */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const handleMobileNavigation = (tab) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">

          {/* ---------------------------------------
              LOGO
          --------------------------------------- */}

          <Link
            to="/"
            className="navbar-brand"
            onClick={() => setActiveTab("Home")}
          >
            <img
              className="home-logo"
              src={Rafyalogo}
              alt="Dr Rafya Zahir"
            />
          </Link>

          {/* ---------------------------------------
              DESKTOP NAVIGATION
          --------------------------------------- */}

          <nav
            className="navbar-menu desktop-navbar-menu"
            aria-label="Main navigation"
          >
            {/* Home */}
            <Link
              to="/"
              onClick={() => setActiveTab("Home")}
              className={`nav-tab ${
                activeTab === "Home"
                  ? "active"
                  : ""
              }`}
            >
              {t("Home", "Home")}
            </Link>

            {/* Services */}
            <div
              ref={servicesRef}
              className="dropdown-wrapper"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTab("Services");
                  setServicesOpen((value) => !value);
                }}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                className={`nav-tab ${
                  activeTab === "Services"
                    ? "active"
                    : ""
                }`}
              >
                {t("Services", "Services")}

                <ChevronDown
                  size={14}
                  className={`chevron-icon ${
                    servicesOpen ? "rotate" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.18,
                      ease,
                    }}
                    className="dropdown-menu"
                  >
                    {[
                      [
                        t(
                          "General Consultation",
                          "General Consultation"
                        ),
                        t(
                          "Online & in-person visits",
                          "Online & in-person visits"
                        ),
                        "/services/consultation",
                      ],
                      [
                        t(
                          "Specialist Care",
                          "Specialist Care"
                        ),
                        t(
                          "Find certified specialists",
                          "Find certified specialists"
                        ),
                        "/services/specialists",
                      ],
                      [
                        t(
                          "Lab Tests",
                          "Lab Tests"
                        ),
                        t(
                          "Book diagnostic tests at home",
                          "Book diagnostic tests at home"
                        ),
                        "/services/labs",
                      ],
                    ].map(
                      ([title, desc, link]) => (
                        <Link
                          key={title}
                          to={link}
                          onClick={() => {
                            setServicesOpen(false);
                            setActiveTab("Services");
                          }}
                          className="dropdown-item"
                        >
                          <p className="dropdown-item-title">
                            {title}
                          </p>

                          <p className="dropdown-item-desc">
                            {desc}
                          </p>
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Appointment */}
            <Link
              to="/book-appointment"
              onClick={() =>
                setActiveTab("Appointment")
              }
              className={`nav-tab ${
                activeTab === "Appointment"
                  ? "active"
                  : ""
              }`}
            >
              {t("Appointment", "Appointment")}
            </Link>

            {/* Resources */}
            <Link
              to="/resources"
              onClick={() =>
                setActiveTab("Resources")
              }
              className={`nav-tab ${
                activeTab === "Resources"
                  ? "active"
                  : ""
              }`}
            >
              {t("Resources", "Resources")}
            </Link>

            {/* About */}
            <Link
              to="/about"
              onClick={() => setActiveTab("About")}
              className={`nav-tab ${
                activeTab === "About"
                  ? "active"
                  : ""
              }`}
            >
              {t("About", "About")}
            </Link>

            {/* Blogs */}
            <Link
              to="/blogs"
              onClick={() => setActiveTab("Blogs")}
              className={`nav-tab ${
                activeTab === "Blogs"
                  ? "active"
                  : ""
              }`}
            >
              {t("Blogs", "Blogs")}
            </Link>

            {/* Contact */}
            <Link
              to="/contact-us"
              onClick={() =>
                setActiveTab("Contact")
              }
              className={`nav-tab ${
                activeTab === "Contact"
                  ? "active"
                  : ""
              }`}
            >
              {t("Contact", "Contact")}
            </Link>
          </nav>

          {/* ---------------------------------------
              DESKTOP ACTIONS
          --------------------------------------- */}

          <div className="navbar-actions">

            {/* Language */}
            <div className="lang-switcher-wrapper">
              <Globe
                size={15}
                className="lang-icon"
              />

              <select
                className="language-switcher"
                value={currentLang}
                onChange={handleLanguageChange}
                aria-label="Select language"
              >
                <option value="en">
                  English
                </option>

                <option value="ur">
                  اردو
                </option>

                <option value="ar">
                  العربية
                </option>
              </select>
            </div>

            {/* Contact */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact-us"
                className="signup-btn"
                onClick={() =>
                  setActiveTab("Contact")
                }
              >
                {t("Contact Us", "Contact Us")}
              </Link>
            </motion.div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mobile-menu-button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen(
                  (value) => !value
                )
              }
            >
              {mobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------
          MOBILE NAVIGATION OVERLAY
      ------------------------------------------- */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              ref={mobileMenuRef}
              className="mobile-navigation"
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.22,
                ease,
              }}
            >
              {/* Mobile Navigation Header */}
              <div className="mobile-navigation-header">
                <div>
                  <span className="mobile-navigation-label">
                    {t(
                      "Navigation",
                      "Navigation"
                    )}
                  </span>

                  <h2>
                    {t(
                      "Dr. Rafya Zahir",
                      "Dr. Rafya Zahir"
                    )}
                  </h2>
                </div>

                <button
                  type="button"
                  className="mobile-close-button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Links */}
              <nav
                className="mobile-navigation-links"
                aria-label="Mobile navigation"
              >
                {/* Home */}
                <Link
                  to="/"
                  className={`mobile-nav-link ${
                    activeTab === "Home"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "Home"
                    )
                  }
                >
                  {t("Home", "Home")}
                </Link>

                {/* Services */}
                <div className="mobile-services-wrapper">
                  <button
                    type="button"
                    className={`mobile-nav-link mobile-services-button ${
                      activeTab === "Services"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setMobileServicesOpen(
                        (value) => !value
                      )
                    }
                    aria-expanded={
                      mobileServicesOpen
                    }
                  >
                    <span>
                      {t(
                        "Services",
                        "Services"
                      )}
                    </span>

                    <ChevronDown
                      size={18}
                      className={
                        mobileServicesOpen
                          ? "mobile-chevron rotate"
                          : "mobile-chevron"
                      }
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        className="mobile-services-list"
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease,
                        }}
                      >
                        <Link
                          to="/services/consultation"
                          onClick={() =>
                            handleMobileNavigation(
                              "Services"
                            )
                          }
                        >
                          <strong>
                            {t(
                              "General Consultation",
                              "General Consultation"
                            )}
                          </strong>

                          <span>
                            {t(
                              "Online & in-person visits",
                              "Online & in-person visits"
                            )}
                          </span>
                        </Link>

                        <Link
                          to="/services/specialists"
                          onClick={() =>
                            handleMobileNavigation(
                              "Services"
                            )
                          }
                        >
                          <strong>
                            {t(
                              "Specialist Care",
                              "Specialist Care"
                            )}
                          </strong>

                          <span>
                            {t(
                              "Find certified specialists",
                              "Find certified specialists"
                            )}
                          </span>
                        </Link>

                        <Link
                          to="/services/labs"
                          onClick={() =>
                            handleMobileNavigation(
                              "Services"
                            )
                          }
                        >
                          <strong>
                            {t(
                              "Lab Tests",
                              "Lab Tests"
                            )}
                          </strong>

                          <span>
                            {t(
                              "Book diagnostic tests at home",
                              "Book diagnostic tests at home"
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Appointment */}
                <Link
                  to="/book-appointment"
                  className={`mobile-nav-link ${
                    activeTab === "Appointment"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "Appointment"
                    )
                  }
                >
                  {t(
                    "Appointment",
                    "Appointment"
                  )}
                </Link>

                {/* Resources */}
                <Link
                  to="/resources"
                  className={`mobile-nav-link ${
                    activeTab === "Resources"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "Resources"
                    )
                  }
                >
                  {t(
                    "Resources",
                    "Resources"
                  )}
                </Link>

                {/* About */}
                <Link
                  to="/about"
                  className={`mobile-nav-link ${
                    activeTab === "About"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "About"
                    )
                  }
                >
                  {t("About", "About")}
                </Link>

                {/* Blogs */}
                <Link
                  to="/blogs"
                  className={`mobile-nav-link ${
                    activeTab === "Blogs"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "Blogs"
                    )
                  }
                >
                  {t("Blogs", "Blogs")}
                </Link>

                {/* Contact */}
                <Link
                  to="/contact-us"
                  className={`mobile-nav-link ${
                    activeTab === "Contact"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMobileNavigation(
                      "Contact"
                    )
                  }
                >
                  {t("Contact", "Contact")}
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div className="mobile-navigation-footer">
                <Link
                  to="/contact-us"
                  className="mobile-contact-button"
                  onClick={() =>
                    handleMobileNavigation(
                      "Contact"
                    )
                  }
                >
                  {t(
                    "Contact Us",
                    "Contact Us"
                  )}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}