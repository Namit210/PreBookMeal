import Notes from "./Notes.jsx";
import rules from './assets/rule0.jpg';
import Card from "./Card.jsx";

export default function Rule(){

    const imgstyle={
        margin:'0 1rem 0 0', maxWidth:'100%', maxHeight:'300px', objectFit:'contain', display:'block', borderRadius:'15px',boxShadow:'0 6px 10px rgba(39, 24, 24, 0.1)'
    }

    return(
        <div>
            <Card heading='Rules & Help' img={rules} style={{justifyContent:'center', alignItems:'center', padding:'1rem 6rem'}} imgstyle={imgstyle}>
                    <p>Understand our booking policies, meal cut-off times, and payment procedures to ensure a smooth and enjoyable experiance with Mahaprasadam.</p>
                    
                  </Card>
        <div style={{width:'80%', margin:'2rem auto'}}>
            <Notes heading='Meal Booking Cut-off Times' type='disc'>
                {{"Breakfast":"Booking closes daily at 7:00 AM",
                  "Lunch":"Booking closes daily at 10:00 AM",
                  "Dinner":"Booking closes daily at 6:00 PM",
                  "":"Please ensure your meal is booked before the respective cut-off time to guarantee your order."}}
            </Notes>
            <Notes heading='Special Booking Arrangements' type='disc'>
            {
                {
                    "Off-time Bookings":"For reservations outside regular hours, please contact our admin at +1234567890 to make special arrangements.",
                    "Cash Bookings":"We facilitate cash bookings, which will be verified upon your arrival at the temple.",
                }
            }
            </Notes>
            <Notes type='none' heading='Important: No Refund Available'
            style={{color:'red', fontWeight:'bold', backgroundColor:'#d6e0e9ff', borderRadius:'8px'}}
            >
                {{
                    "":"Please note that all meal bookings are final and we do not offer refunds. We encourage you to double-check your booking details before confirming your reservation." 
                }}
            </Notes>

            <Notes heading='Contact Our Admin' type='none'>
                {
                    {
                        "":"For payment screenshot submissions, off-time booking requests, or any general inquiries, please reach out to our dedicated admin support."
                    }
                }
            </Notes>
            <div
            style={{fontWeight:'bold', fontSize:'20px', paddingLeft:'1.5rem', color:'#3e41e4ff'}}
            >Admin Phone: +91 9748005891</div>
        </div>
        </div>
    )
}