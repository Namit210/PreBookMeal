import { useTranslation } from "react-i18next";
export default function TermsOfService() {
  const t = useTranslation().t;
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{t("Terms of Service")}</h1>
      <p style={dateStyle}>{t("Last updated: December 12, 2025")}</p>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("1. Acceptance of Terms")}</h2>
        <p>{t("By using the Mahaprasadam meal booking service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("2. Booking Policy")}</h2>
        <ul style={listStyle}>
          <li><strong>{t("Booking Deadlines:")}</strong> {t("To book a meal, you must place your booking before the following deadlines:")}
            <ul style={{...listStyle, marginTop: '0.5rem'}}>
              <li>{t("Breakfast: Must be booked before 7:00 AM on the meal date")}</li>
              <li>{t("Lunch: Must be booked before 10:00 AM on the meal date")}</li>
              <li>{t("Dinner: Must be booked before 6:00 PM on the meal date")}</li>
            </ul>
          </li>
          <li><strong>{t("Booking Confirmation:")}</strong> {t("Your booking is subject to confirmation by the admin")}</li>
        </ul>
      </section>


      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("3. User Responsibilities")}</h2>
        <p>{t("You agree to:")}</p>
        <ul style={listStyle}>
          <li>{t("Provide accurate and complete information when booking")}</li>
          <li>{t("Arrive on time for your scheduled meal")}</li>
          <li>{t("Notify us promptly of any changes to your booking")}</li>
          <li>{t("Respect the prasadam (sanctified food) and the temple premises")}</li>
          <li>{t("Follow all rules and guidelines provided")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("4. Service Availability")}</h2>
        <p>{t("We strive to fulfill all confirmed bookings. However, we reserve the right to cancel or reschedule bookings due to unforeseen circumstances such as:")}</p>
        <ul style={listStyle}>
          <li>{t("Temple events or special occasions")}</li>
          <li>{t("Insufficient resources")}</li>
          <li>{t("Force majeure events")}</li>
        </ul>
        <p>{t("In such cases, we will notify you as soon as possible.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("5. Prasadam (Sanctified Food)")}</h2>
        <p>{t("The meals served are prasadam - food offered to Lord Krishna. We request all visitors to:")}</p>
        <ul style={listStyle}>
          <li>{t("Treat the prasadam with respect")}</li>
          <li>{t("Avoid waste")}</li>
          <li>{t("Follow the dining etiquette as instructed")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("6. Limitation of Liability")}</h2>
        <p>{t("Mahaprasadam shall not be liable for any indirect, incidental, or consequential damages arising from the use of our booking service or consumption of meals.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("7. Changes to Terms")}</h2>
        <p>{t("We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("8. Governing Law")}</h2>
        <p>{t("These terms shall be governed by and construed in accordance with the laws of India.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("9. Contact Information")}</h2>
        <p>{t("For questions or concerns about these Terms of Service, please contact us:")}</p>
        <p>{t("Phone: +91 xxxxxxxxxx")}</p>
        <p>{t("Address: abc)")}</p>
      </section>

      {/* <section style={sectionStyle}>
        <p style={{fontStyle: 'italic', color: '#666'}}>
          {t("Hare Krishna Hare Krishna Krishna Krishna Hare Hare")} <br />
          {t("Hare Rama Hare Rama Rama Rama Hare Hare")}
        </p>
      </section> */}
    </div>
  );
}

const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '2rem',
  backgroundColor: '#fff',
  lineHeight: '1.6'
};

const headingStyle = {
  color: '#220303ff',
  fontSize: '2rem',
  marginBottom: '0.5rem'
};

const dateStyle = {
  color: '#666',
  fontSize: '0.9rem',
  marginBottom: '2rem'
};

const sectionStyle = {
  marginBottom: '2rem'
};

const subHeadingStyle = {
  color: '#2f44a3ff',
  fontSize: '1.3rem',
  marginBottom: '1rem'
};

const listStyle = {
  marginLeft: '1.5rem',
  marginTop: '0.5rem'
};
