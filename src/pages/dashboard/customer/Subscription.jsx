import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import visaImg from '../../../assets/visa.png';
import mcImg from '../../../assets/master.png';
import './Subscription.css';

const TABS = [
  { key: 'subscribed', label: 'Subscription Service' },
  { key: 'unsubscribed', label: 'Unsubscription Service' },
];

const samplePlans = [
  {
    id: 1,
    plan: 'Premium Home Care',
    startDate: '2024-05-01',
    endDate: '2025-05-01',
    status: 'subscribed',
  },
  {
    id: 2,
    plan: 'Basic Maintenance',
    startDate: '-',
    endDate: '-',
    status: 'unsubscribed',
  },
  {
    id: 3,
    plan: 'Garden Plus',
    startDate: '-',
    endDate: '-',
    status: 'unsubscribed',
  },
  {
    id: 4,
    plan: 'AC Annual Care',
    startDate: '2024-01-10',
    endDate: '2025-01-10',
    status: 'subscribed',
  },
];

export default function Subscription() {
  const [plans, setPlans] = useState(samplePlans);
  const [activeTab, setActiveTab] = useState('subscribed');
  const [modalStep, setModalStep] = useState(null); // null | 'form' | 'payment' | 'confirm' | 'success'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', phone: '', date: '', time: '' });
  const [payment, setPayment] = useState({ method: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const todayStr = new Date().toISOString().split('T')[0];

  const openBooking = (plan) => {
    setSelectedPlan(plan);
    setForm({ name: '', address: '', phone: '', date: '', time: '' });
    setPayment({ method: '', card: '', expiry: '', cvv: '' });
    setErrors({});
    setModalStep('form');
  };
  const closeModal = () => setModalStep(null);

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
  const handleCardInput = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setPayment(p => ({ ...p, card: val }));
  };
  const handleExpiryInput = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
    setPayment(p => ({ ...p, expiry: val }));
  };

  const renderModal = () => {
    if (modalStep === 'form') {
      return (
        <div className="customer-booking-modal-form">
          <h2>Book Subscription: {selectedPlan?.plan}</h2>
          <form onSubmit={e => { e.preventDefault(); if (validateForm()) setModalStep('payment'); }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            {errors.name && <div className="customer-modal-err">{errors.name}</div>}
            <input placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            {errors.address && <div className="customer-modal-err">{errors.address}</div>}
            <input placeholder="Phone Number" value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))} />
            {errors.phone && <div className="customer-modal-err">{errors.phone}</div>}
            <input type="date" min={todayStr} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            {errors.date && <div className="customer-modal-err">{errors.date}</div>}
            <input placeholder="Available time (e.g. 2:00 PM)" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            {errors.time && <div className="customer-modal-err">{errors.time}</div>}
            <div className="customer-modal-btn-row">
              <button type="button" onClick={closeModal} className="customer-modal-cancel-btn">Cancel</button>
              <button type="submit" className="customer-modal-next-btn">Next</button>
            </div>
          </form>
        </div>
      );
    }
    if (modalStep === 'payment') {
      return (
        <div className="customer-booking-modal-payment">
          <h2>Confirm Details & Payment</h2>
          <div className="customer-modal-summary">
            <div><b>Name:</b> {form.name}</div>
            <div><b>Address:</b> {form.address}</div>
            <div><b>Phone:</b> {form.phone}</div>
            <div><b>Date:</b> {form.date}</div>
            <div><b>Time:</b> {form.time}</div>
          </div>
          <div className="customer-modal-payment-methods">
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='visa'} onChange={()=>setPayment(p=>({...p,method:'visa'}))} /> Visa
            </label>
            <label>
              <input type="radio" name="paymethod" checked={payment.method==='mc'} onChange={()=>setPayment(p=>({...p,method:'mc'}))} /> MasterCard
            </label>
            <span className="customer-modal-charge">Booking charge: <b>Rs. 100</b></span>
          </div>
          {errors.method && <div className="customer-modal-err">{errors.method}</div>}
          {payment.method && (
            <div className="customer-modal-card-fields">
              <div className="customer-modal-card-inputs">
                <input placeholder="Card Number" value={payment.card} maxLength={19} onChange={handleCardInput} />
                {errors.card && <div className="customer-modal-err">{errors.card}</div>}
                <input placeholder="MM/YY" value={payment.expiry} maxLength={5} onChange={handleExpiryInput} />
                {errors.expiry && <div className="customer-modal-err">{errors.expiry}</div>}
                <input placeholder="CVV" value={payment.cvv} maxLength={3} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))} />
                {errors.cvv && <div className="customer-modal-err">{errors.cvv}</div>}
              </div>
              <div className="customer-modal-card-img">
                {payment.method==='visa' && <img src={visaImg} alt="Visa" height={36} />}
                {payment.method==='mc' && <img src={mcImg} alt="MasterCard" height={36} />}
              </div>
            </div>
          )}
          <div className="customer-modal-btn-row">
            <button type="button" onClick={closeModal} className="customer-modal-cancel-btn">Cancel</button>
            <button type="button" className="customer-modal-next-btn" onClick={()=>{ if(validatePayment()) setModalStep('confirm'); }}>Pay Now</button>
          </div>
        </div>
      );
    }
    if (modalStep === 'confirm') {
      return (
        <div className="customer-booking-modal-confirm">
          <h2>Confirm your booking</h2>
          <div className="customer-modal-btn-row">
            <button type="button" onClick={()=>setModalStep('payment')} className="customer-modal-cancel-btn">Cancel</button>
            <button type="button" className="customer-modal-next-btn" onClick={()=>setModalStep('success')}>Confirm</button>
          </div>
        </div>
      );
    }
    if (modalStep === 'success') {
      return (
        <div className="customer-booking-modal-success">
          <h2>Your booking is successful</h2>
          <div className="customer-modal-btn-row">
            <button type="button" className="customer-modal-next-btn" onClick={closeModal}>OK</button>
          </div>
        </div>
      );
    }
    return null;
  };

  const filteredPlans = plans.filter((plan) => plan.status === activeTab);

  return (
    <div className="customer-dashboard-subscription-super">
      <div className="customer-subscription-tabs-bg">
        <div className="customer-subscription-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`customer-subscription-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="customer-subscription-table-container">
        <div className="customer-subscription-table-scroll">
          <table className="customer-subscription-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.plan}</td>
                  <td>{plan.startDate}</td>
                  <td>{plan.endDate}</td>
                  <td>
                    {activeTab === 'subscribed' ? (
                      <button
                        className="customer-subscription-unsubscribe-btn"
                        onClick={() => setPlans((prev) => prev.map((p) => p.id === plan.id ? { ...p, status: 'unsubscribed', startDate: '-', endDate: '-' } : p))}
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        className="customer-subscription-btn"
                        onClick={() => openBooking(plan)}
                      >
                        Book Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={!!modalStep} onClose={closeModal}>
        {renderModal()}
      </Modal>
    </div>
  );
} 