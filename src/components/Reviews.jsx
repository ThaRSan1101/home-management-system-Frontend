import React, { useEffect, useRef, useState } from 'react';
import './Reviews.css';

const Reviews = ({ className = '' }) => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely excellent! The team was professional, friendly, and the results were perfect. Highly recommended.',
      service: 'Plumbing Services',
      image: '/images/avatar1.jpg',
      amount: '$120'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 3,
      comment: 'Service was average. The work was completed, but it took longer than expected and communication could be improved.',
      service: 'Electrical Services',
      image: '/images/avatar2.jpg',
      amount: '$90'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 1,
      comment: 'Poor experience. The service was delayed and did not meet my expectations.',
      service: 'Cleaning Services',
      image: '/images/avatar3.jpg',
      amount: '$60'
    },
    {
      id: 4,
      name: 'David Lee',
      rating: 4,
      comment: 'Great job! The team was efficient and friendly. Will use again.',
      service: 'Painting Services',
      image: '/images/avatar4.jpg',
      amount: '$150'
    },
    {
      id: 5,
      name: 'Priya Patel',
      rating: 5,
      comment: 'Outstanding service and attention to detail. Highly recommend!',
      service: 'HVAC Services',
      image: '/images/avatar5.jpg',
      amount: '$200'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      rating: 2,
      comment: 'Not fully satisfied. Some issues were left unresolved.',
      service: 'Carpentry Services',
      image: '/images/avatar6.jpg',
      amount: '$80'
    }
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const numVisible = 3;
  const numSlides = Math.ceil(reviews.length / numVisible);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === 'left' ? 'right' : 'left'));
      setSlideIndex((prev) => {
        if (direction === 'left') {
          return (prev + 1) % numSlides;
        } else {
          return (prev - 1 + numSlides) % numSlides;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [direction, numSlides]);

  // Prepare slides (each slide contains 3 reviews)
  const slides = [];
  for (let i = 0; i < reviews.length; i += numVisible) {
    slides.push(reviews.slice(i, i + numVisible));
  }
  // If last slide has less than 3, fill from start for infinite loop effect
  if (slides.length > 0 && slides[slides.length - 1].length < numVisible) {
    const fillCount = numVisible - slides[slides.length - 1].length;
    slides[slides.length - 1] = [
      ...slides[slides.length - 1],
      ...reviews.slice(0, fillCount)
    ];
  }

  return (
    <section className={`reviews-section unified ${className}`}>
      <h2>What Our Customers Say</h2>
      <div className="reviews-slider-outer">
        <div
          className={`reviews-slider-inner slider-${direction}`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className="reviews-slide" key={idx}>
              {slide.map((review) => (
                <div key={review.id} className="review-card-unified">
                  <div className="review-header">
                    <div className="reviewer-photo">
                      <img src={review.image} alt={review.name} />
                    </div>
                    <div className="reviewer-name">{review.name}</div>
                  </div>
                  <div className="review-amount">{review.amount}</div>
                  <div className="review-service">{review.service}</div>
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews; 