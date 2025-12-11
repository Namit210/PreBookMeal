export default function BookDetail({mealType, date, time, numberOfPeople, customerName, phoneNumber, totalAmount}) {

    const headingStyle={
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#220303ff'
    };

    const tabledataStyle={
        paddingRight: '7rem',
        paddingBottom: '0.5rem'
    }

    return (
        <div>
            <div style={headingStyle}>Your Booking Details</div>
           <table style={{ fontSize: "18px" }}>
      <tbody>
        <tr>
          <td style={tabledataStyle}><strong>Meal Type:</strong></td>
          <td style={tabledataStyle}>{mealType}</td>
        </tr>
        <tr>
          <td style={tabledataStyle}><strong>Date:</strong></td>
          <td style={tabledataStyle}>{date}</td>
        </tr>
        <tr>
          <td style={tabledataStyle}><strong>Time:</strong></td>
          <td style={tabledataStyle}>{time}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>Number of People:</strong></td>
            <td style={tabledataStyle}>{numberOfPeople}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>Customer Name:</strong></td>
            <td style={tabledataStyle}>{customerName}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>Phone Number:</strong></td>
            <td style={tabledataStyle}>{phoneNumber}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>Total Amount:</strong></td>
            <td style={tabledataStyle}>{totalAmount}</td>
        </tr>
      </tbody>
    </table>
        </div>
    );
}