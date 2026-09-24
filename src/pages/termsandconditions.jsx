import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Users, AlertTriangle, Video, Lock, Scale, Copyright, Mail, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function TermsAndConditions() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sections = [
    {
      title: "Official Name of the Website",
      icon: <FileText className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "The full official name of this website is “Dr. Rafiya Zahir” (herein referred to as “we,” “our,” or the “Site”). For the purpose of these Terms and Conditions, the term Dr. Rafiya Zahir incorporates its owners and affiliates."
    },
    {
      title: "Account and Appointment Registration",
      icon: <Users className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "While we do not offer user accounts on our website, users are encouraged to fill in our appointment form by providing their name, contact information, query, and preferred appointment dates to seek our Gynecology and Obstetrician services. Our website also allows users to submit their email addresses in order to receive newsletters and information regarding women’s health."
    },
    {
      title: "Age Restrictions and Access",
      icon: <Shield className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Our services are primarily intended for women aged 18 years and above or those who are married. However, we allow women below 18 years of age to access our website and seek consultation or other services related to their health, such as puberty and related issues."
    },
    {
      title: "Medical Information and Disclaimer",
      icon: <AlertTriangle className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "The medical information provided on the Dr. Rafiya Zahir website is for informational purposes only and is subject to change. It should not be considered a guaranteed or 100% accurate representation of the medical information or advice being offered. For accurate information and advice, users should contact us directly for consultation.\n\nThe content on our website is not intended to replace professional medical advice, diagnoses, or treatment. Users are encouraged to seek the advice of their medical or healthcare provider regarding any health-related concerns or questions."
    },
    {
      title: "Comments and User Conduct",
      icon: <Users className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Users are welcome to post comments and share our blog posts, provided they maintain a respectful and appropriate tone. Abusive language or inappropriate content will not be tolerated, and we reserve the right to remove any such comments at our discretion."
    },
    {
      title: "Virtual Consultations and Digital Services",
      icon: <Video className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We offer virtual or online consultations for users who wish to access our Gynecology and Obstetrics services remotely. By participating in virtual consultations or using digital services, users agree to abide by any specific terms and guidelines for those services, which may be subject to amendment from time to time."
    },
    {
      title: "Changes to These Terms and Conditions",
      icon: <FileText className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We reserve the right to modify these Terms and Conditions at any time, without prior notice. Users are responsible for regularly reviewing these Terms and Conditions to ensure they are aware of any changes. By continuing to use the Dr. Rafiya Zahir website following any updates, users accept and agree to be bound by the amended Terms and Conditions."
    },
    {
      title: "Limitation of Liability & Indemnification",
      icon: <Scale className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "The use of the Dr. Rafiya Zahir website and its services is at the user’s own risk. While we take all reasonable steps to ensure accuracy and reliability, we expressly disclaim any express or implied warranties. We will not be liable for any direct, indirect, incidental, or consequential damages.\n\nUsers agree to indemnify, defend, and hold harmless Dr. Rafiya Zahir, its owners, affiliates, agents, employees, and licensors from and against any claims, liabilities, damages, losses, or expenses arising out of or relating to the use of the website."
    },
    {
      title: "Intellectual Property",
      icon: <Copyright className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "All content, information, images, text, and other materials posted on the Dr. Rafiya Zahir website are protected by copyright, trademark, and other intellectual property laws and are the property of their respective owners. Unauthorized use, reproduction, modification, distribution, or exploitation is strictly prohibited."
    }
  ];

  const faqs = [
    {
      question: "Do I need to create a user account to book an appointment?",
      answer: "No, user accounts are not required. You can easily book an appointment or subscribe to newsletters by filling out our secure online forms."
    },
    {
      question: "Are minors under 18 allowed to seek consultation?",
      answer: "Yes, women below 18 are permitted to access our website and seek guidance or consultation regarding age-appropriate health matters such as puberty and adolescent care."
    },
    {
      question: "Is the medical content on the website a substitute for professional diagnosis?",
      answer: "No, website content is strictly for informational purposes and should never replace formal medical advice, diagnosis, or treatment from a licensed physician."
    },
    {
      question: "How do virtual consultations work?",
      answer: "We offer remote consultations for our gynecology and obstetrics services. Participants agree to comply with digital guidelines and session rules provided during booking."
    },
    {
      question: "Can I post comments on your blog posts?",
      answer: "Yes, you are welcome to share and comment on blog articles as long as you maintain a respectful, appropriate tone. Abusive text is promptly removed."
    },
    {
      question: "What laws govern these Terms and Conditions?",
      answer: "These terms are governed by and construed in accordance with the laws of the operational jurisdiction, subjecting any disputes to local exclusive court jurisdiction."
    }
  ];

  return (
    <div className="bg-[var(--white)] text-[var(--black)] min-h-screen font-sans selection:bg-[var(--rich-pink)] selection:text-[var(--white)]">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] to-[var(--white)] py-20 px-6 border-b border-[#F28BB6]/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--rich-pink)]/10 text-[var(--rich-pink)] text-sm font-semibold tracking-wide uppercase mb-4 border border-[var(--rich-pink)]/20">
              Dr. Rafiya Zahir Clinic
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--black)] mb-6 tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Please read the following Terms and Conditions carefully before using this website. By accessing or using our platform, you agree to be bound by these rules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN SECTIONS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(242,139,182,0.1)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--rich-pink)] to-[var(--liquid-gold)] group-hover:w-2 transition-all duration-300" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[var(--rich-pink)]/10 border border-[var(--rich-pink)]/20">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-[var(--black)]">
                  {section.title}
                </h2>
              </div>

              <div className="text-gray-700 leading-relaxed text-base pl-1 whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

       
       
        
      </section>
    </div>
  );
}