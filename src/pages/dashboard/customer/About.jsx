import React from "react";
import { FaUserShield, FaClock, FaCheckCircle, FaHeadset, FaLock, FaStar } from 'react-icons/fa';
import './About.css';

const features = [
  { icon: <FaUserShield />, title: 'Trusted Professionals', desc: 'All providers are background-checked and verified.' },
  { icon: <FaClock />, title: 'Quick Booking', desc: 'Book services instantly with real-time availability.' },
  { icon: <FaCheckCircle />, title: 'Quality Assured', desc: 'Every job is monitored for top quality.' },
  { icon: <FaHeadset />, title: '24/7 Support', desc: 'Get help anytime with our support team.' },
  { icon: <FaLock />, title: 'Secure Platform', desc: 'Your data and payments are always protected.' },
  { icon: <FaStar />, title: 'Top Rated', desc: 'Highly rated by thousands of happy users.' },
];

const team = [
  { name: "Yoganathan Arultharshan", role: "Founder and CEO", img: "src/assets/tharshan.jpg" },
  { name: "Abiramy Thirulinganathan", role: "Chief Technology Officer", img: "src/assets/abiramy.jpg" },
  { name: "Tharshika Pathmanathan", role: "Chief Financial Officer", img: "src/assets/tharshi.jpg" },
  { name: "Maheswaralingam Aberam", role: "Chief Service Coordinator", img: "src/assets/abiram.jpg" }
];

function AboutUsHero() {
  return (
    <section className="customer-aboutus-hero-section customer-aboutus-hero-section">
      <div className="customer-aboutus-hero-content customer-aboutus-hero-content">
        <div className="customer-aboutus-hero-left customer-aboutus-hero-left">
          <h2 className="customer-aboutus-hero-heading customer-aboutus-hero-heading">
            <span className="customer-aboutus-main-title customer-aboutus-main-title">About Us</span><br />
            <span className="customer-aboutus-sub-title text-gradient customer-aboutus-sub-title">ServiceHub</span>
          </h2>
          <p className="customer-aboutus-hero-desc customer-aboutus-hero-desc">
            ServiceHub is a trusted digital platform that connects customers with verified service professionals for all their home needs, including cleaning, repairs, electrical work, and more. Designed for convenience and reliability, ServiceHub allows customers to easily book services, track appointments, and receive bills online, while ensuring that every provider is manually approved by the admin for quality and safety.
          </p>
          <div className="customer-aboutus-features-grid customer-aboutus-features-grid">
            {features.map((f, i) => (
              <div className="customer-aboutus-feature-card customer-aboutus-feature-card card-hover shadow-soft" key={f.title}>
                <div className="customer-aboutus-feature-icon customer-aboutus-feature-icon">{f.icon}</div>
                <div className="customer-aboutus-feature-text customer-aboutus-feature-text">
                  <div className="customer-aboutus-feature-title customer-aboutus-feature-title">{f.title}</div>
                  <div className="customer-aboutus-feature-desc customer-aboutus-feature-desc">{f.desc}</div>
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
  return (
    <div className="customer-about-super">
      <AboutUsHero />
      <div className="section-divider"></div>
      <div className="team-section-super customer-team-section-super">
        <div className="team-header customer-team-header">
          <h2>Meet the Team</h2>
        </div>
        <div className="team-grid-super customer-team-grid-super">
          {team.map((member, i) => (
            <div className="team-card-super customer-team-card-super" key={member.name}>
              <img className="team-avatar customer-team-avatar" src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <div className="team-role customer-team-role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 