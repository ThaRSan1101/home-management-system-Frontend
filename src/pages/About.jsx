import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHandshake, FaStar, FaAward, FaHeart, FaShieldAlt, FaLightbulb, FaGlobe } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    {
      number: '500+',
      label: 'Happy Customers',
      icon: <FaUsers />
    },
    {
      number: '50+',
      label: 'Expert Providers',
      icon: <FaHandshake />
    },
    {
      number: '1000+',
      label: 'Services Completed',
      icon: <FaStar />
    },
    {
      number: '24/7',
      label: 'Support Available',
      icon: <FaAward />
    }
  ];

  const values = [
    {
      icon: <FaHeart />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else, ensuring every interaction exceeds expectations.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Reliability',
      description: 'Building lasting relationships through consistent, dependable service delivery and transparent communication.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'Continuously improving our platform and services to provide the best possible experience for our users.'
    },
    {
      icon: <FaGlobe />,
      title: 'Community Impact',
      description: 'Supporting local businesses and creating opportunities for skilled professionals in our community.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Passionate about connecting people with quality home services.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Technology expert focused on building scalable solutions.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Operations',
      bio: 'Ensuring smooth operations and exceptional customer service.',
      avatar: '👩‍🔧'
    },
    {
      name: 'David Wilson',
      role: 'Head of Marketing',
      bio: 'Creating meaningful connections with our community.',
      avatar: '👨‍💼'
    }
  ];

  return (
    <div className="about page-content">
      <div className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>Welcome to HomeService</h1>
            <p style={{fontWeight: '600', fontSize: '1.35rem', color: '#111', textShadow: '0 2px 8px rgba(255,255,255,0.18)'}}>Your trusted platform for connecting with skilled, verified home service professionals. Experience hassle-free, reliable, and top-quality home maintenance—every time.</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>To revolutionize the home services industry by creating a trusted platform that connects homeowners with skilled, verified professionals. We believe everyone deserves access to reliable, high-quality home maintenance services.</p>
              <p>Through our innovative platform, we're building a community where quality service meets convenience, making home maintenance accessible to everyone.</p>
            </div>
            <div className="mission-image">
              <div className="mission-stats">
                <div className="stat-item">
                  <h3>4+</h3>
                  <p>Years of Excellence</p>
                </div>
                <div className="stat-item">
                  <h3>98%</h3>
                  <p>Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind HomeService</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <div className="story-text">
              <p>HomeService was born from a simple frustration: finding reliable home service providers was too difficult. Our founder, Sarah Johnson, experienced this firsthand when she needed emergency plumbing repairs and spent hours calling different companies, only to be disappointed by poor service and hidden fees.</p>
              <p>That experience sparked the idea for HomeService - a platform that would connect homeowners with pre-vetted, professional service providers. We started small, with just a few local providers in our hometown, but the response was overwhelming.</p>
              <p>Today, we've grown into a trusted platform serving thousands of customers across the region. Our commitment to quality, transparency, and customer satisfaction remains at the heart of everything we do.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Whether you're looking for reliable home services or want to offer your professional skills, we'd love to have you as part of our growing community.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Today
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 