import { useState, useEffect } from "react";
import { getAllBookings, confirmBooking } from "./api/bookingService";

export default function Pending(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmingId, setConfirmingId] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [isConfirmingBatch, setIsConfirmingBatch] = useState(false);

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

    const handleConfirmSelected = async () => {
        if (selectedBookings.length === 0) {
            alert('Please select at least one booking to confirm.');
            return;
        }

        if (isConfirmingBatch) return;

        try {
            setIsConfirmingBatch(true);
            await confirmBooking(selectedBookings);
            
            // Add a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Refresh the bookings list and clear selection
            await fetchPendingBookings();
            setSelectedBookings([]);
            alert(`${selectedBookings.length} booking(s) confirmed successfully!`);
        } catch (err) {
            alert('Failed to confirm bookings: ' + err.message);
            console.error('Error confirming bookings:', err);
        } finally {
            setIsConfirmingBatch(false);
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
                <>
                <div style={{marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <button 
                        className="btn-primary"
                        onClick={handleConfirmSelected}
                        disabled={selectedBookings.length === 0 || isConfirmingBatch}
                        style={{
                            opacity: selectedBookings.length === 0 || isConfirmingBatch ? 0.6 : 1,
                            cursor: selectedBookings.length === 0 || isConfirmingBatch ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isConfirmingBatch ? 'Confirming...' : `Confirm Selected (${selectedBookings.length})`}
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
