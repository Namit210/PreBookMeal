import qrImage from './assets/qrcode.jpeg';

export default function Qr(){
    const headingStyle={
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#220303ff'
    };

    const imageStyle={
        width:'90vh',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: '2rem 0 2rem 0'
    };

    const buttonStyle={
        backgroundColor: '#2f44a3ff',
        color: 'white',
        padding: '0.7rem 1.5rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem'
    };
    return(
        <>
        <div style={headingStyle}>Scan for QR Payment</div>
        <div style={imageStyle}>
            <img src={qrImage} style={{width:'25vh'}}/>
        </div>
        <span style={{color:'blue'}}>UPI ID: amitcredit02@okhdfcbank</span>
        <div>
            Scan this QR code with your preferrd payment app to complete your payment.
        </div>
        <button style={buttonStyle}>Pay on Mobile</button> <span>(for Mobile users)</span>
        </>
    )
}