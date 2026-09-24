import { Check, HeartPulse, ShieldCheck, Stethoscope, Users, Award, Target, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import "./aboutus.css";

export default function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* HERO INTRO & STORY */}
        <div className="about-hero-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="about-info"
          >
            <span className="about-badge">
              My Journey & Vision
            </span>
            <h2 className="about-title">
              Dedicated to Transforming Women’s Healthcare in Pakistan
            </h2>
            <p className="about-subtitle">
              Hello, I am <strong>Dr. Rafiya Zahir</strong>. My passion for gynecology and obstetrics began during my years as a medical student when I recognized the dire need for improved women’s healthcare in Pakistan. High maternal and infant mortality rates deeply concerned me, fueling my motivation to bring real change.
            </p>
            <p className="about-subtitle">
              As the <strong>first-ever laparoscopic obstetrician-gynecologist and IUI treatment provider in Sialkot</strong>, my mission is to pioneer advanced, safe medical practices, combat malpractices, and ensure quality care for every woman.
            </p>

            <div className="about-checklist">
              <div className="about-check-item">
                <span className="about-check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>MBBS, FCPS & 9+ Years in Government Hospitals (Khawaja Safdar Medical & Teaching Hospital)</span>
              </div>
              <div className="about-check-item">
                <span className="about-check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>First Laparoscopic Surgery Pioneer in Sialkot</span>
              </div>
              <div className="about-check-item">
                <span className="about-check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>Head of IUI Treatment & Infertility Specialist at Darul-Shifa Hospital</span>
              </div>
            </div>

            <div className="about-cta-wrapper">
              <a href="#appointment" className="about-cta-btn">
                Book An Appointment
              </a>
            </div>
          </motion.div>

          {/* VISUAL / DOCTOR BADGE CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="about-doctor-card"
          >
            <div className="card-glow-effect"></div>
            <div className="about-doctor-content">
              <div className="doctor-header">
                <div className="doctor-avatar">
                  <Stethoscope size={32} />
                </div>
                <div>
                  <h3 className="doctor-name">Dr. Rafiya Zahir</h3>
                  <p className="doctor-spec">MBBS, FCPS (Obs & Gynae)</p>
                </div>
              </div>

              <p className="doctor-quote">
                "My goal is to support couples on their journey toward parenthood by providing compassionate, personalized, and evidence-based fertility care. I believe every patient deserves expert medical guidance combined with empathy, understanding, and genuine support. Through a patient-centered approach, I focus on understanding the underlying causes of infertility and developing individualized treatment plans that empower women and couples to make informed decisions about their reproductive health. My commitment is to create a safe and supportive environment where every patient feels heard, respected, and confident throughout their fertility journey."
              </p>

              <div className="doctor-stats-grid">
                <div className="stat-box">
                  <span className="stat-number">9+</span>
                  <span className="stat-label">Govt Experience</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Private Practice</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MISSION & VISION SECTION */}
        <div className="about-mission-vision-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mv-card"
          >
            <div className="mv-icon"><Target size={24} /></div>
            <h3>My Mission</h3>
            <p>
              To transform the landscape of women’s healthcare in Pakistan by combating malpractices, improving accessibility, mainstreaming laparoscopic surgery in Sialkot, and fostering empathy towards PCOS and infertility issues.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mv-card"
          >
            <div className="mv-icon"><Eye size={24} /></div>
            <h3>My Vision</h3>
            <p>
              To dismantle barriers in healthcare access, advance women-centric practices, and cultivate a society where every woman can make confident, informed decisions about her reproductive health without fear.
            </p>
          </motion.div>
        </div>

        {/* REDESIGNED KEY ACHIEVEMENTS SECTION */}
        <div className="about-achievements-section">
          <div className="section-header-center">
            <h3 className="section-heading">Key Achievements</h3>
            <p className="section-subheading">Pioneering excellence and advanced medical standards in Sialkot</p>
          </div>
          <div className="achievements-grid">
            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><Award size={22} /></div>
              <div className="ach-content">
                <h4>Academic Excellence</h4>
                <p>Earned prestigious MBBS and FCPS qualifications from top-tier medical institutions.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><Stethoscope size={22} /></div>
              <div className="ach-content">
                <h4>Government Hospital Tenure</h4>
                <p>9+ dedicated years serving at Khawaja Safdar Medical & Teaching Hospital.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><Sparkles size={22} /></div>
              <div className="ach-content">
                <h4>First Laparoscopic Pioneer</h4>
                <p>Recognized as the first-ever laparoscopic obstetrician-gynecologist in Sialkot.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><ShieldCheck size={22} /></div>
              <div className="ach-content">
                <h4>Advanced Surgical Care</h4>
                <p>Successfully introduced state-of-the-art laparoscopic gynecological procedures.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><HeartPulse size={22} /></div>
              <div className="ach-content">
                <h4>Infertility & IUI Specialist</h4>
                <p>Pioneered dedicated Intrauterine Insemination (IUI) treatments in the region.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="achievement-card">
              <div className="ach-badge-icon"><Users size={22} /></div>
              <div className="ach-content">
                <h4>Consultant Leadership</h4>
                <p>Leading as Consultant Gynecologist & Head of IUI Treatment at Darul-Shifa Hospital.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* REDESIGNED CORE VALUES CARDS */}
        <div className="core-values-container">
          <div className="section-header-center">
            <h3 className="section-heading">Core Values</h3>
            <p className="section-subheading">The foundational pillars guiding every patient interaction</p>
          </div>
          <div className="about-cards-grid">
            <motion.div whileHover={{ y: -6 }} className="about-mini-card">
              <div className="mini-card-icon"><HeartPulse size={24} /></div>
              <h4 className="about-card-title">Empathy & Compassion</h4>
              <p className="about-card-desc">Ensuring each woman in my care feels valued, deeply understood, and completely supported throughout her healing journey.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="about-mini-card">
              <div className="mini-card-icon"><ShieldCheck size={24} /></div>
              <h4 className="about-card-title">Excellence & Innovation</h4>
              <p className="about-card-desc">Staying ahead with the latest clinical advancements, continuous professional evolution, and an unyielding work ethic.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="about-mini-card">
              <div className="mini-card-icon"><Users size={24} /></div>
              <h4 className="about-card-title">Patient-Centered Care</h4>
              <p className="about-card-desc">Tailoring treatments to unique personal needs, prioritizing safety, comfort, and building long-lasting medical trust.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="about-mini-card">
              <div className="mini-card-icon"><Sparkles size={24} /></div>
              <h4 className="about-card-title">Advocacy & Integrity</h4>
              <p className="about-card-desc">Championing women's health rights, combating malpractices, and raising awareness with absolute transparency.</p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}