import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './ProviderTopbar.css';

const provider = {
  fullName: 'John Provider',
  address: '456 Service Rd, Colombo 00500',
  phone: '+94 77 987 6543',
  email: 'john.provider@email.com',
  joined: '2022-08-10',
  avatar: '/src/assets/man.png',
};

const notifications = [
  { 
    id: 1, 
    type: 'booking',
    message: 'New booking request for Plumbing service', 
    time: '1 hour ago',
    read: false
  },
  { 
    id: 2, 
    type: 'payment',
    message: 'Payment received for AC Service', 
    time: '2 hours ago',
    read: false
  },
  { 
    id: 3, 
    type: 'feedback',
    message: '5-star review from Sarah Johnson', 
    time: '1 day ago',
    read: true
  },
  { 
    id: 4, 
    type: 'system',
    message: 'Your subscription was renewed successfully', 
    time: '2 days ago',
    read: true
  },
];

const ProviderTopbarContent = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    console.log('Marking notification as read:', notificationId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'booking':
        return '📋';
      case 'payment':
        return '💰';
      case 'feedback':
        return '⭐';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  return (
    <></>
  );
};

export default ProviderTopbarContent; 