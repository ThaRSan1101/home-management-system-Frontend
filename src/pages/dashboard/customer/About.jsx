import React from "react";
import './About.css';

const team = [
  { name: "Yoganathan Arultharshan", role: "Founder and CEO", img: "src/assets/tharshan.jpg" },
  { name: "Abiramy Thirulinganathan", role: "Chief Technology Officer", img: "src/assets/abiramy.jpg" },
  { name: "Tharshika Pathmanathan", role: "Chief Financial Officer", img: "src/assets/tharshi.jpg" },
  { name: "Maheswaralingam Aberam", role: "Chief Service Coordinator", img: "src/assets/abiram.jpg" }
];

export default function About() {
  return (
    <div className="aboutus-section-bg">
      <div className="aboutus-container">
        <h1 className="aboutus-title">About Us</h1>
        <h2 className="aboutus-subtitle">ServiceHub</h2>
        <p className="aboutus-desc">
          ServiceHub is a trusted digital platform that connects customers with verified service professionals for all their home needs, including cleaning, repairs, electrical work, and more. Designed for convenience and reliability, ServiceHub allows customers to easily book services, track appointments, and receive bills online, while ensuring that every provider is manually approved by the admin for quality and safety.
        </p>
        <div className="aboutus-stats-row">
          <div className="aboutus-stat-card">
            <div className="aboutus-stat-value">10K+</div>
            <div className="aboutus-stat-label">Happy Customers</div>
          </div>
          <div className="aboutus-stat-card">
            <div className="aboutus-stat-value">50+</div>
            <div className="aboutus-stat-label">Verified Service Providers</div>
          </div>
          <div className="aboutus-stat-card">
            <div className="aboutus-stat-value">99%</div>
            <div className="aboutus-stat-label">Satisfaction Rate</div>
          </div>
          <div className="aboutus-goal-card">
            <div className="aboutus-goal-title">Our Goal is to Simplify Home Services</div>
          </div>
        </div>
        <div className="aboutus-team-section">
          <h2 className="aboutus-team-title">Meet the team</h2>
          <div className="aboutus-team-grid">
            {team.map((member) => (
              <div className="aboutus-team-card" key={member.name}>
                <img className="aboutus-team-avatar" src={member.img} alt={member.name} />
                <div className="aboutus-team-name">{member.name}</div>
                <div className="aboutus-team-role">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 