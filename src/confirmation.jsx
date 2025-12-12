import { useLocation } from "react-router-dom";
import BookDetail from "./BookDetail"
import PaymentVerification from "./PaymentVerification"
import Qr from "./Qr"

export default function BookingConfirmation() {

    const location = useLocation();
    const {mealType, date, time, persons, name, phone, totalAmount} = location.state || {};
    const headingStyle ={
                color: '#220303ff',
                margin: '3rem 0 1rem 0',
                fontSize: 'clamp(1.5rem, 5vw, 2.3rem)',
                fontWeight: 'bold'
            }

    const headingStyle2 ={
               fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#220303ff'
            }
    
    const subtitleStyle = {
                color: '#555',
                margin: '0 0 2rem 0',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
            }

    const informationStyle={
        margin: '4rem 0 0 0',
        color:"blue"
        }

    const handleBack = () => {
        window.location.href = '/';
    }
    return (
        < div >
        <style>{`
            @media (max-width: 768px) {
                .confirmation-container {
                    width: 95% !important;
                    padding: 0 0.5rem !important;
                }
                .confirmation-content {
                    flex-direction: column !important;
                }
                .payment-container {
                    width: 100% !important;
                    margin-top: 0 !important;
                    order: -1;
                }
                .book-detail-mobile {
                    width: 100% !important;
                    padding: 10px 0 !important;
                    margin-top: 2rem;
                }
                .confirmation-button {
                    width: 100% !important;
                    padding: 1rem !important;
                    font-size: 1rem !important;
                }
            }
        `}</style>
        <div style={{textAlign:'center'}}>
           <div style={headingStyle}>
             Confirm Your Booking
            </div>
            <p style={subtitleStyle}>
                Thank you for booking your meal at Mahaprasadam. Please follow the instructions below to complete your payment
            </p>
            </div>

            <div className="confirmation-container" style={{width:'80%',margin:'2rem auto'}}>
               <div className="confirmation-content" style={{display:'flex'}}>
                <BookDetail mealType={mealType} date={date} time={time} numberOfPeople={persons} customerName={name} phoneNumber={phone} totalAmount={totalAmount} style={{width:'50%', padding:'10px'}} className="book-detail-mobile"/>
                <div className="payment-container" style={{width:'50%'}} >
                    <Qr totalAmount={totalAmount} />
                    <PaymentVerification />
                </div>
            </div>
                <div style={informationStyle}>
                    <div style={headingStyle2}>
                        Important Information
                    </div>
                    <div style={{color:'green', fontWeight:'bold', marginBottom:'1rem'}}>
                        Please note: No refund available for any bookings.
                    </div>
                    <div style={subtitleStyle}>
                        For cash bookings, our admin will verify payment upon your arrival at the temple. Please ensure that you have the exact amount ready
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <button onClick={handleBack}
                     className="confirmation-button"
                     style={
                        {backgroundColor:'blue', alignItems:'center', color:'white', padding:'0.75rem 2rem', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'1rem'}
                }>Understood, continue to Home</button>
                </div>
            </div>
        </div>
    )
}