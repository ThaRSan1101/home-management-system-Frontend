import React from 'react';
import service1 from '../../../assets/service1.jpg';
import service2 from '../../../assets/service2.jpg';
import service3 from '../../../assets/service3.jpg';
import service4 from '../../../assets/service4.jpg';
import service5 from '../../../assets/service5.jpg';
import service6 from '../../../assets/service6.jpg';
import './Service.css';

const services = [
  {
    id: 1,
    image: service1,
    title: 'Plumbing Services',
    description: 'Fixing leaks, clogs, and water flow issues. Quick response for urgent plumbing problems.',
  },
  {
    id: 2,
    image: service2,
    title: 'Carpentry Services',
    description: 'Expert repairs for doors, windows, and furniture. Custom woodwork made easy and affordable.',
  },
  {
    id: 3,
    image: service3,
    title: 'Electrical Services',
    description: 'Safe installation of lights, fans, and switches. Quick repairs for power issues and wiring.',
  },
  {
    id: 4,
    image: service4,
    title: 'Painting Services',
    description: 'Clean, smooth wall painting with lasting results. Interior or exterior, big or small.',
  },
  {
    id: 5,
    image: service5,
    title: 'Electronic Services',
    description: 'Get your home appliances fixed fast. We service TVs, fridges, ovens, washers & more.',
  },
  {
    id: 6,
    image: service6,
    title: 'Cleaning Service',
    description: 'Deep cleaning for every space in your home. Kitchen, bathroom, and full-house cleaning.',
  },
];

const subscriptionPlans = [
  {
    title: 'Weekly Plan',
    price: 'LKR 2,000/week',
    features: [
      '1 Home Cleaning per week',
      'Priority Booking',
      'Basic Maintenance Check',
      'Cancel anytime',
    ],
  },
  {
    title: 'Monthly Plan',
    price: 'LKR 7,000/month',
    features: [
      '4 Home Cleanings per month',
      'Discounted Extra Services',
      'Free Plumbing/Electrical Check',
      'Cancel anytime',
    ],
  },
  {
    title: 'Yearly Plan',
    price: 'LKR 75,000/year',
    features: [
      '48 Home Cleanings per year',
      'All Maintenance Checks Included',
      'Annual Deep Cleaning',
      'Best Value',
    ],
  },
];

const Service = () => (
  <div className="customer-service-list">
    <h2 className="customer-service-title">Available Services</h2>
    <div className="customer-service-grid">
      {services.map(service => (
        <div className="customer-service-card" key={service.id}>
          <div className="customer-service-img-wrapper">
            <img src={service.image} alt={service.title} className="customer-service-img" />
          </div>
          <div className="customer-service-info">
            <h3 className="customer-service-name">{service.title}</h3>
            <p className="customer-service-desc">{service.description}</p>
            <button className="customer-service-btn">Book/View</button>
          </div>
        </div>
      ))}
    </div>
    <section className="customer-subscription-section">
      <h2 className="customer-subscription-title">Subscription Plans</h2>
      <div className="customer-subscription-grid">
        {subscriptionPlans.map((plan, idx) => (
          <div className="customer-subscription-card" key={plan.title}>
            <div className="customer-subscription-header">{plan.title}</div>
            <div className="customer-subscription-price">{plan.price}</div>
            <ul className="customer-subscription-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button className="customer-subscription-btn">Subscribe</button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Service; 