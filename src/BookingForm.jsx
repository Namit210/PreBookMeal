import React, { useState, useEffect } from 'react';
import './BookingForm.css';
import Card from './Card';
import meal from './assets/Mahaprasad-Thali.webp'
import { useNavigate } from 'react-router-dom';
import { createBooking } from './api/bookingService';
import { useTranslation } from 'react-i18next';

const BookingForm = () => {
  const t = useTranslation().t
  const navigate = useNavigate();

  const mealPrices = {
    Breakfast: 60,
    Lunch: 90,
    Dinner: 60
  };

  const mealDeadlines = {
    Breakfast: { hour: 7, minute: 0, label: '7:00 AM' },
    Lunch: { hour: 10, minute: 0, label: '10:00 AM' },
    Dinner: { hour: 18, minute: 0, label: '6:00 PM' }
  };

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.location.href = "https://pages.razorpay.com/pl_SILI365QvaGala/view";


  };


  const handleBookNowClick = (param) => {
    if (param === 'english') {
      window.location.href = "https://pages.razorpay.com/pl_SILI365QvaGala/view";
    }
    else if (param === 'hindi') {
      window.location.href = "https://pages.razorpay.com/pl_SILI365QvaGala/view";
    }
    else if (param === 'bengali') {
      window.location.href = "https://pages.razorpay.com/pl_SILI365QvaGala/view";
    }
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
      <Card heading={t("ananda-title")} img={meal} style={{ width:'80%'}} imgstyle={{margin:'0 1rem 0 0', maxWidth:'100%', maxHeight:'400px', objectFit:'contain', display:'block'}}>
        <p>{t("ananda-desc")}</p>


        <div style={{display:'flex', alignItems:'flex-start', marginTop:'1rem', gap:'1rem'}}>
          <div>
                  
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
          onClick={()=>handleBookNowClick('english')}
        >
          Book Now
        </button>
          <p style={{textAlign:'center', padding:'0.5rem 0'}}>(English)</p>
        </div>
        <div>
                  
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
          onClick={()=>handleBookNowClick('hindi')}
        >
          बुक करें
        </button>
          <p style={{textAlign:'center', padding:'0.5rem 0'}}>(हिंदी)</p>
        </div>
        <div>
                  
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
          onClick={()=>handleBookNowClick('bengali')}
        >
          বুক করুন
        </button>
          <p style={{textAlign:'center', padding:'0.5rem 0'}}>(বাংলা)</p>
        </div>
          
        </div>

         {/* Booking Deadlines Info */}
            
              <div className="deadline-info">
                <h3>{t("Booking Deadlines")}</h3>
                <ul>
                  <li><strong>{t("Breakfast")}:</strong> {t("Book before time", {time:'7:00 AM'})}</li>
                  <li><strong>{t("Lunch")}:</strong> {t("Book before time", {time:'10:00 AM'})}</li>
                  <li><strong>{t("Dinner")}:</strong> {t("Book before time", {time:'6:00 PM'})}</li>
                </ul>
              </div>
      </Card>
      
       
      
      
    </>
  );
};

export default BookingForm;