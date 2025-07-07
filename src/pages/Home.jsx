import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaTools, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Home.css';
import coverrrr from '../assets/coverrrr.jpg';
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
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

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

  const sliderImages = [coverrrr, cover2, cover3];

  const services = [
    {
      id: 1,
      image: service4,
      category: 'Pipes, Leaks & Water Flow',
      title: 'Plumbing Services',
      description: 'Fix leaks, clogged drains, and bathroom fittings with our plumbing experts.',
      
    },
    {
      id: 2,
      image: service5,
      category: 'Woodwork & Furniture',
      title: 'Carpentry Services',
      description: 'We fix and build furniture, doors, shelves, and more with expert woodwork.',
      
    },
    {
      id: 3,
      image: service2,
      category: 'Wiring, Lights & Power',
      title: 'Electrical Services',
      description: 'Get safe and quick help for wiring, lights, switches, and power issues.',
      
    },
    {
      id: 4,
      image: service3,
      category: 'Walls & Surfaces',
      title: 'Painting Services',
      description: 'We provide clean and smooth painting for walls, rooms, or your whole home.',
      
    },
    {
      id: 5,
      image: service6,
      category: 'Home Appliances',
      title: 'Electronic Services',
      description: 'We repair TVs, fridges, washing machines, and other home appliances.',
      
    },
    {
      id: 6,
      image: service1,
      category: 'Home & Kitchen Cleaning',
      title: 'Cleaning Service',
      description: 'Deep cleaning for homes, kitchens, bathrooms, and offices to keep things fresh and hygienic.',


      
    }
  ];

  return (
    <div className="home page-content">
      {/* Hero Slider Section */}
      <section className="hero-slider-section" style={{ position: 'relative', minHeight: '100vh' }}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="hero-swiper"
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          style={{ minHeight: '100vh' }}
        >
          {sliderImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="hero-slide" style={{ backgroundImage: `url(${img})`, minHeight: '100vh' }}></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hero-slide-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
          <div className="hero-slide-content" style={{ pointerEvents: 'auto' }}>
            <h1>Professional Home Services <br />at Your Fingertips</h1>
            <p className="hero-subheading">
              Connect with trusted professionals for all your home maintenance and repair needs. Quality service, guaranteed satisfaction.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">Explore Services</Link>
              <Link to="/register" className="btn btn-secondary">Join Community</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="modern-services-section">
        <div className="modern-services-header">
          <span className="modern-services-label">Our Services</span>
          <h2 className="modern-services-title">What Can We Help You With ?</h2>
        </div>
        <div className="modern-services-grid">
          {services.map(service => (
            <div className="modern-service-card overlap-bottom" key={service.id}>
              <div className="modern-service-img-wrapper">
                <img src={service.image} alt={service.title} className="modern-service-img" />
                <div className="modern-service-info-overlap-bottom">
                  <span className="modern-service-category" style={{ color: '#007a65' }}>{service.category}</span>
                  <h3 className="modern-service-title">{service.title}</h3>
                  <p className="modern-service-desc">{service.description}</p>
                  <Link to="/Services" className="modern-service-link">Explore</Link>
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
                slidesPerView={3}
                spaceBetween={24}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                modules={[Autoplay, Navigation]}
                className="reviews-swiper reviews-centered-swiper"
                pagination={{ clickable: true }}
                navigation={true}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 0 },
                  700: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: 3, spaceBetween: 24 }
                }}
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
          <button className="ready-btn" onClick={() => navigate('/register')}>Get Started </button>
        </div>
      </section>
    
      
    </div>
  );
};

export default Home; 