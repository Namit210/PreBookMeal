import { QRCodeSVG } from 'qrcode.react';

export default function Qr({totalAmount}){
    const upiLink = `upi://pay?pa=jagan89613j@barodampay&pn=JAGANNATH%20DHAM%20KALYANI&am=${totalAmount}`;
    
    const headingStyle={
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#220303ff'
    };

    const imageStyle={
        width:'100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0'
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
        <style>{`
            @media (max-width: 768px) {
                .qr-container {
                    text-align: center !important;
                }
                .qr-heading {
                    font-size: 1.2rem !important;
                    margin-bottom: 0.5rem !important;
                }
                .qr-image {
                    margin: 1rem 0 !important;
                }
                .qr-info {
                    margin: 0.5rem 0 !important;
                }
            }
            @media (min-width: 769px) {
                .mobile-pay-button {
                    display: none !important;
                }
            }
        `}</style>
        <div className="qr-container">
            <div className="qr-heading" style={headingStyle}>Scan for QR Payment</div>
            <div className="qr-image" style={imageStyle}>
                <QRCodeSVG value={upiLink} size={200} level="H" />
            </div>
            <div className="qr-info" style={{marginBottom: '0.5rem'}}>
                <span style={{color:'blue'}}>UPI ID: jagan89613j@barodampay</span>
            </div>
            <div className="qr-info" style={{marginBottom: '1rem'}}>
                Scan this QR code with your preferrd payment app to complete your payment.
            </div>
            <div className="mobile-pay-button">
                <a href={upiLink} style={{textDecoration: 'none'}}>
                    <button style={buttonStyle}>Pay on Mobile</button>
                </a>
            </div>
        </div>
        </>
    )
}