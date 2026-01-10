import { useTranslation } from "react-i18next";

export default function BookDetail({bookingId, mealType, date, time, numberOfPeople, customerName, phoneNumber, totalAmount}) {

    const t = useTranslation().t;

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
            <div style={headingStyle}>{t("Your Booking Details")}</div>
           <table style={{ fontSize: "18px" }}>
              <tr>
                <td style={tabledataStyle}><strong>{t("Booking ID")}:</strong></td>
                <td style={tabledataStyle}>{bookingId}</td>
              </tr>
      <tbody>
        <tr>
          <td style={tabledataStyle}><strong>{t("Meal Type")}:</strong></td>
          <td style={tabledataStyle}>{t(mealType)}</td>
        </tr>
        <tr>
          <td style={tabledataStyle}><strong>{t("Date")}:</strong></td>
          <td style={tabledataStyle}>{date}</td>
        </tr>
        <tr>
          <td style={tabledataStyle}><strong>{t("Time")}:</strong></td>
          <td style={tabledataStyle}>{time}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>{t("Number of People")}:</strong></td>
            <td style={tabledataStyle}>{numberOfPeople}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>{t("Customer Name")}:</strong></td>
            <td style={tabledataStyle}>{customerName}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>{t("Phone Number")}:</strong></td>
            <td style={tabledataStyle}>{phoneNumber}</td>
        </tr>
        <tr>
            <td style={tabledataStyle}><strong>{t("Total Amount:")}</strong></td>
            <td style={tabledataStyle}>{totalAmount}</td>
        </tr>
      </tbody>
    </table>
        </div>
    );
}