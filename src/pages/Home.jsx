import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTools, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Home.css';

const Home = () => {
  const featuredServices = [
    {
      id: 1,
      title: 'Electronics Services',
      description: 'Installation, repair, and maintenance for all your home appliances and smart devices.',
      icon: '🔌',
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Cleaning Services',
      description: 'Thorough and professional cleaning for every corner of your home.',
      icon: '🧹',
      color: '#10B981'
    },
    {
      id: 3,
      title: 'Painting Services',
      description: 'Interior and exterior painting to refresh and beautify your space.',
      icon: '🎨',
      color: '#F59E0B'
    },
    {
      id: 4,
      title: 'Electrical Services',
      description: 'Safe and reliable electrical installations, repairs, and upgrades.',
      icon: '⚡',
      color: '#8B5CF6'
    },
    {
      id: 5,
      title: 'Plumbing Services',
      description: 'Expert plumbing solutions for leaks, clogs, and installations.',
      icon: '🚰',
      color: '#06b6d4'
    },
    {
      id: 6,
      title: 'Carpentry Services',
      description: 'Custom woodwork, repairs, and furniture assembly by skilled carpenters.',
      icon: '🪚',
      color: '#f43f5e'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Choose Service',
      description: 'Browse our wide range of professional services',
      icon: <FaHome />
    },
    {
      step: 2,
      title: 'Book Appointment',
      description: 'Select your preferred time and book instantly',
      icon: <FaCheckCircle />
    },
    {
      step: 3,
      title: 'Get Service',
      description: 'Our experts arrive and complete the job',
      icon: <FaTools />
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely excellent! The team was professional, friendly, and the results were perfect. Highly recommended.',
      service: 'Plumbing Services',
      avatar: '👩‍🔧',
      amount: '$120'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 3,
      comment: 'Service was average. The work was completed, but it took longer than expected and communication could be improved.',
      service: 'Electrical Services',
      avatar: '👨‍🔧',
      amount: '$90'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 1,
      comment: 'Poor experience. The service was delayed and did not meet my expectations.',
      service: 'Cleaning Services',
      avatar: '👩‍🦰',
      amount: '$60'
    },
    {
      id: 4,
      name: 'David Lee',
      rating: 4,
      comment: 'Great job! The team was efficient and friendly. Will use again.',
      service: 'Painting Services',
      avatar: '👨‍🎨',
      amount: '$150'
    },
    {
      id: 5,
      name: 'Priya Patel',
      rating: 5,
      comment: 'Outstanding service and attention to detail. Highly recommend!',
      service: 'HVAC Services',
      avatar: '👩‍🔬',
      amount: '$200'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      rating: 2,
      comment: 'Not fully satisfied. Some issues were left unresolved.',
      service: 'Carpentry Services',
      avatar: '👨‍🔧',
      amount: '$80'
    }
  ];

  return (
    <div className="home page-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Home Services at Your Fingertips</h1>
          <p className="hero-subheading">Connect with trusted professionals for all your home maintenance and repair needs. Quality service, guaranteed satisfaction.</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary">
              Explore Services
             
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Professional solutions for every home maintenance and improvement need</p>
          </div>
          <div className="services-grid">
            {featuredServices.map(service => (
              <div key={service.id} className="service-card" style={{ borderTopColor: service.color }}>
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  <span>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" className="service-link">
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get professional help in three simple steps</p>
          </div>
          <div className="steps-grid">
            {howItWorks.map((step) => (
              <div key={step.step} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="reviews">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real feedback from satisfied customers</p>
          </div>
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
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-card-unified carousel-card-bg">
                  <div className="review-header">
                    <div className="review-avatar">{review.avatar}</div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-amount">{review.amount}</div>
                    <div className="review-service">{review.service}</div>
                  </div>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i} className="star inactive">★</span>
                    ))}
                  </div>
                  <div className="review-text">{review.comment}</div>
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
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers who trust us with their home services</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Today
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 