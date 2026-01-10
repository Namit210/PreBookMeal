import { useTranslation } from "react-i18next";

export default function PaymentVerification() {

    const t = useTranslation().t;
        const headingStyle={
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop:'2rem',
        color: '#220303ff'
    };
    return (
        <div>
            <div style={headingStyle}>{t("Payment Verification")}</div>
            <ul>
                <li>{t("After payment please send the screenshot of the payment confirmation to our admin at")} +91 9748005891</li>
                <li>{t("Your booking will be confirmed once the payment screenshot is verified by our admin.")}</li>
            </ul>
        </div>
    );
}