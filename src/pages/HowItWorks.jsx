import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';
import howItWorksImg from '../assets/how-it-works.png';

const guarantees = [
  {
    icon: "🛡️",
    title: "Verified Professionals",
    description: "All service providers undergo thorough background checks, identity verification, and professional certification validation before joining our platform."
  },
  {
    icon: "😊",
    title: "Satisfaction Guarantee",
    description: "If you're not completely satisfied with the service, we'll work with you to make it right or provide a refund according to our satisfaction guarantee policy."
  },
  {
    icon: "💳",
    title: "Secure Payments",
    description: "All transactions are processed through our secure payment system. Your payment is only released to the provider after you approve the completed service."
  },
  {
    icon: "🏠",
    title: "Insurance Coverage",
    description: "Services booked through our platform are covered by our protection policy, providing peace of mind in the rare case of property damage during service."
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist with any questions or concerns before, during, or after your service appointment."
  },
  {
    icon: "🔒",
    title: "Privacy Protection",
    description: "Your personal information and service details are kept secure and private. We never share your data with third parties without your explicit consent."
  },
];

const testimonials = [
  {
    quote: "I needed an emergency plumbing repair and was able to book a professional within an hour. The service was excellent and the price was exactly as quoted. Highly recommend!",
    name: "Michael T.",
    service: "Plumbing Service",
  },
  {
    quote: "The booking process was so simple! I compared several cleaning services, read reviews, and booked in just a few minutes. My house has never looked better after the service.",
    name: "Sarah K.",
    service: "House Cleaning",
  },
  {
    quote: "I've used ServiceHub for electrical work, painting, and lawn care. Each time, the professionals were punctual, skilled, and courteous. The platform makes home maintenance so much easier.",
    name: "David L.",
    service: "Multiple Services",
  },
];

const faqs = [
  {
    question: "How do I know the service providers are qualified?",
    answer: "All providers are thoroughly vetted, background-checked, and certified before joining ServiceHub."
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
  return (
    <div className="how-it-works-page page-content">
      {/* Hero Section */}
      <section className="howitworks-hero">
        <div className="howitworks-hero-content">
          <h1>How ServiceHub Works</h1>
          <p>Booking trusted home services is simple, secure, and reliable with ServiceHub. Here's how it works:</p>
          <Link to="/services" className="howitworks-hero-btn">Get Started</Link>
        </div>
        <div className="howitworks-hero-image">
          <img src={howItWorksImg} alt="How it works illustration" />
        </div>
      </section>

      {/* How It Works Steps - Redesigned */}
      <section className="hiw-steps-section">
        <div className="hiw-steps-header">
          <h2>How ServiceHub Works</h2>
          <p>Follow these simple steps to get your home services done right:</p>
        </div>
        <div className="hiw-steps-grid">
          <div className="hiw-step-card">
            <div className="hiw-step-icon">🔍</div>
            <h3>1. Browse Services</h3>
            <p>Explore a wide range of trusted home services tailored to your needs. Find exactly what you're looking for in just a few clicks.</p>
          </div>
          <div className="hiw-step-card">
            <div className="hiw-step-icon">👤</div>
            <h3>2. Choose Your Provider</h3>
            <p>Review detailed profiles, ratings, and customer feedback to select the best professional for your job.</p>
          </div>
          <div className="hiw-step-card">
            <div className="hiw-step-icon">📅</div>
            <h3>3. Book Online</h3>
            <p>Schedule your service at a time that suits you. Our seamless online booking system ensures a hassle-free experience.</p>
          </div>
          <div className="hiw-step-card">
            <div className="hiw-step-icon">🛠️</div>
            <h3>4. Service Fulfillment</h3>
            <p>Your chosen professional delivers quality service at your doorstep. We ensure punctuality and professionalism every time.</p>
          </div>
        </div>
      </section>

      {/* Trust & Security Guarantees */}
      <section className="trust-section">
        <h2>Our Trust & Security Guarantees</h2>
        <p className="trust-intro">We prioritize your safety and satisfaction with every service booking.</p>
        <div className="trust-grid">
          {guarantees.map((g, idx) => (
            <div className="trust-card" key={idx}>
              <div className="trust-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-service">{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for additional content */}
      <section className="additional-content-section">
        {/* Add your custom content here */}
      </section>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Book?</h2>
        <p>Join thousands of satisfied customers who trust ServiceHub for their home needs.</p>
        <div className="cta-buttons">
          <Link to="/services" className="primary-btn">Explore Services</Link>
          <Link to="/register" className="secondary-btn">Sign Up Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 