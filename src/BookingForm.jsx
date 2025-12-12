import React, { useState, useEffect } from 'react';
import './BookingForm.css';
import Card from './Card';
import meal from './assets/Mahaprasad-Thali.webp'
import { useNavigate } from 'react-router-dom';
import { createBooking } from './api/bookingService';

const BookingForm = () => {
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    mealType: '',
    persons: 1
  });
  

  const [errors, setErrors] = useState({});
  const [deadlineError, setDeadlineError] = useState('');

  const mealPrices = {
    breakfast: 60,
    lunch: 90,
    dinner: 60
  };

  const mealDeadlines = {
    breakfast: { hour: 7, minute: 0, label: '7:00 AM' },
    lunch: { hour: 10, minute: 0, label: '10:00 AM' },
    dinner: { hour: 18, minute: 0, label: '6:00 PM' }
  };

  const checkDeadline = (selectedDate, mealType) => {
    if (!selectedDate || !mealType) return true;

    const selected = new Date(selectedDate);
    const now = new Date();
    
    // If booking for today
    if (selected.toDateString() === now.toDateString()) {
      const deadline = mealDeadlines[mealType];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      if (currentHour > deadline.hour || 
          (currentHour === deadline.hour && currentMinute >= deadline.minute)) {
        setDeadlineError(
          `Sorry! Booking deadline for ${mealType} has passed. Deadline is before ${deadline.label}.`
        );
        return false;
      }
    }
    
    setDeadlineError('');
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check deadline when date or meal type changes
    if (name === 'date' || name === 'mealType') {
      const dateToCheck = name === 'date' ? value : formData.date;
      const mealToCheck = name === 'mealType' ? value : formData.mealType;
      checkDeadline(dateToCheck, mealToCheck);
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.mealType) {
      newErrors.mealType = 'Please select a meal type';
    }

    if (formData.persons < 1) {
      newErrors.persons = 'Number of persons must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!checkDeadline(formData.date, formData.mealType)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate total amount
      const totalAmount = mealPrices[formData.mealType] * formData.persons;

      // Prepare booking data
      const bookingData = {
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        mealType: formData.mealType,
        persons: formData.persons,
        totalAmount: totalAmount,
        bookingTime: new Date().toISOString()
      };

      // Call API to create booking
      const response = await createBooking(bookingData);

      // Navigate to confirmation page with booking data
      navigate('/confirm', {
        state: {
          bookingId: response.booking.booking_id,
          name: response.booking.name,
          phone: response.booking.phone,
          date: response.booking.date,
          mealType: response.booking.meal_type,
          persons: response.booking.persons,
          totalAmount: response.booking.total_amount,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          status: response.booking.status,
          savedToSheets: response.saved_to_sheets
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking: ' + error.message + '\nPlease try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = formData.mealType 
    ? mealPrices[formData.mealType] * formData.persons 
    : 0;

  const today = new Date().toISOString().split('T')[0];

  const handleBookNowClick = () => {
    setShowBookingForm(true);
    setTimeout(() => {
      document.querySelector('.booking-container')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .book-meal-btn {
            width: 100% !important;
            text-align: center;
          }
        }
      `}</style>
      <Card heading='Ananda Bazar Mahaprasad Booking' img={meal} style={{ width:'80%',}} imgstyle={{margin:'0 1rem 0 0', maxWidth:'100%', maxHeight:'400px', objectFit:'contain', display:'block'}}>
        <p>Partake in the Lord’s divine remnants, a timeless tradition of bliss and spiritual fulfillment. Prepared with utmost purity and devotion in the temple kitchen.</p>
        <button 
          className="book-meal-btn"
          style={{
            backgroundColor:'#7170d3ff', 
            color:'white', 
            padding:'0.75rem 1.5rem', 
            border:'none', 
            borderRadius:'5px', 
            cursor:'pointer', 
            fontSize:'1rem', 
            fontWeight:'600', 
            margin:'1rem 0 0 0',
            display: 'block'
          }} 
          onClick={handleBookNowClick}
        >
          Book Your Meal Now
        </button>
      </Card>
      
       
        <div className="booking-container">
          <div className="booking-card">
        <h1><strong>Book Your Meal</strong></h1>
        <p className="subtitle">Jagannath Mahaprasadam</p>

        <form onSubmit={handleSubmit} >
          {/* User Details Section */}
          <div className="form-sections-wrapper">
          <div className="form-section">
            <h2>Your Details</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
          
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
        
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          {/* Booking Details Section */}
          <div className="form-section">
            <h2>Meal Details</h2>

            <div className="form-group">
              <label htmlFor="date">Select Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={today}
              
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mealType">Meal Type *</label>
              <select
                id="mealType"
                name="mealType"
                value={formData.mealType}
                onChange={handleInputChange}
                
              >
                <option value="">Select meal type</option>
                <option value="Breakfast">Breakfast (₹60)</option>
                <option value="Lunch">Lunch (₹90)</option>
                <option value="Dinner">Dinner (₹60)</option>
              </select>
              {errors.mealType && <span className="error">{errors.mealType}</span>}
            </div>

            {deadlineError && (
              <div className="deadline-error">
                {deadlineError}
              </div>
            )}
              
            <div className="form-group">
              <label htmlFor="persons">Number of Persons *</label>
              <input
                type="number"
                id="persons"
                name="persons"
                value={formData.persons}
                onChange={handleInputChange}
                min="1"
                
              />
              {errors.persons && <span className="error">{errors.persons}</span>}
            </div>
          </div>
          </div>

          {formData.mealType && (
            <div className="price-summary">
              <div className="price-row">
                <span>Price per person:</span>
                <span>₹{mealPrices[formData.mealType]}</span>
              </div>
              <div className="price-row">
                <span>Number of persons:</span>
                <span>{formData.persons}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          )}

          {/* Booking Deadlines Info */}
            <>
              <div className="deadline-info">
                <h3>Booking Deadlines</h3>
                <ul>
                  <li><strong>Breakfast:</strong> Book before 7:00 AM</li>
                  <li><strong>Lunch:</strong> Book before 10:00 AM</li>
                  <li><strong>Dinner:</strong> Book before 6:00 PM</li>
                </ul>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting || !!deadlineError}
              >
                {isSubmitting ? 'Booking...' : 'Book Now'}
              </button>
            </>
        </form>
      </div>
    </div>
      
    </>
  );
};

export default BookingForm;