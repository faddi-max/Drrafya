import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import Rafyalogo from "../assets/rafyalogo.png";

const ease = [0.22, 1, 0.36, 1];

const serviceItems = [
  {
    title: "General Consultation",
    description: "Online & in-person visits",
    href: "/services/consultation",
  },
  {
    title: "Specialist Care",
    description: "Find certified specialists",
    href: "/services/specialists",
  },
  {
    title: "Lab Tests",
    description: "Book diagnostic tests at home",
    href: "/services/labs",
  },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("Home");

  const [currentLang, setCurrentLang] = useState(
    i18n.language || "en"
  );

  const [servicesOpen, setServicesOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const servicesRef = useRef(null);

  /* --------------------------------------------------
     LANGUAGE
  -------------------------------------------------- */

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

  /* --------------------------------------------------
     DESKTOP SERVICES DROPDOWN
  -------------------------------------------------- */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
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

  /* --------------------------------------------------
     ESCAPE KEY
  -------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* --------------------------------------------------
     BODY SCROLL LOCK WHEN MOBILE MENU IS OPEN
  -------------------------------------------------- */

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

  /* --------------------------------------------------
     CLOSE MOBILE MENU
  -------------------------------------------------- */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const handleMobileLink = (tab) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  /* --------------------------------------------------
     TRANSLATED SERVICE DATA
  -------------------------------------------------- */

  const translatedServices = serviceItems.map(
    (service) => ({
      ...service,
      title: t(service.title, service.title),
      description: t(
        service.description,
        service.description
      ),
    })
  );

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar-header">
        <div className="navbar-container">

          {/* ---------------------------------------------
              LOGO
          --------------------------------------------- */}

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

          {/* ---------------------------------------------
              DESKTOP NAVIGATION
          --------------------------------------------- */}

          <nav
            className="navbar-menu desktop-navbar-menu"
            aria-label="Main navigation"
          >
            {/* HOME */}

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

            {/* SERVICES */}

            <div
              ref={servicesRef}
              className="dropdown-wrapper"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTab("Services");
                  setServicesOpen(
                    (value) => !value
                  );
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
                    servicesOpen
                      ? "rotate"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 14,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 14,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.2,
                      ease,
                    }}
                    className="dropdown-menu"
                  >
                    {translatedServices.map(
                      (service) => (
                        <Link
                          key={service.title}
                          to={service.href}
                          onClick={() => {
                            setServicesOpen(false);
                            setActiveTab(
                              "Services"
                            );
                          }}
                          className="dropdown-item"
                        >
                          <p className="dropdown-item-title">
                            {service.title}
                          </p>

                          <p className="dropdown-item-desc">
                            {service.description}
                          </p>
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* APPOINTMENT */}

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
              {t(
                "Appointment",
                "Appointment"
              )}
            </Link>

            {/* RESOURCES */}

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
              {t(
                "Resources",
                "Resources"
              )}
            </Link>

            {/* ABOUT */}

            <Link
              to="/about"
              onClick={() =>
                setActiveTab("About")
              }
              className={`nav-tab ${
                activeTab === "About"
                  ? "active"
                  : ""
              }`}
            >
              {t("About", "About")}
            </Link>

            {/* BLOGS */}

            <Link
              to="/blogs"
              onClick={() =>
                setActiveTab("Blogs")
              }
              className={`nav-tab ${
                activeTab === "Blogs"
                  ? "active"
                  : ""
              }`}
            >
              {t("Blogs", "Blogs")}
            </Link>

            {/* CONTACT */}

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

          {/* ---------------------------------------------
              DESKTOP ACTIONS
          --------------------------------------------- */}

          <div className="navbar-actions">

            {/* LANGUAGE */}

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

            {/* CONTACT */}

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                to="/contact-us"
                className="signup-btn"
                onClick={() =>
                  setActiveTab("Contact")
                }
              >
                {t(
                  "Contact Us",
                  "Contact Us"
                )}
              </Link>
            </motion.div>

            {/* -----------------------------------------
                MOBILE HAMBURGER

                This remains hidden on desktop.
                On tablet/mobile this becomes the
                primary navigation trigger.
            ----------------------------------------- */}

            <button
              type="button"
              className={`mobile-menu-btn ${
                mobileMenuOpen
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setMobileMenuOpen(
                  (value) => !value
                )
              }
              aria-label={
                mobileMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={
                mobileMenuOpen
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          MOBILE FULL SCREEN MENU
      ================================================= */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
          >
            {/* MOBILE MENU HEADER */}

            <div className="mobile-menu-header">
              <Link
                to="/"
                className="mobile-menu-logo"
                onClick={() =>
                  handleMobileLink("Home")
                }
              >
                <img
                  src={Rafyalogo}
                  alt="Dr Rafya Zahir"
                />

                <span>
                  Dr. Rafya Zahir
                </span>
              </Link>

              <button
                type="button"
                className="mobile-menu-close"
                onClick={
                  closeMobileMenu
                }
                aria-label="Close navigation"
              >
                <span />
                <span />
              </button>
            </div>

            {/* MOBILE NAVIGATION */}

            <nav
              className="mobile-menu-nav"
              aria-label="Mobile navigation"
            >
              {/* HOME */}

              <Link
                to="/"
                className={`mobile-menu-link ${
                  activeTab === "Home"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "Home"
                  )
                }
              >
                {t("Home", "Home")}
              </Link>

              {/* SERVICES */}

              <div className="mobile-services-container">
                <button
                  type="button"
                  className={`mobile-menu-link mobile-services-toggle ${
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
                    size={20}
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
                      className="mobile-dropdown"
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
                        duration: 0.3,
                        ease,
                      }}
                    >
                      {translatedServices.map(
                        (service) => (
                          <Link
                            key={service.title}
                            to={service.href}
                            onClick={() =>
                              handleMobileLink(
                                "Services"
                              )
                            }
                            className="mobile-dropdown-item"
                          >
                            <span>
                              {
                                service.title
                              }
                            </span>

                            <small>
                              {
                                service.description
                              }
                            </small>
                          </Link>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* APPOINTMENT */}

              <Link
                to="/book-appointment"
                className={`mobile-menu-link ${
                  activeTab ===
                  "Appointment"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "Appointment"
                  )
                }
              >
                {t(
                  "Appointment",
                  "Appointment"
                )}
              </Link>

              {/* RESOURCES */}

              <Link
                to="/resources"
                className={`mobile-menu-link ${
                  activeTab === "Resources"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "Resources"
                  )
                }
              >
                {t(
                  "Resources",
                  "Resources"
                )}
              </Link>

              {/* ABOUT */}

              <Link
                to="/about"
                className={`mobile-menu-link ${
                  activeTab === "About"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "About"
                  )
                }
              >
                {t(
                  "About",
                  "About"
                )}
              </Link>

              {/* BLOGS */}

              <Link
                to="/blogs"
                className={`mobile-menu-link ${
                  activeTab === "Blogs"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "Blogs"
                  )
                }
              >
                {t("Blogs", "Blogs")}
              </Link>

              {/* CONTACT */}

              <Link
                to="/contact-us"
                className={`mobile-menu-link ${
                  activeTab === "Contact"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMobileLink(
                    "Contact"
                  )
                }
              >
                {t(
                  "Contact",
                  "Contact"
                )}
              </Link>
            </nav>

            {/* MOBILE BOTTOM AREA */}

            <div className="mobile-menu-bottom">

              {/* LANGUAGE */}

              <div className="mobile-language">
                <Globe size={18} />

                <select
                  value={currentLang}
                  onChange={
                    handleLanguageChange
                  }
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

              {/* CONTACT CTA */}

              <Link
                to="/contact-us"
                className="mobile-contact-btn"
                onClick={() =>
                  handleMobileLink(
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
        )}
      </AnimatePresence>
    </>
  );
}