import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import "./Footer.css";
import Drrafyalogo from '../assets/rafyalogo.png';

const socials = [
  { key: "fb", Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/drrafiyashoaib" },
  { key: "ig", Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/drrafiyazahir" },
  { key: "yt", Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@dr.rafiyazahir4639" },
  { key: "tw", Icon: Twitter, label: "Twitter", href: "https://x.com/Drrafiyazahir" },
];

const lifecycleLinks = [
  { label: "Home", href: "#preconception" },
  { label: "IUI Treatment", href: "#pregnancy" },
  { label: "NICU Services", href: "#delivery" },
  // { label: "Postpartum & Recovery", href: "#postpartum" },
  // { label: "Infertility/IVF", href: "#infertility" },
];

const resourceLinks = [
  { label: "Refund Policy", href: "/refundpolicy" },
  { label: "Privacy Policy", href: "/privacypolcy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  // { label: "Sisterhood Forums", href: "#forums" },
  // { label: "Podcast Series", href: "#podcast" },
];

export default function Footer() {
  const [activeSocial, setActiveSocial] = useState(null);

  return (
    <footer className="modern-footer">
      {/* Background Ambient Glow */}
      <div className="footer-ambient-bg" />

      <div className="footer-inner">
        {/* MAIN BENTO GRID CONTAINERS */}
        <div className="bento-container">
          
          {/* Bento Box 1: Brand Header */}
          <div className="bento-box">
            <div>
              <img className="footer-logo" src={Drrafyalogo} alt="Dr Rafya Zahir" />

              <p className="brand-bio-text">
                A Lifesaving Choice for Mothers and Babies Utilizing Laparoscopic Technologies with Hundred Percent Satisfaction and No Loss Rate 
              </p>
            </div>

            {/* Social Links */}
            <div className="socials-row">
              {socials.map(({ key, Icon, label, href }) => {
                const isActive = activeSocial === key;
                return (
                  <motion.a
                    key={key}
                    href={href}
                    aria-label={label}
                    onMouseEnter={() => setActiveSocial(key)}
                    onMouseLeave={() => setActiveSocial(null)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="social-pill"
                    style={{
                      backgroundColor: isActive ? "var(--rich-pink)" : undefined,
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Bento Box 2: Lifecycle Hubs */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Quick Links</p>
              <ul className="bento-nav-list">
                {lifecycleLinks.map((item) => (
                  <li key={item.label}>
                    <a className="nav-item-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 3: Resources */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Policies</p>
              <ul className="bento-nav-list">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <a className="nav-item-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bento Box 4: Direct Consultation */}
          <div className="bento-box">
            <div>
              <p className="bento-title">Consultation</p>
              
              <div className="contact-stack">
                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Phone size={18} />
                  </div>
                  <a className="contact-anchor" href="https://wa.me/923217183160">
                    +92 3217183160
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <a className="contact-anchor" href="mailto:clinic@drrafiya.com">
                    info@drrafiyazahir.com
                  </a>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <span>
Darual Shifa Hospital, Tariq Road, Opposite G2 Marques, Sialkot.</span>
                </div>
              </div>
            </div>

            <a id="book" href="#book" className="btn-cta-gold">
              <span>Online Consultation</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

        </div>

        {/* GIANT EDITORIAL WATERMARK */}
        <div className="brand-watermark-container">
          <p className="brand-watermark-text">DR. RAFIYA ZAHIR</p>
        </div>

        {/* FOOTER BAR / LEGAL */}
        <div className="footer-bar">
          <p>© {new Date().getFullYear()} Dr. Rafiya Zahir. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacypolicy" className="legal-link">Privacy Policy</a>
            <a href="#terms" className="legal-link">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}