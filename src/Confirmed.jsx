import bookings from "./bookings.json";

export default function Confirmed(){
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
            <div style={{overflowY:'auto', maxHeight:'500px'}}>
                <table style={{borderCollapse:'collapse'}}>
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
                        <th style={tableHeadStyle}>Unconfirm</th>
                    </tr>
                    
                        {Object.values(bookings).filter(booking => booking.status === "Confirmed").map((booking, index) => (
                            <tr key={index}>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.booking_id}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.name}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.phone}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.meal}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.date}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.time}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.persons}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>Rs. {booking.total_amount.toFixed(2)}</td>
                                <td style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>{booking.status}</td>
                                <td  style={{padding:'10px', border:'1px solid black', textAlign:'center'}}>
                                <button  className="btn-primary">Unconfirm</button>

                                </td>
                            </tr>
                        ))}
                    
                </table>
            </div>
        </div>
    )
}