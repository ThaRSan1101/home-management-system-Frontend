import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./About.css";

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
  { name: "Yoganathan Arultharshan", role: "Frontend Developer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Abiramy Thirulinganathan", role: "Backend Developer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Tharshika Pathmanathan", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Maheswaralingam Aberam", role: "Full Stack Developer", img: "https://randomuser.me/api/portraits/men/45.jpg" }
];

const techStack = [
  "ReactJS", "PHP", "MySQL", "Framer Motion", "Pure CSS", "Particles.js", "PayHere API"
];

const coreValues = [
  {
    icon: "🤝",
    title: "Integrity",
    desc: "We act with honesty and transparency in all our interactions."
  },
  {
    icon: "🌟",
    title: "Excellence",
    desc: "We strive for the highest quality in our services and solutions."
  },
  {
    icon: "👥",
    title: "Collaboration",
    desc: "We believe teamwork and open communication drive success."
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We embrace new ideas and technologies to serve you better."
  }
];

export default function About() {
  // For Particles.js
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="about-super">
      {/* Hero Section with Particles */}
      <div className="about-hero">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "#f8fafc" } },
            fpsLimit: 60,
            interactivity: { events: { onClick: { enable: false }, onHover: { enable: false } } },
            particles: {
              color: { value: "#00b894" },
              links: { enable: true, color: "#0984e3", distance: 120, opacity: 0.2 },
              move: { enable: true, speed: 0.5 },
              number: { value: 25 },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: 3 }
            }
          }}
          className="about-particles"
        />
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>About <span className="servicehub-brand">ServiceHub</span></h1>
          <p>
            ServiceHub is your one-stop digital platform to find reliable home services—plumbing, cleaning, repairs, and more. Developed as a final-year project by students at Uva Wellassa University, ServiceHub leverages modern technologies like ReactJS, PHP, MySQL, and more to simplify your household needs.
          </p>
        </motion.div>
      </div>

      <div className="section-divider"></div>

      {/* Our Story */}
      <motion.div
        className="our-story-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="our-story-card">
          <div className="our-story-accent">📖</div>
          <h2>Our Story</h2>
          <p>
            ServiceHub was born from the shared vision of four passionate students at Uva Wellassa University. United by our love for technology and a desire to make a real difference, we set out to create a platform that would simplify home service booking for every Sri Lankan household. Through teamwork, late nights, and a commitment to excellence, we transformed our final-year project into a solution that connects people with trusted professionals—making life easier, one service at a time.
          </p>
        </div>
      </motion.div>

      <div className="section-divider"></div>

      {/* Mission & Vision */}
      <div className="aboutus-section">
        <div className="aboutus-cards-container">
          <motion.div
            className="aboutus-card aboutus-card-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2>🎯 Our Mission</h2>
            <p>
              To simplify household service booking by providing a fast, secure, and efficient digital platform.
            </p>
            <div className="aboutus-mission-vision">
              <div>
                <h3>🔭 Our Vision</h3>
                <p>
                  To become Sri Lanka's most trusted digital platform for home service needs.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="aboutus-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2>🛠 Technologies Used</h2>
            <ul className="aboutus-tech-list">
              {techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="aboutus-location">
              <h3>📍 Location & Expansion</h3>
              <p>
                Currently developed for local use in Sri Lanka, with plans to scale for broader adoption.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* Our Core Values */}
      <motion.div
        className="core-values-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Core Values</h2>
        <div className="core-values-grid">
          {coreValues.map((val, i) => (
            <motion.div
              className="core-value-card"
              key={val.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="core-value-icon">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

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

      {/* Join Our Community CTA */}
      <motion.div
        className="about-cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Join Our Community</h2>
        <p>Be part of the ServiceHub journey. Connect, book, and experience the future of home services in Sri Lanka.</p>
        <div className="about-cta-buttons">
          <a href="/register" className="about-cta-btn">Get Started Today</a>
          <a href="/contact" className="about-cta-btn secondary">Contact Us</a>
        </div>
      </motion.div>
    </div>
  );
} 