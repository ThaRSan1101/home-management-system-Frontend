import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Home Cleaning',
      icon: '🧹',
      description: 'Professional cleaning services for your home',
      features: ['Deep Cleaning', 'Regular Maintenance', 'Eco-friendly Products', 'Flexible Scheduling'],
      price: 'From $50'
    },
    {
      id: 2,
      title: 'Plumbing',
      icon: '🔧',
      description: 'Expert plumbing solutions and repairs',
      features: ['Emergency Repairs', 'Installation', 'Maintenance', '24/7 Support'],
      price: 'From $80'
    },
    {
      id: 3,
      title: 'Electrical',
      icon: '⚡',
      description: 'Safe and reliable electrical services',
      features: ['Wiring & Installation', 'Repairs', 'Safety Inspections', 'Certified Technicians'],
      price: 'From $90'
    },
    {
      id: 4,
      title: 'Painting',
      icon: '🎨',
      description: 'Interior and exterior painting services',
      features: ['Interior Painting', 'Exterior Painting', 'Color Consultation', 'Quality Materials'],
      price: 'From $200'
    },
    {
      id: 5,
      title: 'Carpentry',
      icon: '🔨',
      description: 'Custom woodworking and repairs',
      features: ['Custom Furniture', 'Repairs', 'Installation', 'Design Consultation'],
      price: 'From $120'
    },
    {
      id: 6,
      title: 'HVAC',
      icon: '❄️',
      description: 'Heating, ventilation, and air conditioning',
      features: ['Installation', 'Maintenance', 'Repairs', 'Energy Efficiency'],
      price: 'From $150'
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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Professional Home Services</h1>
          <p>Transform your home with our expert services. From cleaning to repairs, we've got you covered with quality, reliability, and professionalism.</p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">Get Started</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="floating-card card-1">🏠</div>
            <div className="floating-card card-2">✨</div>
            <div className="floating-card card-3">🌟</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive home services tailored to your needs</p>
          </div>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <Link to={`/services/${service.id}`} className="btn-book">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section reviews">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={32}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="reviews-swiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
              1200: { slidesPerView: 3 }
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="review-card-unified carousel-card-bg">
                  <div className="review-header">
                    <div className="review-avatar">{testimonial.avatar}</div>
                    <div className="reviewer-name">{testimonial.name}</div>
                    <div className="review-amount">{testimonial.amount}</div>
                    <div className="review-service">{testimonial.service}</div>
                  </div>
                  <div className="review-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <span key={i} className="star inactive">★</span>
                    ))}
                  </div>
                  <div className="review-text">{testimonial.comment}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Home?</h2>
            <p>Join thousands of satisfied customers who trust us with their home services</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">Get Free Quote</Link>
              <Link to="/services" className="btn-outline">View All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 