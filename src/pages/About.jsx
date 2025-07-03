import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./About.css";
import { FaUserShield, FaClock, FaCheckCircle, FaHeadset, FaLock, FaStar } from 'react-icons/fa';

const features = [
  {
    icon: "🛡️",
    title: "Verified Professionals",
    desc: "All service providers are background-checked and verified for your safety."
  },
  {
    icon: "⏱️",
    title: "Real-time Booking",
    desc: "Book and manage appointments instantly with live availability."
  },
  {
    icon: "💳",
    title: "Secure Online Payments",
    desc: "Pay safely online with PayHere integration and SSL security."
  },
  {
    icon: "🛠️",
    title: "Admin-monitored Assignments",
    desc: "Every job is tracked and managed by our admin team for quality."
  },
  {
    icon: "📱",
    title: "User-friendly Interface",
    desc: "Simple, intuitive design for all users, on any device."
  },
  {
    icon: "🕑",
    title: "24/7 Support",
    desc: "Get help anytime with our round-the-clock support team."
  }
];

const team = [
  { name: "Yoganathan Arultharshan", role: "Founder and CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Abiramy Thirulinganathan", role: "Chief Technology Officer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Tharshika Pathmanathan", role: "Chief Financial Officer", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Maheswaralingam Aberam", role: "Chief Service Coordinator", img: "https://randomuser.me/api/portraits/men/45.jpg" }
];



function AboutUsHero() {
  const features = [
    { icon: <FaUserShield />, title: 'Trusted Professionals', desc: 'All providers are background-checked and verified.' },
    { icon: <FaClock />, title: 'Quick Booking', desc: 'Book services instantly with real-time availability.' },
    { icon: <FaCheckCircle />, title: 'Quality Assured', desc: 'Every job is monitored for top quality.' },
    { icon: <FaHeadset />, title: '24/7 Support', desc: 'Get help anytime with our support team.' },
    { icon: <FaLock />, title: 'Secure Platform', desc: 'Your data and payments are always protected.' },
    { icon: <FaStar />, title: 'Top Rated', desc: 'Highly rated by thousands of happy users.' },
  ];
  return (
    <section className="aboutus-hero-section">
      <div className="aboutus-hero-bg"></div>
      <div className="aboutus-hero-content">
        <div className="aboutus-hero-left animate-fade-in-up">
          <h2 className="aboutus-hero-heading">
            <span className="aboutus-main-title">About Us</span><br />
            <span className="aboutus-sub-title text-gradient">ServiceHub</span>
          </h2>
          <p className="aboutus-hero-desc">
          ServiceHub is a trusted digital platform that connects customers with verified service professionals for all their home needs, including cleaning, repairs, electrical work, and more. Designed for convenience and reliability, ServiceHub allows customers to easily book services, track appointments, and receive bills online, while ensuring that every provider is manually approved by the admin for quality and safety.
          </p>
          <div className="aboutus-features-grid">
            {features.map((f, i) => (
              <div className="aboutus-feature-card card-hover shadow-soft animate-slide-up" key={f.title} style={{ animationDelay: `${i * 0.07 + 0.1}s` }}>
                <div className="aboutus-feature-icon">{f.icon}</div>
                <div className="aboutus-feature-text">
                  <div className="aboutus-feature-title">{f.title}</div>
                  <div className="aboutus-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  // For Particles.js
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="about-super">
      <AboutUsHero />
      {/* Hero Section with Particles removed */}

      <div className="section-divider"></div>

      {/* Meet the Team */}
      <motion.div
        className="team-section-super"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="team-header">
          <h2>Meet the Team</h2>
        </div>
        <div className="team-grid-super">
          {team.map((member, i) => (
            <motion.div
              className="team-card-super"
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <img className="team-avatar" src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <div className="team-role">{member.role}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 