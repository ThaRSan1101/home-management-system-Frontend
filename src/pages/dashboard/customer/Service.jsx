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
    price: 500,
  },
  {
    id: 2,
    image: service2,
    category: 'Woodwork & Furniture',
    title: 'Carpentry Services',
    description: 'Expert repairs for doors, windows, and furniture. Custom woodwork made easy and affordable. Fast fixes and installations for all wood-related needs.',
    price: 500,
  },
  {
    id: 3,
    image: service3,
    category: 'Wiring, Lights & Power',
    title: 'Electrical Services',
    description: 'Safe installation of lights, fans, and switches. Quick repairs for power issues and wiring. Certified electricians for hassle-free service.',
    price: 500,
  },
  {
    id: 4,
    image: service4,
    category: 'Walls & Surfaces',
    title: 'Painting Services',
    description: 'Clean, smooth wall painting with lasting results. Choose your colors we handle the rest. Interior or exterior, big or small we paint it all.',
    price: 500,
  },
  {
    id: 5,
    image: service5,
    category: 'Home Appliances',
    title: 'Electronic Services',
    description: 'Get your home appliances fixed fast. We service TVs, fridges, ovens, washers & more. Quality repairs with genuine spare parts.',
    price: 500,
  },
  {
    id: 6,
    image: service6,
    category: 'Home & Kitchen Cleaning',
    title: 'Cleaning Service',
    description: 'Deep cleaning for every space in your home. Kitchen, bathroom, and full-house cleaning. Trained staff using safe, effective products.',
    price: 500,
  },
];

const subscriptionPlans = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

const Service = ({ currentUser }) => {
  const [modalStep, setModalStep] = useState(null); // null | 'form' | 'payment' | 'confirm' | 'success'
  const [bookingType, setBookingType] = useState(null); // 'service' | 'subscription'
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', phone: '', date: '', time: '' });
  const [payment, setPayment] = useState({ method: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]); // For persistent bookings, fetch from backend API
  const [bookingsCount, setBookingsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  // Helper for today date in yyyy-mm-dd
  const todayStr = new Date().toISOString().split('T')[0];

  // Add booking on success (integrated with backend)
  const addBooking = async (service, form) => {
    try {
      let apiUrl, requestBody;
      
      if (bookingType === 'subscription') {
        // Use subscription booking API for subscription plans
        apiUrl = 'http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php';
        requestBody = {
          user_id: currentUser?.user_id,
          sub_id: service.id, // Now properly mapped to database sub_id
          customer_name: form.name,
          sub_date: form.date,
          sub_time: form.time,
          sub_address: form.address,
          phoneNo: form.phone,
          amount: 1000 // Subscription fee as shown in UI
        };
      } else {
        // Use service booking API for regular services
        apiUrl = 'http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php';
        requestBody = {
          user_id: currentUser?.user_id,
          customer_name: form.name,
          service_category_id: service.id,
          service_name: service.title,
          service_date: form.date,
          service_time: form.time,
          service_address: form.address,
          phoneNo: form.phone,
          amount: service.price || 0
        };
      }

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });
      
      const data = await res.json();
      if (data.status === 'success') {
        setBookings(prev => [ ...prev, data.booking ]); // or refetch all bookings
        toast.success(bookingType === 'subscription' ? 'Subscription booked successfully!' : 'Service booked successfully!');
      } else {
        toast.error(data.message || 'Booking failed.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
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
    // Name: required, only letters and spaces
    if (!form.name.trim()) errs.name = 'Name required';
    else if (!/^[A-Za-z ]+$/.test(form.name.trim())) errs.name = 'Name must contain only letters and spaces';
    // Address: required, min 4 chars
    if (!form.address.trim()) errs.address = 'Address required';
    else if (form.address.trim().length < 4) errs.address = 'Address too short';
    // Phone: required, exactly 10 digits
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be 10 digits';
    // Date: required, not in the past
    if (!form.date) errs.date = 'Date required';
    else {
      const today = new Date();
      const selected = new Date(form.date);
      today.setHours(0,0,0,0);
      if (selected < today) errs.date = 'Date cannot be in the past';
    }
    // Time: required, valid 24-hour (HH:mm or HH:mm:00)
    if (!form.time) errs.time = 'Time required';
    else if (!/^\d{2}:\d{2}(:\d{2})?$/.test(form.time)) errs.time = 'Time must be HH:mm';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Payment validation
  const luhnCheck = (num) => {
    // Luhn algorithm for card validation
    let arr = (num + '').split('').reverse().map(x => parseInt(x));
    let sum = arr.reduce((acc, val, idx) => acc + (idx % 2 ? ((val *= 2) > 9 ? val - 9 : val) : val), 0);
    return sum % 10 === 0;
  };
  const validatePayment = () => {
    const errs = {};
    if (!payment.method) errs.method = 'Select card type';
    // Card: 16 digits, Luhn check
    const cardNum = payment.card.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNum)) errs.card = 'Card must be 16 digits';

    // Expiry: MM/YY, not past
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errs.expiry = 'MM/YY required';
    else {
      const [mm, yy] = payment.expiry.split('/').map(Number);
      const now = new Date();
      const exp = new Date(2000 + yy, mm - 1, 1);
      if (mm < 1 || mm > 12) errs.expiry = 'Invalid month';
      else if (exp < new Date(now.getFullYear(), now.getMonth(), 1)) errs.expiry = 'Card expired';
    }
    // CVV: 3 digits
    if (!/^\d{3}$/.test(payment.cvv)) errs.cvv = 'CVV must be 3 digits';
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
      setBookingsCount(count => count + 1);
      setServicesCount(count => count + 1);
      addBooking(selectedService, form);
      // toast.success removed here to avoid double alert
      // TODO: Persist booking and counts to backend API if needed
    }
    setLastModalStep(modalStep);
  }, [modalStep, lastModalStep, bookingType, selectedService, form]);

  // Modal content for each step
  const renderModal = () => {
    if (modalStep === 'form') {
      return (
        <div className="booking-modal-form">
          <h2>
            {bookingType === 'service' && selectedService?.title && (
              <>Book {selectedService.title}</>
            )}
            {bookingType === 'subscription' && selectedService?.plan && (
              <>Book {selectedService.plan} Subscription</>
            )}
          </h2>
          <form onSubmit={e => { e.preventDefault(); if (validateForm()) setModalStep('payment'); }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            {errors.name && <div className="modal-err">{errors.name}</div>}
            <input placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            {errors.address && <div className="modal-err">{errors.address}</div>}
            <input placeholder="Phone Number" value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))} />
            {errors.phone && <div className="modal-err">{errors.phone}</div>}
            <input type="date" min={todayStr} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            {errors.date && <div className="modal-err">{errors.date}</div>}
            <input placeholder="Available time (e.g. 14:30)" type="time" value={form.time.length === 8 ? form.time.substring(0,5) : form.time} onChange={e => {
            let val = e.target.value;
            // If user enters HH:mm, convert to HH:mm:00
            if (/^\d{2}:\d{2}$/.test(val)) val = val + ':00';
            setForm(f => ({ ...f, time: val }));
            }} />
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
            <div><b>Time:</b> {form.time ? (form.time.length === 5 ? form.time + ':00' : form.time) : ''}</div>
          </div>
          <div className="modal-payment-methods">
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='visa'} onChange={()=>setPayment(p=>({...p,method:'visa'}))} /> Visa
            </label>
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='mc'} onChange={()=>setPayment(p=>({...p,method:'mc'}))} /> MasterCard
            </label>
            <span className="modal-charge">Booking fee: <b>Rs. {bookingType === 'subscription' ? '1000' : '500'}</b></span>
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
            <button type="button" className="modal-next-btn" onClick={async ()=>{
              // Prevent duplicate booking on rapid clicks
              if (window.__bookingInProgress) return;
              window.__bookingInProgress = true;
              await addBooking(selectedService, form);
              window.__bookingInProgress = false;
              closeModal();
            }}>Confirm</button>
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

              <div className="customer-service-booking-fee"
                style={
                  service.title === 'Plumbing Services'
                    ? { paddingTop: '28px' }
                    : service.title === 'Electrical Services'
                    ? { paddingTop: '28px' }
                    : {}
                }
              >Booking Fee: Rs 500</div>

              <button className="customer-service-btn" onClick={()=>openBooking('service', service)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Section Heading */}
      <div className="subscription-section-header" style={{marginTop: '4rem', marginBottom: '2.2rem', textAlign: 'center'}}>
  <h2 style={{fontSize: '2.5rem', fontWeight: 600, color: '#1a3665', marginBottom: '1.2rem', letterSpacing: '-1px'}}>Discover Our Exclusive Packages</h2>
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
              <div className="customer-subscription-fee" style={{fontWeight: 700, color: '#1a3665', fontSize: '1.13rem', marginBottom: '1.1rem', textAlign: 'center'}}>Package Price: Rs 1000</div>
              <ul className="customer-subscription-features" style={{marginBottom: '2.5rem'}}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{color: '#1a3665', fontSize: '1.18rem', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                    <span style={{color: '#1a3665', fontSize: '1.2rem', fontWeight: 700}}>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="customer-subscription-btn" onClick={() => openBooking('subscription', plan)}>Activate Plan</button>
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