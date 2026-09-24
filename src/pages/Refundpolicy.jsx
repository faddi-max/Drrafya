import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Clock, ShieldAlert, FileText, Mail, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function RefundPolicy() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sections = [
    {
      title: "Applicable Services for Refund Policy",
      icon: <RotateCcw className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Please note that our refund policy is applicable solely to appointment bookings, such as consultations and routine check-ups made through our website and paid for online. Refunds do not apply to surgical procedures, treatments, or any medical intervention. We advise customers to carefully review all information regarding their service bookings both upon submitting requests and receiving confirmation emails."
    },
    {
      title: "24-Hour Refund Policy",
      icon: <Clock className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "We offer a hassle-free 24-hour refund policy to address cancellations or rescheduling of appointments. You may request a refund up to 24 hours prior to your scheduled appointment. In order to be eligible for a refund, please adhere to the following guidelines:\n\n• Contact our customer support team within 24 hours before your appointment via email or phone to let us know that you wish to cancel or reschedule.\n• Provide the necessary information, such as your name, appointment date, and payment reference number for a quick and smooth refund process.\n• The 24-hour window provides our staff ample time to modify appointment schedules and manage the needs of other patients.\n• Refunds will be processed back to the original mode of payment within 7-10 working days."
    },
    {
      title: "Uncovered Refunds and Exclusions",
      icon: <ShieldAlert className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Unfortunately, we are unable to process refunds for cancellations made less than 24 hours before the scheduled appointment. Refunds are not applicable for surgical procedures, treatments, or any medical intervention, once they have been conducted. In specifically documented exceptional circumstances, such as medical emergencies, please contact our customer support team for assistance. We may discuss your case individually and consider refund requests on a case-by-case basis."
    },
    {
      title: "Patient Confidentiality & Security",
      icon: <FileText className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Your personal and financial information is of utmost importance to us, and we adhere to strict confidentiality protocols to ensure the security of the data you share with us during the refund process. Read our Privacy Policy to understand the measures we have in place to protect your privacy."
    },
    {
      title: "Amendments to the Refund Policy",
      icon: <RotateCcw className="w-6 h-6 text-[var(--liquid-gold)]" />,
      content: "Dr. Rafiya Zahir’s clinic reserves the right to amend or modify the terms of this refund policy at any time without prior notice. Any changes to the policy will be effective immediately upon posting the updated policy on our website. We encourage customers to periodically review our refund policy to stay informed of any changes. By continuing to access our website and avail of our services, you agree to be bound by the updated refund policy."
    }
  ];

  const faqs = [
    {
      question: "What services are applicable for refunds?",
      answer: "Refunds apply solely to appointment bookings such as consultations and routine check-ups made and paid for online through our website."
    },
    {
      question: "What is the time frame for requesting a refund?",
      answer: "You can request a refund up to 24 hours prior to your scheduled appointment time."
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Approved refunds are processed back to your original mode of payment within 7-10 working days."
    },
    {
      question: "Can I refund for a surgical procedure or medical treatment?",
      answer: "No, refunds do not apply to surgical procedures, treatments, or medical interventions once they have been conducted."
    },
    {
      question: "What if I want to cancel my appointment less than 24 hours before?",
      answer: "Unfortunately, cancellations made less than 24 hours before the scheduled appointment are not eligible for refunds, except in documented medical emergencies."
    },
    {
      question: "How can I be sure my personal information is safe during refunds?",
      answer: "We follow strict confidentiality protocols and secure encryption standards to safeguard all data shared during transaction processing."
    },
    {
      question: "Will there be any amendments to the refund policy?",
      answer: "The clinic reserves the right to modify this policy at any time. Updated versions will be posted immediately on this page."
    },
    {
      question: "What if I need to reschedule my appointment?",
      answer: "You can contact our support team at least 24 hours prior to your session to reschedule your appointment smoothly without losing your slot."
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
              Refund Policy
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              At Dr. Rafiya Zahir’s clinic, we prioritize patient satisfaction and strive to ensure a seamless experience. We understand plans change, which is why we’ve built a transparent, customer-friendly refund policy.
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