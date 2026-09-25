import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import Rafyalogo from "../assets/rafyalogo.png";

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(
    i18n.language || "en"
  );

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

  // Services dropdown
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onDoc);

    return () => {
      document.removeEventListener("mousedown", onDoc);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
      }
    };

    const onScroll = () => {
      setServicesOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar-container">

        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <img
            className="home-logo"
            src={Rafyalogo}
            alt="Dr Rafya Zahir"
          />
        </Link>

        {/* Center Navigation */}
        <nav className="navbar-menu">

          {/* Home */}
          <Link
            to="/"
            onClick={() => setActiveTab("Home")}
            className={`nav-tab ${
              activeTab === "Home" ? "active" : ""
            }`}
          >
            {t("Home", "Home")}
          </Link>

          {/* Services Dropdown */}
          <div
            ref={servicesRef}
            className="dropdown-wrapper"
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab("Services");
                setServicesOpen((v) => !v);
              }}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              className={`nav-tab ${
                activeTab === "Services" ? "active" : ""
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
                  ].map(([title, desc, link]) => (
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
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Appointment */}
          <Link
            to="/book-appointment"
            onClick={() => setActiveTab("Appointment")}
            className={`nav-tab ${
              activeTab === "Appointment" ? "active" : ""
            }`}
          >
            {t("Appointment", "Appointment")}
          </Link>

          {/* Resources */}
          <Link
            to="/resources"
            onClick={() => setActiveTab("Resources")}
            className={`nav-tab ${
              activeTab === "Resources" ? "active" : ""
            }`}
          >
            {t("Resources", "Resources")}
          </Link>

          {/* About */}
          <Link
            to="/about"
            onClick={() => setActiveTab("About")}
            className={`nav-tab ${
              activeTab === "About" ? "active" : ""
            }`}
          >
            {t("About", "About")}
          </Link>

          {/* Blogs */}
          <Link
            to="/blogs"
            onClick={() => setActiveTab("Blogs")}
            className={`nav-tab ${
              activeTab === "Blogs" ? "active" : ""
            }`}
          >
            {t("Blogs", "Blogs")}
          </Link>

          {/* Contact */}
          <Link
            to="/contact-us"
            onClick={() => setActiveTab("Contact")}
            className={`nav-tab ${
              activeTab === "Contact" ? "active" : ""
            }`}
          >
            {t("Contact", "Contact")}
          </Link>

        </nav>

        {/* Actions & Language Switcher */}
        <div className="navbar-actions">

          {/* Language Switcher */}
          <div className="lang-switcher-wrapper">
            <Globe
              size={15}
              className="lang-icon"
            />

            <select
              className="language-switcher"
              value={currentLang}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* Contact Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/contact-us"
              className="signup-btn"
            >
              {t("Contact Us", "Contact Us")}
            </Link>
          </motion.div>

        </div>

      </div>
    </header>
  );
}