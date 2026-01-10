import { useTranslation } from "react-i18next";
export default function PrivacyPolicy() {
  const t = useTranslation().t;
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{t("Privacy Policy")}</h1>
      <p style={dateStyle}>{t("Last updated: December 12, 2025")}</p>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("1. Information We Collect")}</h2>
        <p>{t("When you book a meal through Mahaprasadam, we collect the following information:")}</p>
        <ul style={listStyle}>
          <li>{t("Personal identification: Name")}</li>
          <li>{t("Contact information: Phone number")}</li>
          <li>{t("Booking details: Meal date, meal type (breakfast/lunch/dinner), number of persons")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("2. How We Use Your Information")}</h2>
        <p>{t("We use the collected information for:")}</p>
        <ul style={listStyle}>
          <li>{t("Processing and confirming your meal bookings")}</li>
          <li>{t("Contacting you regarding your booking status")}</li>
          <li>{t("Managing meal preparation and service")}</li>
          <li>{t("Improving our booking system and services")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("3. Data Storage and Security")}</h2>
        <p>{t("Your booking information is stored locally and securely. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("4. Data Retention")}</h2>
        <p>{t("We retain your booking information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("5. Third-Party Disclosure")}</h2>
        <p>{t("We do not sell, trade, or transfer your personal information to third parties. Your data is used solely for managing meal bookings at Mahaprasadam.")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("6. Your Rights")}</h2>
        <p>{t("You have the right to:")}</p>
        <ul style={listStyle}>
          <li>{t("Access your booking information")}</li>
          <li>{t("Request correction of inaccurate data")}</li>
          <li>{t("Request deletion of your data")}</li>
          <li>{t("Withdraw consent at any time")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>{t("7. Contact Us")}</h2>
        <p>{t("If you have any questions about this Privacy Policy, please contact us:")}</p>
        <p>{t("Phone: +91 9748005891")}</p>
        <p>{t("Address: ISKCON Kalyani (B9/63 Kalyani)")}</p>
      </section>
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
