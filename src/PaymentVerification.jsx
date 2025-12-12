export default function PaymentVerification() {
        const headingStyle={
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop:'2rem',
        color: '#220303ff'
    };
    return (
        <div>
            <div style={headingStyle}>Payment Verification</div>
            <ul>
                <li>After payment please send the screenshot of the payment confirmation to our admin at +91 9748005891</li>
                <li>Your booking will be confirmed once the payment screenshot is verified by our admin.</li>
            </ul>
        </div>
    );
}