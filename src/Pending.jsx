import { useState, useEffect } from "react";
import { getAllBookings, confirmBooking } from "./api/bookingService";

export default function Pending(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmingId, setConfirmingId] = useState(null);

    useEffect(() => {
        fetchPendingBookings();
    }, []);

    const fetchPendingBookings = async () => {
        try {
            setLoading(true);
            const response = await getAllBookings({ status: 'pending' });
            setBookings(response.bookings || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching pending bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (bookingId) => {
        if (confirmingId) return; // Prevent multiple clicks
        
        try {
            setConfirmingId(bookingId);
            await confirmBooking(bookingId);
            
            // Add a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Refresh the bookings list
            await fetchPendingBookings();
            alert('Booking confirmed successfully!');
        } catch (err) {
            alert('Failed to confirm booking: ' + err.message);
            console.error('Error confirming booking:', err);
        } finally {
            setConfirmingId(null);
        }
    };

    const headingStyle ={
        color: '#220303ff',
        margin: '3rem 0 0.5rem 0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'Lato, sans-serif'
    }

        const subtitleStyle = {
                color: '#555',
                margin: '0 0 0.5rem  0',
                fontSize: '1rem'
            }

        const tableHeadStyle ={
        position:'sticky',
        backgroundColor: '#f2f2f2',
        padding:'10px',
        border:'1px solid black',
        top:0,
        zIndex:1
        }


    return(
        <div>
            <div style={headingStyle}>Pending Bookings Overview</div>
            <p style={subtitleStyle}>
                Bookings awaiting payment verification (QR Code screenshots or cash confirmation).
            </p>
            
            {loading && <p>Loading bookings...</p>}
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            
            {!loading && !error && bookings.length === 0 && (
                <p>No pending bookings found.</p>
            )}
            
            {!loading && !error && bookings.length > 0 && (
            <div style={{overflowY:'auto', maxHeight:'500px'}}>
                <table style={{borderCollapse:'collapse', width:'100%'}}>
                    <thead>
                    <tr>
                        <th style={tableHeadStyle}>Booking ID</th>
                        <th style={tableHeadStyle}>Customer Name</th>
                        <th style={tableHeadStyle}>Phone</th>
                        <th style={tableHeadStyle}>Meal Type</th>
                        <th style={tableHeadStyle}>Date</th>
                        <th style={tableHeadStyle}>Time</th>
                        <th style={tableHeadStyle}>Persons</th>
                        <th style={tableHeadStyle}>Total Amount</th>
                        <th style={tableHeadStyle}>Payment Status</th>
                        <th style={tableHeadStyle}>Confirm Now</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookings.slice().reverse().map((booking, index) => (
                            <tr key={booking.booking_id || index}>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.booking_id}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.name}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.phone}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.meal_type}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.date}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.booking_time ? new Date(booking.booking_time).toLocaleTimeString() : 'N/A'}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.persons}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>Rs. {parseFloat(booking.total_amount || 0).toFixed(2)}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.status}</td>
                                <td  style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>
                                    <button 
                                        className="btn-primary"
                                        onClick={() => handleConfirm(booking.booking_id)}
                                        disabled={confirmingId !== null}
                                        style={{
                                            opacity: confirmingId === booking.booking_id ? 0.6 : 1,
                                            cursor: confirmingId !== null ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {confirmingId === booking.booking_id ? 'Confirming...' : 'Confirm'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    )
}