import React, { useState, useEffect } from 'react';
import { FaTools, FaHammer, FaLightbulb, FaPaintRoller, FaTv, FaBroom } from 'react-icons/fa';
import service1 from '../../../assets/plumbing.jpg';
import service2 from '../../../assets/carpentry.jpg';
import service3 from '../../../assets/electrical.jpg';
import service4 from '../../../assets/painting.webp';
import service5 from '../../../assets/electronic.webp';
import service6 from '../../../assets/cleaning.webp';
import { toast } from 'sonner';
import Modal from '../../../components/Modal';
import visaImg from '../../../assets/visa.png';
import mcImg from '../../../assets/master.png';
import './Service.css';

const services = [
  {
    id: 1,
    image: service1,
    category: 'Pipes, Leaks & Water Flow',
    title: 'Plumbing Services',
    description: 'Fixing leaks, clogs, and water flow issues. Bathroom and kitchen plumbing made simple. Quick response for urgent plumbing problems.',
  },
  {
    id: 2,
    image: service2,
    category: 'Woodwork & Furniture',
    title: 'Carpentry Services',
    description: 'Expert repairs for doors, windows, and furniture. Custom woodwork made easy and affordable. Fast fixes and installations for all wood-related needs.',
  },
  {
    id: 3,
    image: service3,
    category: 'Wiring, Lights & Power',
    title: 'Electrical Services',
    description: 'Safe installation of lights, fans, and switches. Quick repairs for power issues and wiring. Certified electricians for hassle-free service.',
  },
  {
    id: 4,
    image: service4,
    category: 'Walls & Surfaces',
    title: 'Painting Services',
    description: 'Clean, smooth wall painting with lasting results. Choose your colors we handle the rest. Interior or exterior, big or small we paint it all.',
  },
  {
    id: 5,
    image: service5,
    category: 'Home Appliances',
    title: 'Electronic Services',
    description: 'Get your home appliances fixed fast. We service TVs, fridges, ovens, washers & more. Quality repairs with genuine spare parts.',
  },
  {
    id: 6,
    image: service6,
    category: 'Home & Kitchen Cleaning',
    title: 'Cleaning Service',
    description: 'Deep cleaning for every space in your home. Kitchen, bathroom, and full-house cleaning. Trained staff using safe, effective products.',
  },
];

const subscriptionPlans = [
  {
    plan: 'Weekly Plan',
    title: 'Vehicle Wash',
    features: [
      'Weekly Vehicle Wash',
      'Car and bike washing',
      'Exterior and tire cleaning',
      'Basic interior wipe',
      'One service every week',
      'Doorstep service',
    ],
  },
  {
    plan: 'Monthly Plan',
    title: 'Deep Cleaning',
    features: [
      'Monthly Deep Cleaning',
      'Home, kitchen, bathroom, office, garden',
      'Full deep cleaning and dust removal',
      'Disinfection included',
      'One visit per month',
      'Trusted professionals',
    ],
  },
  {
    plan: 'Yearly Plan',
    title: 'Utility Check',
    features: [
      'Annual Maintenance',
      'AC deep cleaning',
      'Plumbing check-up',
      'Electrical safety inspection',
      'One visit per service yearly',
      'Preventive maintenance',
    ],
  },
];

const Service = () => {
  const [modalStep, setModalStep] = useState(null); // null | 'form' | 'payment' | 'confirm' | 'success'
  const [bookingType, setBookingType] = useState(null); // 'service' | 'subscription'
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', phone: '', date: '', time: '' });
  const [payment, setPayment] = useState({ method: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  // Helper for today date in yyyy-mm-dd
  const todayStr = new Date().toISOString().split('T')[0];

  // Booking state machine
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('customer_service_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customer_service_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Add booking on success
  const addBooking = (service, form) => {
    setBookings(prev => [
      ...prev,
      {
        id: Date.now(),
        service: service.title,
        date: form.date,
        time: form.time,
        status: 'Pending',
        details: { ...form },
      },
    ]);
  };

  // Booking actions
  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };
  const acceptBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Processing' } : b));
  };
  const completeBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Complete' } : b));
  };

  // Handlers
  const openBooking = (type, service) => {
    setBookingType(type);
    setSelectedService(service);
    setForm({ name: '', address: '', phone: '', date: '', time: '' });
    setPayment({ method: '', card: '', expiry: '', cvv: '' });
    setErrors({});
    setModalStep('form');
  };
  const closeModal = () => setModalStep(null);

  // Form validation
  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name required';
    if (!form.address.trim()) errs.address = 'Address required';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = '10-digit phone required';
    if (!form.date) errs.date = 'Date required';
    if (!form.time) errs.time = 'Time required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Payment validation
  const validatePayment = () => {
    const errs = {};
    if (!payment.method) errs.method = 'Select card type';
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(payment.card)) errs.card = '16-digit card required';
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errs.expiry = 'MM/YY required';
    else {
      const [mm, yy] = payment.expiry.split('/').map(Number);
      const year = 2000 + yy;
      if (mm < 1 || mm > 12) errs.expiry = 'Invalid month';
      if (year <= 2025) errs.expiry = 'Year must be after 2025';
    }
    if (!/^\d{3}$/.test(payment.cvv)) errs.cvv = '3-digit CVV required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Card input formatting
  const handleCardInput = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setPayment(p => ({ ...p, card: val }));
  };

  // Expiry input formatting
  const handleExpiryInput = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
    setPayment(p => ({ ...p, expiry: val }));
  };

  // Track last modalStep to detect transition to 'success'
  const [lastModalStep, setLastModalStep] = useState(null);
  useEffect(() => {
    if (lastModalStep !== 'success' && modalStep === 'success' && bookingType === 'service') {
      const bookingsCount = Number(localStorage.getItem('customer_bookings') || 0) + 1;
      const services = Number(localStorage.getItem('customer_services') || 0) + 1;
      localStorage.setItem('customer_bookings', bookingsCount);
      localStorage.setItem('customer_services', services);
      addBooking(selectedService, form);
    }
    setLastModalStep(modalStep);
  }, [modalStep, lastModalStep, bookingType, selectedService, form]);

  // Modal content for each step
  const renderModal = () => {
    if (modalStep === 'form') {
      return (
        <div className="booking-modal-form">
          <h2>Book {bookingType === 'service' ? selectedService?.title : 'Subscription'}</h2>
          <form onSubmit={e => { e.preventDefault(); if (validateForm()) setModalStep('payment'); }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            {errors.name && <div className="modal-err">{errors.name}</div>}
            <input placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            {errors.address && <div className="modal-err">{errors.address}</div>}
            <input placeholder="Phone Number" value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))} />
            {errors.phone && <div className="modal-err">{errors.phone}</div>}
            <input type="date" min={todayStr} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            {errors.date && <div className="modal-err">{errors.date}</div>}
            <input placeholder="Available time (e.g. 2:00 PM)" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            {errors.time && <div className="modal-err">{errors.time}</div>}
            <div className="modal-btn-row">
              <button type="button" onClick={closeModal} className="modal-cancel-btn">Cancel</button>
              <button type="submit" className="modal-next-btn">Next</button>
            </div>
          </form>
        </div>
      );
    }
    if (modalStep === 'payment') {
      return (
        <div className="booking-modal-payment">
          <h2>Confirm Details & Payment</h2>
          <div className="modal-summary">
            <div><b>Name:</b> {form.name}</div>
            <div><b>Address:</b> {form.address}</div>
            <div><b>Phone:</b> {form.phone}</div>
            <div><b>Date:</b> {form.date}</div>
            <div><b>Time:</b> {form.time}</div>
          </div>
          <div className="modal-payment-methods">
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='visa'} onChange={()=>setPayment(p=>({...p,method:'visa'}))} /> Visa
            </label>
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='mc'} onChange={()=>setPayment(p=>({...p,method:'mc'}))} /> MasterCard
            </label>
            <span className="modal-charge">Booking fee: <b>Rs. 500</b></span>
          </div>
          <div className="modal-fee-explanation">This non-refundable fee secures your service slot and will be deducted from your final bill.</div>
          {errors.method && <div className="modal-err">{errors.method}</div>}
          {payment.method && (
            <div className="modal-card-fields">
              <div className="modal-card-inputs">
                <input placeholder="Card Number" value={payment.card} maxLength={19} onChange={handleCardInput} />
                {errors.card && <div className="modal-err">{errors.card}</div>}
                <input placeholder="MM/YY" value={payment.expiry} maxLength={5} onChange={handleExpiryInput} />
                {errors.expiry && <div className="modal-err">{errors.expiry}</div>}
                <input placeholder="CVV" value={payment.cvv} maxLength={3} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))} />
                {errors.cvv && <div className="modal-err">{errors.cvv}</div>}
              </div>
              <div className="modal-card-img">
                {payment.method==='visa' && <img src={visaImg} alt="Visa" height={36} />}
                {payment.method==='mc' && <img src={mcImg} alt="MasterCard" height={36} />}
              </div>
            </div>
          )}
          <div className="modal-btn-row">
            <button type="button" onClick={closeModal} className="modal-cancel-btn">Cancel</button>
            <button type="button" className="modal-next-btn" onClick={()=>{ if(validatePayment()) setModalStep('confirm'); }}>Pay Now</button>
          </div>
        </div>
      );
    }
    if (modalStep === 'confirm') {
      return (
        <div className="booking-modal-confirm">
          <h2>Confirm your booking</h2>
          <div className="modal-btn-row">
            <button type="button" onClick={()=>setModalStep('payment')} className="modal-cancel-btn">Cancel</button>
            <button type="button" className="modal-next-btn" onClick={()=>setModalStep('success')}>Confirm</button>
          </div>
        </div>
      );
    }
    if (modalStep === 'success') {
      return (
        <div className="booking-modal-success">
          <h2>Your booking is successful</h2>
          <div className="modal-btn-row">
            <button type="button" className="modal-next-btn" onClick={closeModal}>OK</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="customer-service-list">
      <div className="customer-services-hero-heading" style={{position: 'relative'}}>
        <div className="decor-circles">
          <div className="circle gray" style={{left: '8%', top: '28px', width: '60px', height: '60px', border: '3px solid #1a3665', opacity: 0.18, position: 'absolute'}}></div>
          <div className="circle gray" style={{left: '16%', top: '65px', width: '70px', height: '70px', border: '3px solid #1a3665', opacity: 0.13, position: 'absolute'}}></div>
          <div className="circle gray" style={{right: '16%', top: '65px', width: '70px', height: '70px', border: '3px solid #1a3665', opacity: 0.18, position: 'absolute'}}></div>
          <div className="circle gray" style={{right: '8%', top: '28px', width: '60px', height: '60px', border: '3px solid #1a3665', opacity: 0.13, position: 'absolute'}}></div>
          <div className="circle gray" style={{right: '12%', top: '120px', width: '50px', height: '50px', border: '3px solid #1a3665', opacity: 0.18, position: 'absolute'}}></div>
        </div>
        <h2 className="customer-service-title">Our Services</h2>
        <div className="customer-service-subtitle">
          Your comfort is our priority<br/>
          Book trusted services with just a few clicks
        </div>
      </div>
      <div className="customer-service-grid">
        {services.map(service => (
          <div className="customer-service-card" key={service.id}>
            <div className="customer-service-img-wrapper">
              <img src={service.image} alt={service.title} className="customer-service-img" />
            </div>
            <div className="customer-service-info">
              <div className="customer-service-category">{service.category}</div>
              <h3 className="customer-service-name">{service.title}</h3>
              <p className="customer-service-desc">{service.description}</p>
              <div style={{fontWeight:'600',color:'#1a3665',marginBottom:'0.7rem',fontSize:'1.08rem'}}>Booking Fee: <span style={{color:'#1a3665',fontWeight:'700'}}>Rs 500</span></div>
              <button className="customer-service-btn" onClick={()=>openBooking('service', service)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Section Heading */}
      <div className="subscription-section-header" style={{marginTop: '4rem', marginBottom: '2.2rem', textAlign: 'center'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: 600, color: '#1a3665', marginBottom: '1.2rem', letterSpacing: '-1px'}}>Choose Your Subscription Plan</h2>
        <div style={{fontSize: '1.25rem', color: '#1a3665', fontWeight: 400}}>
          Select one of our value-packed plans and enjoy hassle-free home and vehicle care.
        </div>
      </div>
      <section className="customer-subscription-section">
        <div className="customer-subscription-grid">
          {subscriptionPlans.map((plan, idx) => (
            <div className="customer-subscription-card" key={plan.title}>
              <div className="customer-subscription-header" style={{fontSize: '1.2rem', fontWeight: 600, color: '#1a3665', textAlign: 'center', marginBottom: '0.7rem'}}>{plan.plan}</div>
              <div className="customer-subscription-title" style={{fontSize: '2.1rem', fontWeight: 700, color: '#1a3665', textAlign: 'center', marginBottom: '1.5rem'}}>{plan.title}</div>
              <ul className="customer-subscription-features" style={{marginBottom: '2.5rem'}}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{color: '#1a3665', fontSize: '1.18rem', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                    <span style={{color: '#1a3665', fontSize: '1.2rem', fontWeight: 700}}>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="customer-subscription-btn" onClick={() => openBooking('subscription', plan)}>Subscribe</button>
            </div>
          ))}
        </div>
      </section>
      <Modal isOpen={!!modalStep} onClose={closeModal}>
        {renderModal()}
      </Modal>
    </div>
  );
};

export default Service; 