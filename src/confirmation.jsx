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
                fontSize: '2.3rem',
                fontWeight: 'bold'
            }

    const headingStyle2 ={
               fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#220303ff'
            }
    
    const subtitleStyle = {
                color: '#555',
                margin: '0 0 2rem 0',
                fontSize: '1rem'
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
        <div style={{textAlign:'center'}}>
           <div style={headingStyle}>
             Booking Confirmed
            </div>
            <p style={subtitleStyle}>
                Thank you for booking your meal at Mahaprasadam. Please follow the instructions below to complete your payment
            </p>
            </div>

            <div className="confirmation-container" style={{width:'80%',margin:'2rem auto'}}>
               <div style={{display:'flex'}}>
                <BookDetail mealType={mealType} date={date} time={time} numberOfPeople={persons} customerName={name} phoneNumber={phone} totalAmount={totalAmount} style={{width:'50%', padding:'10px'}}/>
                <div className="payment-container" style={{width:'50%'}} >
                    <Qr />
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
                     style={
                        {backgroundColor:'blue', alignItems:'center', color:'white'}
                }>Understood, continue to Home</button>
                </div>
            </div>
        </div>
    )
}