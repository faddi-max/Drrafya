import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, UserCheck, RefreshCw, AlertCircle, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information Collection and Use",
      icon: <UserCheck className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We collect personal information from users primarily through the appointment form and newsletters. The collected information may include the user’s name, email address, phone number, location, and other relevant data. We use the information provided by users to deliver the requested services, manage appointments, respond to inquiries, and keep users updated with newsletters related to women’s health and our services. We do not use cookies or similar technologies to collect user data, and we do not automatically collect any additional information aside from what is voluntarily submitted by users."
    },
    {
      title: "User Rights and Managing Personal Information",
      icon: <ShieldCheck className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Users have the right to request updates, corrections, or deletion of their personal information provided through our website. To update, correct, or delete your personal information held with us, please contact us directly via the email address provided on our website."
    },
    {
      title: "Security Measures",
      icon: <Lock className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We are committed to ensuring the security of the personal information provided by our users. We have implemented various security measures, such as the use of SSL encryption technology and hosting data on our secure servers, to maintain the safety of your data. However, please be aware that no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute data security."
    },
    {
      title: "Privacy Policy Updates",
      icon: <RefreshCw className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We reserve the right to modify this Privacy Policy at any time without prior notice. Users are encouraged to frequently review our Privacy Policy to ensure they are aware of any changes. By continuing to use the Dr. Rafiya Zahir website after any updates have been made, users accept and agree to the updated Privacy Policy. Notification of any changes will be posted on our Privacy Policy page on the website."
    },
    {
      title: "Children's Privacy",
      icon: <AlertCircle className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Our website and services are not directed towards individuals under the age of 18. We do not knowingly collect or maintain personal information from children under the age of 18. If we become aware of any personal information collected from a child under 18, we will take reasonable steps to promptly remove such information from our records."
    },
    {
      title: "Third-Party Links and Services",
      icon: <ShieldCheck className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Our website may include links to third-party websites or resources. We are not responsible for the content, privacy practices, or data collection methods employed by these third-party websites. Users should consult the privacy policies of such websites to better understand how their information may be collected or used."
    },
    {
      title: "Contact Us",
      icon: <Mail className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "If you have any questions, concerns, or comments regarding this Privacy Policy, or if you need any assistance with managing your personal information on the “Dr. Rafiya Zahir” website, please do not hesitate to contact us through the contact information provided on our website."
    }
  ];

  return (
    <div className="bg-[var(--white)] text-[var(--black)] min-h-screen font-sans selection:bg-[var(--rich-pink)] selection:text-[var(--white)]">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] to-[var(--white)] py-20 px-6 border-b border-[#F28BB6]/20">
        <div className="max-w-8xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--rich-pink)]/10 text-[var(--rich-pink)] text-sm font-semibold tracking-wide uppercase mb-4 border border-[var(--rich-pink)]/20">
              Dr. Rafiya Zahir
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--black)] mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy outlines our commitment to protecting your privacy and personal information, as well as how we collect, use, and manage the data you provide to us. By using our website and submitting your personal information, you agree to the terms outlined in this Privacy Policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
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
              {/* Accent Border Strip */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--rich-pink)] to-[var(--liquid-gold)] group-hover:w-2 transition-all duration-300" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[var(--rich-pink)]/10 border border-[var(--rich-pink)]/20">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-[var(--black)]">
                  {section.title}
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-base pl-1">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-16 text-center border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Dr. Rafiya Zahir. All rights reserved. Built with security and care.
          </p>
        </div>
      </section>
    </div>
  );
}