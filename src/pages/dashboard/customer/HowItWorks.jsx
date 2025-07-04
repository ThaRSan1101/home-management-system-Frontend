import React, { useState } from 'react';
import './HowItWorks.css';
import cleaningImg from '../../../assets/still-life-office-cleaning-process.jpg';
import { MdOutlineVerifiedUser, MdOutlineHandshake, MdOutlineCreditCard, MdOutlineShield, MdOutlineSupportAgent, MdOutlineLock } from 'react-icons/md';

const guarantees = [
  {
    icon: <MdOutlineVerifiedUser size={40} color="#006551" />,
    title: "Verified Professionals",
    description: "All service providers undergo thorough background checks and certification validation before joining our platform."
  },
  {
    icon: <MdOutlineHandshake size={40} color="#006551" />,
    title: "Satisfaction Guarantee",
    description: "If you're not completely satisfied, we'll work to make it right or provide a refund according to our policy."
  },
  {
    icon: <MdOutlineCreditCard size={40} color="#006551" />,
    title: "Secure Payments",
    description: "All transactions are processed securely. Your payment is only released after you approve the completed service."
  },
  {
    icon: <MdOutlineShield size={40} color="#006551" />,
    title: "Insurance Coverage",
    description: "Services booked are covered by our protection policy, providing peace of mind in the rare case of property damage."
  },
  {
    icon: <MdOutlineSupportAgent size={40} color="#006551" />,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist with any questions or concerns."
  },
  {
    icon: <MdOutlineLock size={40} color="#006551" />,
    title: "Privacy Protection",
    description: "Your personal information and service details are kept secure and private."
  },
];

const faqs = [
  {
    question: "How do I know the service providers are qualified?",
    answer: "All providers are thoroughly vetted, background-checked, and certified before joining."
  },
  {
    question: "What happens if I'm not satisfied with the service?",
    answer: "Contact our 24/7 support team. We'll work to resolve your issue or provide a refund according to our satisfaction guarantee."
  },
  {
    question: "How does payment work?",
    answer: "Payments are securely processed online. Your payment is only released to the provider after you approve the completed service."
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer: "Yes, you can easily reschedule or cancel your booking from your dashboard, subject to our cancellation policy."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, all pricing is transparent and shown upfront before you confirm your booking."
  },
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const handleFaqClick = idx => setOpenFaq(openFaq === idx ? null : idx);

  return (
    <div className="customer-howitworks-page">
      {/* Phases Timeline Section */}
      <section className="phases-horizontal-section">
        <div className="phases-horizontal-grid">
          <div className="phases-horizontal-left">
            <h2 className="phases-title">How It Works</h2>
            <div className="phases-timeline">
              <div className="phases-timeline-item">
                <div className="phases-timeline-content left">
                  <h3>Choose Service</h3>
                  <p>Browse and select from our wide range of professional services.</p>
                </div>
                <div className="phases-timeline-circle">1</div>
                <div className="phases-timeline-content right"></div>
              </div>
              <div className="phases-timeline-item">
                <div className="phases-timeline-content left"></div>
                <div className="phases-timeline-circle">2</div>
                <div className="phases-timeline-content right">
                  <h3>Book Appointment</h3>
                  <p>Select your preferred time and book instantly.</p>
                </div>
              </div>
              <div className="phases-timeline-item">
                <div className="phases-timeline-content left">
                  <h3>Get Service</h3>
                  <p>Our experts arrive and complete the job efficiently.</p>
                </div>
                <div className="phases-timeline-circle">3</div>
                <div className="phases-timeline-content right"></div>
              </div>
            </div>
          </div>
          <div className="phases-horizontal-right">
            <img
              src={cleaningImg}
              alt="Office Cleaning Process"
              className="phases-side-image"
            />
          </div>
        </div>
      </section>

      {/* Trust & Security Guarantees */}
      <section className="trust-section trust-cards-section">
        <h2 className="trust-title">Why choose us?</h2>
        <p className="trust-intro">We prioritize your safety and satisfaction with every service booking</p>
        <div className="trust-cards-grid">
          {guarantees.map((g, idx) => (
            <div className="trust-card" key={idx}>
              <div className="trust-card-icon">{g.icon}</div>
              <h3 className="trust-card-title">{g.title}</h3>
              <p className="trust-card-desc">{g.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section new-faq-section">
        <h2 className="faq-title">Frequently asked questions</h2>
        <div className="faq-list new-faq-list">
          {faqs.map((faq, idx) => (
            <div className="faq-card" key={idx}>
              <button className="faq-question-row" onClick={() => handleFaqClick(idx)}>
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-plus">{openFaq === idx ? '-' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="faq-answer-row">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 