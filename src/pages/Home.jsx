import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTools, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Home.css';
import cover1 from '../assets/cover1.jpg';
import cover2 from '../assets/cover2.jpg';
import cover3 from '../assets/cover3.jpg';
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';
import bdImg from '../assets/bd-img.jpg';

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

  const sliderImages = [cover1, cover2, cover3];

  const serviceCards = [
    {
      id: 1,
      image: service1,
      category: 'Maintenance',
      title: 'Drain cleaning',
      description: 'Our drain cleaning services include floor drains, downspout drains, storm drains, sewer drains, and more.',
      link: '/services/drain-cleaning',
      categoryColor: '#0d7b6c'
    },
    {
      id: 2,
      image: service2,
      category: 'Repair',
      title: 'Fixing pipes',
      description: 'Our plumbers are experts in pipe repair, replacement and cleaning.',
      link: '/services/pipe-repair',
      categoryColor: '#007a65'
    },
    {
      id: 3,
      image: service3,
      category: 'Repair',
      title: 'Emergency plumber',
      description: 'Emergency plumbers at your service 24 hours per day.',
      link: '/services/emergency-plumber',
      categoryColor: '#007a65'
    },
    {
      id: 4,
      image: service4,
      category: 'Installation',
      title: 'Water Heater Installation',
      description: 'Professional installation of energy-efficient water heaters for your home or business.',
      link: '/services/water-heater-installation',
      categoryColor: '#0d7b6c'
    },
    {
      id: 5,
      image: service5,
      category: 'Maintenance',
      title: 'Gutter Cleaning',
      description: 'Keep your gutters clean and clog-free with our thorough gutter cleaning services.',
      link: '/services/gutter-cleaning',
      categoryColor: '#007a65'
    },
    {
      id: 6,
      image: service6,
      category: 'Repair',
      title: 'Toilet Repair',
      description: 'Fast and reliable toilet repair for leaks, clogs, and flushing issues.',
      link: '/services/toilet-repair',
      categoryColor: '#0d7b6c'
    }
  ];

  return (
    <div className="home page-content">
      {/* Hero Slider Section */}
      <section className="hero-slider-section">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="hero-swiper"
        >
          {sliderImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="hero-slide" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-slide-overlay">
                  <div className="hero-slide-content">
                    <h1>Professional Home Services at Your Fingertips</h1>
                    <p className="hero-subheading">
                      Connect with trusted professionals for all your home maintenance and repair needs. Quality service, guaranteed satisfaction.
                    </p>
                    <div className="hero-buttons">
                      <Link to="/services" className="btn btn-primary">Explore Services</Link>
                      <Link to="/register" className="btn btn-secondary">Join Community</Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Services */}
      <section className="modern-services-section">
        <div className="modern-services-header">
          <span className="modern-services-label">Our Services</span>
          <h2 className="modern-services-title">What Can We Help You With ?</h2>
        </div>
        <div className="modern-services-grid">
          {serviceCards.map(card => (
            <div className="modern-service-card overlap-bottom" key={card.id}>
              <div className="modern-service-img-wrapper">
                <img src={card.image} alt={card.title} className="modern-service-img" />
                <div className="modern-service-info-overlap-bottom">
                  <span className="modern-service-category" style={{ color: card.categoryColor }}>{card.category}</span>
                  <h3 className="modern-service-title">{card.title}</h3>
                  <p className="modern-service-desc">{card.description}</p>
                  <Link to={card.link} className="modern-service-link">Explore</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

     

      {/* Testimonials */}
      <section className="reviews-bg-section">
        <div className="reviews-bg" style={{ backgroundImage: `url(${bdImg})` }}>
          <div className="reviews-bg-overlay">
            <div className="container">
              <div className="section-header">
                <h2>What Our Customers Say</h2>
                <p>Real feedback from satisfied customers</p>
              </div>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                modules={[Autoplay, Navigation]}
                className="reviews-swiper reviews-centered-swiper"
                pagination={{ clickable: true }}
                navigation={true}
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <div className="review-centered-slide">
                      <div className="review-centered-text">{review.comment}</div>
                      <div className="review-centered-details">
                        <div className="review-centered-avatar">{review.avatar}</div>
                        <div className="review-centered-name">{review.name}</div>
                        <div className="review-centered-service">{review.service}</div>
                        <div className="review-centered-amount">{review.amount}</div>
                        <div className="review-centered-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="star">★</span>
                          ))}
                          {[...Array(5 - review.rating)].map((_, i) => (
                            <span key={i} className="star inactive">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
 {/* Ready to Get Started Section */}
 <section className="ready-section">
        <div className="ready-container">
          <h2 className="ready-title">Ready to Get Started?</h2>
          <p className="ready-subtitle">Join thousands of satisfied customers who trust us with their home services</p>
          <button className="ready-btn">Get Started </button>
        </div>
      </section>
    
      
    </div>
  );
};

export default Home; 