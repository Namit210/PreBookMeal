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
        fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
        fontWeight: 'bold',
        fontFamily: 'Lato, sans-serif'
    }

    const subtitleStyle = {
        color: '#555',
        margin: '0 0 0.5rem  0',
        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
    }

    const tableHeadStyle ={
        position:'sticky',
        backgroundColor: '#f2f2f2',
        padding:'10px',
        border:'1px solid black',
        top:0,
        zIndex:1,
        fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
        whiteSpace: 'nowrap'
    }

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }

    const cardRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid #eee'
    }

    const cardLabelStyle = {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '0.875rem'
    }

    const cardValueStyle = {
        color: '#555',
        fontSize: '0.875rem',
        textAlign: 'right'
    }

    return(
        <div>
            <style>{`
                @media (max-width: 768px) {
                    .desktop-view { display: none !important; }
                    .mobile-view { display: block !important; }
                }
                @media (min-width: 769px) {
                    .desktop-view { display: block !important; }
                    .mobile-view { display: none !important; }
                }
            `}</style>
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
                <div style={{marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center'}}>
                    <button 
                        className="btn-primary"
                        onClick={handleConfirmSelected}
                        disabled={selectedBookings.length === 0 || isConfirmingBatch}
                        style={{
                            opacity: selectedBookings.length === 0 || isConfirmingBatch ? 0.6 : 1,
                            cursor: selectedBookings.length === 0 || isConfirmingBatch ? 'not-allowed' : 'pointer',
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            padding: '0.5rem 1rem'
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
                                cursor: 'pointer',
                                fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                            }}
                        >
                            Clear Selection
                        </button>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="desktop-view" style={{overflowX:'auto', overflowY:'auto', maxHeight:'500px'}}>
                <table style={{borderCollapse:'collapse', width:'100%', minWidth: '900px'}}>
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
                        <th style={tableHeadStyle}>Status</th>
                        <th style={tableHeadStyle}>Action</th>
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
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.booking_id}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.name}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.phone}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.meal_type}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.date}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.booking_time ? new Date(booking.booking_time).toLocaleTimeString() : 'N/A'}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.persons}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>Rs. {parseFloat(booking.total_amount || 0).toFixed(2)}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'}}>{booking.status}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>
                                    <button 
                                        className="btn-primary"
                                        onClick={() => handleConfirm(booking.booking_id)}
                                        disabled={confirmingId !== null}
                                        style={{
                                            opacity: confirmingId === booking.booking_id ? 0.6 : 1,
                                            cursor: confirmingId !== null ? 'not-allowed' : 'pointer',
                                            fontSize: '0.875rem',
                                            padding: '0.4rem 0.8rem'
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

                {/* Mobile Card View */}
                <div className="mobile-view">
                    {bookings.slice().reverse().map((booking, index) => (
                        <div key={booking.booking_id || index} style={cardStyle}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                                <input 
                                    type="checkbox"
                                    checked={selectedBookings.includes(booking.booking_id)}
                                    onChange={() => handleSelectBooking(booking.booking_id)}
                                    style={{cursor: 'pointer', transform: 'scale(1.2)'}}
                                />
                                <span style={{fontWeight: 'bold', color: '#220303ff', fontSize: '0.9rem'}}>{booking.booking_id}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Name:</span>
                                <span style={cardValueStyle}>{booking.name}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Phone:</span>
                                <span style={cardValueStyle}>{booking.phone}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Meal Type:</span>
                                <span style={cardValueStyle}>{booking.meal_type}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Date:</span>
                                <span style={cardValueStyle}>{booking.date}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Time:</span>
                                <span style={cardValueStyle}>{booking.booking_time ? new Date(booking.booking_time).toLocaleTimeString() : 'N/A'}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Persons:</span>
                                <span style={cardValueStyle}>{booking.persons}</span>
                            </div>
                            <div style={cardRowStyle}>
                                <span style={cardLabelStyle}>Amount:</span>
                                <span style={cardValueStyle}>Rs. {parseFloat(booking.total_amount || 0).toFixed(2)}</span>
                            </div>
                            <div style={{...cardRowStyle, borderBottom: 'none'}}>
                                <span style={cardLabelStyle}>Status:</span>
                                <span style={cardValueStyle}>{booking.status}</span>
                            </div>
                            <button 
                                className="btn-primary"
                                onClick={() => handleConfirm(booking.booking_id)}
                                disabled={confirmingId !== null}
                                style={{
                                    width: '100%',
                                    marginTop: '0.75rem',
                                    opacity: confirmingId === booking.booking_id ? 0.6 : 1,
                                    cursor: confirmingId !== null ? 'not-allowed' : 'pointer',
                                    padding: '0.6rem'
                                }}
                            >
                                {confirmingId === booking.booking_id ? 'Confirming...' : 'Confirm'}
                            </button>
                        </div>
                    ))}
                </div>
            </>
            )}
        </div>
    )
}
