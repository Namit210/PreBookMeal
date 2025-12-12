import { useState, useEffect } from "react";
import { getAllBookings, unconfirmBooking } from "./api/bookingService";

export default function Confirmed(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unconfirmingId, setUnconfirmingId] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [isUnconfirmingBatch, setIsUnconfirmingBatch] = useState(false);

    useEffect(() => {
        fetchConfirmedBookings();
    }, []);

    const fetchConfirmedBookings = async () => {
        try {
            setLoading(true);
            const response = await getAllBookings({ status: 'confirmed' });
            setBookings(response.bookings || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching confirmed bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnconfirm = async (bookingId) => {
        if (unconfirmingId) return; // Prevent multiple clicks
        
        try {
            setUnconfirmingId(bookingId);
            await unconfirmBooking(bookingId);
            
            // Add a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Refresh the bookings list
            await fetchConfirmedBookings();
            alert('Booking unconfirmed successfully!');
        } catch (err) {
            alert('Failed to unconfirm booking: ' + err.message);
            console.error('Error unconfirming booking:', err);
        } finally {
            setUnconfirmingId(null);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedBookings(bookings.map(b => b.booking_id));
        } else {
            setSelectedBookings([]);
        }
    };

    const handleSelectBooking = (bookingId) => {
        setSelectedBookings(prev => {
            if (prev.includes(bookingId)) {
                return prev.filter(id => id !== bookingId);
            } else {
                return [...prev, bookingId];
            }
        });
    };

    const handleUnconfirmSelected = async () => {
        if (selectedBookings.length === 0) {
            alert('Please select at least one booking to unconfirm.');
            return;
        }

        if (isUnconfirmingBatch) return;

        try {
            setIsUnconfirmingBatch(true);
            await unconfirmBooking(selectedBookings);
            
            // Add a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Refresh the bookings list and clear selection
            await fetchConfirmedBookings();
            setSelectedBookings([]);
            alert(`${selectedBookings.length} booking(s) unconfirmed successfully!`);
        } catch (err) {
            alert('Failed to unconfirm bookings: ' + err.message);
            console.error('Error unconfirming bookings:', err);
        } finally {
            setIsUnconfirmingBatch(false);
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
            <div style={headingStyle}>Confirmed Bookings Overview</div>
            <p style={subtitleStyle}>
                Payment Verified Bookings.
            </p>
            
            {loading && <p>Loading bookings...</p>}
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            
            {!loading && !error && bookings.length === 0 && (
                <p>No confirmed bookings found.</p>
            )}
            
            {!loading && !error && bookings.length > 0 && (
                <>
                <div style={{marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <button 
                        className="btn-primary"
                        onClick={handleUnconfirmSelected}
                        disabled={selectedBookings.length === 0 || isUnconfirmingBatch}
                        style={{
                            opacity: selectedBookings.length === 0 || isUnconfirmingBatch ? 0.6 : 1,
                            cursor: selectedBookings.length === 0 || isUnconfirmingBatch ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isUnconfirmingBatch ? 'Unconfirming...' : `Unconfirm Selected (${selectedBookings.length})`}
                    </button>
                    {selectedBookings.length > 0 && (
                        <button 
                            className="btn-secondary"
                            onClick={() => setSelectedBookings([])}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Selection
                        </button>
                    )}
                </div>
                <div style={{overflowY:'auto', maxHeight:'500px'}}>
                <table style={{borderCollapse:'collapse', width:'100%'}}>
                    <thead>
                    <tr>
                        <th style={tableHeadStyle}>
                            <input 
                                type="checkbox"
                                checked={selectedBookings.length === bookings.length && bookings.length > 0}
                                onChange={handleSelectAll}
                                style={{cursor: 'pointer'}}
                            />
                        </th>
                        <th style={tableHeadStyle}>Booking ID</th>
                        <th style={tableHeadStyle}>Customer Name</th>
                        <th style={tableHeadStyle}>Phone</th>
                        <th style={tableHeadStyle}>Meal Type</th>
                        <th style={tableHeadStyle}>Date</th>
                        <th style={tableHeadStyle}>Time</th>
                        <th style={tableHeadStyle}>Persons</th>
                        <th style={tableHeadStyle}>Total Amount</th>
                        <th style={tableHeadStyle}>Payment Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookings.slice().reverse().map((booking, index) => (
                            <tr key={booking.booking_id || index}>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>
                                    <input 
                                        type="checkbox"
                                        checked={selectedBookings.includes(booking.booking_id)}
                                        onChange={() => handleSelectBooking(booking.booking_id)}
                                        style={{cursor: 'pointer'}}
                                    />
                                </td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.booking_id}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.name}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.phone}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.meal_type}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.date}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.booking_time ? new Date(booking.booking_time).toLocaleTimeString() : 'N/A'}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.persons}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>Rs. {parseFloat(booking.total_amount || 0).toFixed(2)}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
            )}
        </div>
    )
}