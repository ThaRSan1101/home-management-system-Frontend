import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./About.css";
import Tilt from 'react-parallax-tilt';

// --- Typewriter Effect Hook ---
function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

// --- CountUp Effect Hook ---
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    step();
  }, [target, duration]);
  return count;
}

// --- Data ---
const coreValues = [
  { icon: "🤝", title: "Integrity", desc: "We act with honesty and transparency in all our interactions." },
  { icon: "🌟", title: "Quality", desc: "We deliver only the best, every time." },
  { icon: "⏰", title: "Punctuality", desc: "We value your time and always deliver on schedule." },
  { icon: "🧑‍🤝‍🧑", title: "Respect", desc: "We treat every client and provider with respect and care." },
  { icon: "💡", title: "Innovation", desc: "We embrace new ideas and technologies to serve you better." },
  { icon: "🔍", title: "Transparency", desc: "Clear, open communication at every step." },
];

const team = [
  { name: "Yoganathan Arultharshan", role: "Frontend Developer", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2", linkedin: "#" },
  { name: "Abiramy Thirulinganathan", role: "Backend Developer", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&facepad=2", linkedin: "#" },
  { name: "Tharshika Pathmanathan", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400&facepad=2", linkedin: "#" },
  { name: "Maheswaralingam Aberam", role: "Full Stack Developer", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2", linkedin: "#" },
];

const journey = [
  { year: "2022", label: "Idea", desc: "Identified the need for reliable home services." },
  { year: "2022", label: "Team Formed", desc: "Four students joined forces at Uva Wellassa University." },
  { year: "2023", label: "Launch", desc: "ServiceHub MVP launched for Sri Lankan households." },
  { year: "2023", label: "100+ Clients", desc: "Reached our first 100 happy clients." },
  { year: "2024", label: "Partnerships", desc: "Partnered with local service providers." },
  { year: "Now", label: "Growth", desc: "Expanding across Sri Lanka." },
];

const stats = [
  { label: "Services Delivered", value: 5000, suffix: "+" },
  { label: "Happy Clients", value: 2000, suffix: "+" },
  { label: "Verified Professionals", value: 100, suffix: "+" },
];

const whyPoints = [
  { icon: "🛡️", title: "Verified Providers", desc: "All professionals are background-checked and trusted." },
  { icon: "⚡", title: "Fast Booking", desc: "Book and manage appointments instantly." },
  { icon: "💸", title: "Affordable Pricing", desc: "Competitive rates for every service." },
  { icon: "🤝", title: "Great Support", desc: "24/7 customer support for peace of mind." },
];

const techStack = [
  "ReactJS", "PHP", "MySQL", "Framer Motion", "Pure CSS", "Particles.js", "PayHere API"
];

const missionText = "To make trusted, high-quality home services accessible to everyone.";
const visionText = "To become the most reliable and scalable home service network in Sri Lanka, empowering every household with trusted solutions.";

export default function About() {
  const particlesInit = async (main) => { await loadFull(main); };
  const missionTyped = useTypewriter(missionText, 28);
  const visionTyped = useTypewriter(visionText, 24);

  // CountUp for stats
  const statCounts = stats.map((s) => useCountUp(s.value, 1200));

  return (
    <div className="about-super">
      {/* --- About ServiceHub Section --- */}
      <section className="about-hero section-vibrant about-hero-centered">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
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
          className="about-hero-centered-content"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Animated SVG/Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring', stiffness: 80 }}
            className="about-hero-icon"
          >
            <svg width="90" height="90" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="90" cy="90" r="80" fill="#e6f4f1"/>
              <rect x="50" y="70" width="80" height="40" rx="12" fill="#00c6fb"/>
              <rect x="70" y="90" width="40" height="20" rx="6" fill="#007a65"/>
              <path d="M90 70 L90 50" stroke="#007a65" strokeWidth="6" strokeLinecap="round"/>
              <circle cx="90" cy="50" r="8" fill="#005bea"/>
            </svg>
          </motion.div>
          {/* Headline */}
          <motion.h1
            className="about-hero-title gradient-text section-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ fontSize: '3.2rem', margin: '1.2rem 0 0.5rem 0' }}
          >
            Welcome to <span className="servicehub-brand">ServiceHub</span>
          </motion.h1>
          {/* Subtitle */}
          <div className="about-hero-subtitle" style={{ fontSize: '1.35rem', color: '#007a65', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
            Your trusted platform for all home services
          </div>
          {/* Description in glass card */}
          <motion.div
            className="about-hero-desc-card glass-card section-desc"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}
          >
            ServiceHub connects homeowners with trusted professionals for all home services—plumbing, cleaning, repairs, and more. Our platform ensures reliability, safety, and convenience for every household.
          </motion.div>
          {/* CTA Button */}
          <motion.a
            href="/register"
            className="about-cta-btn"
            whileHover={{ scale: 1.08 }}
            style={{ marginTop: 32, display: 'inline-block', fontSize: '1.18rem', padding: '1rem 2.8rem' }}
          >
            Get Started
          </motion.a>
        </motion.div>
        <svg className="section-divider-svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C360 80 1080 0 1440 80V80H0V0Z" fill="#e6f4f1"/></svg>
      </section>

      {/* --- Our Story Section --- */}
      <section className="our-story-section glass-card story-angled-bg">
        <motion.div
          className="our-story-card"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          {/* Animated SVG for Our Story */}
          <motion.div
            className="section-anim-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            style={{ marginBottom: '0.7rem' }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="24" fill="#e6f4f1" />
              <path d="M18 28c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10" stroke="#007a65" strokeWidth="3" fill="none"/>
              <circle cx="28" cy="28" r="6" fill="#00b894" />
            </svg>
          </motion.div>
          <div className="our-story-accent" style={{ fontSize: '2.5rem', marginBottom: '0.7rem' }}>📖</div>
          <motion.h2
            className="story-title section-title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="story-desc section-desc"
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, type: 'spring', stiffness: 80 }}
            viewport={{ once: true }}
          >
            ServiceHub was born from the real-life challenge of finding reliable help for home needs. Four passionate students at Uva Wellassa University—Yoganathan Arultharshan, Abiramy Thirulinganathan, Tharshika Pathmanathan, and Maheswaralingam Aberam—teamed up to build a solution. Early success came as the platform quickly connected dozens of households with trusted professionals.
          </motion.p>
        </motion.div>
        <svg className="section-divider-svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C360 80 1080 0 1440 80V80H0V0Z" fill="#fff"/></svg>
      </section>

      {/* --- Our Mission Section --- */}
      <section className="mission-section vibrant-mission-bg">
        <motion.div
          className="mission-vision-text glass-card"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
        >
          {/* Animated SVG for Our Mission */}
          <motion.div
            className="section-anim-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            style={{ marginBottom: '0.7rem' }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="24" fill="#e6f4f1" />
              <path d="M18 28c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10" stroke="#007a65" strokeWidth="3" fill="none"/>
              <circle cx="28" cy="28" r="6" fill="#00b894" />
            </svg>
          </motion.div>
          <motion.h2
            className="mission-title section-title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="mission-desc animated-text section-desc"
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {missionTyped}
          </motion.p>
        </motion.div>
        <svg className="section-divider-svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C360 80 1080 0 1440 80V80H0V0Z" fill="#e6f4f1"/></svg>
      </section>

      {/* --- Our Vision Section --- */}
      <section className="vision-section glass-card vision-gradient-bg">
        <motion.div
          className="mission-vision-text"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
        >
          {/* Animated SVG for Our Vision */}
          <motion.div
            className="section-anim-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            style={{ marginBottom: '0.7rem' }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="24" fill="#e6f4f1" />
              <path d="M18 28c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10" stroke="#007a65" strokeWidth="3" fill="none"/>
              <circle cx="28" cy="28" r="6" fill="#00b894" />
            </svg>
          </motion.div>
          <motion.h2
            className="vision-title section-title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
            viewport={{ once: true }}
          >
            Our Vision
          </motion.h2>
          <motion.p
            className="vision-desc animated-text section-desc"
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {visionTyped}
          </motion.p>
        </motion.div>
        <svg className="section-divider-svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C360 80 1080 0 1440 80V80H0V0Z" fill="#fff"/></svg>
      </section>

      {/* 5. Our Core Values */}
      <div className="section-divider"></div>
      <motion.div
        className="core-values-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>
        <div className="core-values-grid">
          {coreValues.map((val, i) => (
            <motion.div
              className="core-value-card"
              key={val.title}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="core-value-icon">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 6. Meet Our Team */}
      <div className="section-divider"></div>
      <motion.div
        className="team-section-super section-vibrant"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="team-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
        </div>
        <div className="team-grid-super">
          {team.map((member, i) => (
            <Tilt glareEnable={true} glareMaxOpacity={0.18} scale={1.04} key={member.name}>
              <motion.div
                className="team-card-super glass-card"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.07, y: -8, boxShadow: "0 8px 40px rgba(0,122,101,0.25)" }}
                transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 120, damping: 18 }}
                viewport={{ once: true }}
              >
                <img className="team-avatar" src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#007a65", fontSize: 22, marginTop: 6, display: "inline-block" }} aria-label="LinkedIn">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
                </a>
              </motion.div>
            </Tilt>
          ))}
        </div>
        <svg className="section-divider-svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C360 80 1080 0 1440 80V80H0V0Z" fill="#f8fafc"/></svg>
      </motion.div>

      {/* 7. Our Journey */}
      <div className="section-divider"></div>
      <motion.div
        className="our-story-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.h2>
        <div className="journey-timeline" style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 0" }}>
          <div style={{ position: "relative", paddingLeft: 32, borderLeft: "3px solid #007a65" }}>
            {journey.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, type: 'spring', stiffness: 80 }}
                viewport={{ once: true }}
                style={{ marginBottom: 32, position: "relative" }}
              >
                <div style={{ marginLeft: 8 }}>
                  <div style={{ fontWeight: 700, color: "#007a65" }}>{step.label}</div>
                  <div style={{ color: "#1a202c", fontSize: 15 }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 8. ServiceHub by Numbers */}
      <div className="section-divider"></div>
      <motion.div
        className="why-choose-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ background: "#fff" }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          ServiceHub by Numbers
        </motion.h2>
        <div className="features-grid" style={{ marginBottom: 32 }}>
          {stats.map((stat, i) => (
            <motion.div
              className="feature-card"
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: "#007a65" }}>{statCounts[i]}{stat.suffix}</div>
              <div style={{ color: "#1a202c", fontWeight: 600 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 9. Why ServiceHub */}
      <div className="section-divider"></div>
      <motion.div
        className="why-choose-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          Why ServiceHub?
        </motion.h2>
        <div className="features-grid">
          {whyPoints.map((point, i) => (
            <motion.div
              className="feature-card"
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{point.icon}</div>
              <h3>{point.title}</h3>
              <p>{point.desc}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <a href="/register" className="about-cta-btn">Experience the ServiceHub difference today!</a>
        </div>
      </motion.div>
    </div>
  );
} 