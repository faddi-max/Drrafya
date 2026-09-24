import { useState } from "react";
import { Check, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import "./contactusform.css";
import { storeContactDetails } from "../controllers/contact/contactformcontroller.jsx";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Mapping frontend state fields to match Laravel database column names exactly
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email_address: formData.email,
      phone_number: formData.phone,
      your_message: formData.message,
    };

    try {
      const response = await storeContactDetails(payload);
      
      if (response && response.success) {
        setSuccessMessage(response.message || "Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0];
        setErrorMessage(errors[firstKey][0]);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {/* LEFT SIDE CONTENT */}
        <div className="contact-info">
          <div>
            <h2 className="contact-title">How can We Help?</h2>
            <p className="contact-subtitle">
              Get in touch with our gynecology team for appointments, pregnancy care, women's health consultations, and any medical questions. We're here to provide compassionate and expert care.
            </p>

            <div className="contact-checklist">
              <div className="check-item">
                <span className="check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>Learn which plan is right for your team</span>
              </div>
              <div className="check-item">
                <span className="check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>Get onboarding help</span>
              </div>
              <div className="check-item">
                <span className="check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>Routine Checkups & Screenings</span>
              </div>
              <div className="check-item">
                <span className="check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>Fertility & Family Planning</span>
              </div>
            </div>
          </div>

          {/* MINI BOTTOM CARDS */}
          <div className="contact-cards-grid">
            <div className="mini-card">
              <h4 className="mini-card-title">General communication</h4>
              <p className="mini-card-desc">
                For other queries, please get in touch with us via email.
              </p>
              <a href="mailto:contactcreativetips@gmail.com" className="mini-card-link">
                <Mail size={16} />
                <span>contactcreativetips@gmail.com</span>
              </a>
            </div>

            <div className="mini-card">
              <h4 className="mini-card-title">Documentation</h4>
              <p className="mini-card-desc">
                Get an overview of our features, integrations, and how to use them.
              </p>
              <a href="#docs" className="mini-card-link">
                <span>See Docs</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="contact-form-card">
          <h3 className="form-title">Contact for Consultation</h3>

          {successMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="field-wrapper">
                <fieldset className="field-fieldset">
                  <legend className="field-label">First name</legend>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Johaness Mark"
                    className="field-input"
                    required
                  />
                </fieldset>
              </div>

              <div className="field-wrapper">
                <fieldset className="field-fieldset">
                  <legend className="field-label">Last name</legend>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Parker"
                    className="field-input"
                    required
                  />
                </fieldset>
              </div>
            </div>

            <div className="field-wrapper">
              <fieldset className="field-fieldset">
                <legend className="field-label">Email address</legend>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contactcreativetips@gmail.com"
                  className="field-input"
                  required
                />
              </fieldset>
            </div>

            <div className="field-wrapper">
              <fieldset className="field-fieldset">
                <legend className="field-label">Phone number</legend>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+5 123 4554 784"
                  className="field-input"
                />
              </fieldset>
            </div>

            <div className="field-wrapper">
              <fieldset className="field-fieldset">
                <legend className="field-label">Your message</legend>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project..."
                  className="field-textarea"
                  rows={3}
                  required
                />
              </fieldset>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>

      </div>
    </section>
  );
}