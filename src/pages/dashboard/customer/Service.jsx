import React, { useState, useEffect } from 'react';
import service1 from '../../../assets/service1.jpg';
import service2 from '../../../assets/service2.jpg';
import service3 from '../../../assets/service3.jpg';
import service4 from '../../../assets/service4.jpg';
import service5 from '../../../assets/service5.jpg';
import service6 from '../../../assets/service6.jpg';
import Modal from '../../../components/Modal';
import visaImg from '../../../assets/visa.png';
import mcImg from '../../../assets/master.png';
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
            <span className="modal-charge">Booking charge: <b>Rs. 100</b></span>
          </div>
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
              <button className="customer-service-btn" onClick={()=>openBooking('service', service)}>Book Now</button>
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
              <button className="customer-subscription-btn" onClick={()=>openBooking('subscription', plan)}>Subscribe</button>
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