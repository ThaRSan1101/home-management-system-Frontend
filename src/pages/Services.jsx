import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Services.css';
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';

const Services = () => {
  const services = [
    {
      id: 1,
      image: service1,
      category: 'Maintenance',
      title: 'Drain cleaning',
      description: 'Our drain cleaning services include floor drains, downspout drains, storm drains, sewer drains, and more.',
      icon: '🛁'
    },
    {
      id: 2,
      image: service2,
      category: 'Repair',
      title: 'Fixing pipes',
      description: 'Our plumbers are experts in pipe repair, replacement and cleaning.',
      icon: '🔧'
    },
    {
      id: 3,
      image: service3,
      category: 'Repair',
      title: 'Emergency plumber',
      description: 'Emergency plumbers at your service 24 hours per day.',
      icon: '🚨'
    },
    {
      id: 4,
      image: service4,
      category: 'Installation',
      title: 'Appliance Installation',
      description: 'We install dishwashers, washing machines, water heaters, and more with expert care.',
      icon: '🔌'
    },
    {
      id: 5,
      image: service5,
      category: 'Inspection',
      title: 'Leak Detection',
      description: 'Advanced leak detection services to prevent water damage and save on repairs.',
      icon: '💧'
    },
    {
      id: 6,
      image: service6,
      category: 'Maintenance',
      title: 'Bathroom Renovation',
      description: 'Transform your bathroom with our complete renovation and upgrade services.',
      icon: '🛠️'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      service: 'Home Cleaning',
      rating: 5,
      comment: 'Excellent service! The team was professional and thorough. My home has never looked better.',
      avatar: '👩‍🦰',
      amount: '$120'
    },
    {
      id: 2,
      name: 'Mike Chen',
      service: 'Plumbing',
      rating: 5,
      comment: 'Quick response and fixed the issue efficiently. Highly recommended!',
      avatar: '👨‍🔧',
      amount: '$90'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      service: 'Electrical',
      rating: 5,
      comment: 'Professional, safe, and reliable. Will definitely use their services again.',
      avatar: '👩‍🔬',
      amount: '$60'
    }
  ];

  const features = [
    {
      icon: '🛡️',
      title: 'Verified Professionals',
      description: 'All our service providers are background-checked and certified'
    },
    {
      icon: '⏰',
      title: 'Same Day Service',
      description: 'Emergency services available with quick response times'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden fees, clear quotes before any work begins'
    },
    {
      icon: '✅',
      title: 'Satisfaction Guaranteed',
      description: '100% satisfaction guarantee on all our services'
    }
  ];

  return (
    <div className="services-page page-content">
      <section className="services-section">
        <div className="container">
          <div className="services-hero-heading">
            <div className="decor-circles">
              <span className="circle theme"></span>
              <span className="circle gray"></span>
              <span className="circle theme"></span>
              <span className="circle gray"></span>
              <span className="circle gray"></span>
            </div>
            <h1>Our Services</h1>
            <p>Quality is our guarantee. We offer a wide range of plumbing services to both residential and commercial clients.</p>
          </div>
          <div className="section-header" style={{display: 'none'}}>
            <h2>Our Services</h2>
          </div>
          <div className="services-grid modern-services-grid">
            {services.map(service => (
              <div className="modern-service-card service-list-card" key={service.id}>
                <div className="modern-service-img-wrapper">
                  <img src={service.image} alt={service.title} className="modern-service-img" />
                  <div className="modern-service-badge">
                    <span>{service.icon}</span>
                  </div>
                </div>
                <div className="modern-service-info-list">
                  <span className="modern-service-category-list">{service.category}</span>
                  <h3 className="modern-service-title-list">{service.title}</h3>
                  <p className="modern-service-desc-list">{service.description}</p>
                  <Link to="/register" className="modern-service-book-btn">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
          {/* Subscription Plans Section */}
          <section className="subscription-section">
            <h2 className="subscription-title">Choose Your Subscription Plan</h2>
            <p className="subscription-subtitle">Select one of our value-packed plans and enjoy hassle-free home and vehicle care.</p>
            <div className="subscription-plans-grid">
              {/* Weekly Plan */}
              <div className="subscription-card">
                <div className="subscription-header">Weekly Plan</div>
                <div className="subscription-price">Vehicle Wash</div>
                <ul className="subscription-features">
                  <li>🧼 Weekly Vehicle Wash</li>
                  <li>✔ Car and bike washing</li>
                  <li>✔ Exterior and tire cleaning</li>
                  <li>✔ Basic interior wipe</li>
                  <li>✔ One service every week</li>
                  <li>✔ Doorstep service</li>
                </ul>
                <button className="subscription-btn">Get Started</button>
              </div>
              {/* Monthly Plan */}
              <div className="subscription-card subscription-card-featured">
                <div className="subscription-header">Monthly Plan</div>
                <div className="subscription-price">Deep Cleaning</div>
                <ul className="subscription-features">
                  <li>🧹 Monthly Deep Cleaning</li>
                  <li>✔ Home, kitchen, bathroom, office, garden</li>
                  <li>✔ Full deep cleaning and dust removal</li>
                  <li>✔ Disinfection included</li>
                  <li>✔ One visit per month</li>
                  <li>✔ Trusted professionals</li>
                </ul>
                <button className="subscription-btn subscription-btn-featured">Get Started</button>
              </div>
              {/* Yearly Plan */}
              <div className="subscription-card">
                <div className="subscription-header">Yearly Plan</div>
                <div className="subscription-price">AC, Plumbing & Electrical Check</div>
                <ul className="subscription-features">
                  <li>🔧 Annual Maintenance</li>
                  <li>✔ AC deep cleaning</li>
                  <li>✔ Plumbing check-up</li>
                  <li>✔ Electrical safety inspection</li>
                  <li>✔ One visit per service yearly</li>
                  <li>✔ Preventive maintenance</li>
                </ul>
                <button className="subscription-btn">Get Started</button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Services; 