export default function PrivacyPolicy() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Privacy Policy</h1>
      <p style={dateStyle}>Last updated: December 12, 2025</p>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>1. Information We Collect</h2>
        <p>When you book a meal through Mahaprasadam, we collect the following information:</p>
        <ul style={listStyle}>
          <li>Personal identification: Name</li>
          <li>Contact information: Phone number</li>
          <li>Booking details: Meal date, meal type (breakfast/lunch/dinner), number of persons</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>2. How We Use Your Information</h2>
        <p>We use the collected information for:</p>
        <ul style={listStyle}>
          <li>Processing and confirming your meal bookings</li>
          <li>Contacting you regarding your booking status</li>
          <li>Managing meal preparation and service</li>
          <li>Improving our booking system and services</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>3. Data Storage and Security</h2>
        <p>Your booking information is stored locally and securely. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>4. Data Retention</h2>
        <p>We retain your booking information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>5. Third-Party Disclosure</h2>
        <p>We do not sell, trade, or transfer your personal information to third parties. Your data is used solely for managing meal bookings at Mahaprasadam.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul style={listStyle}>
          <li>Access your booking information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <p>Phone: +91 9748005891</p>
        <p>Address: ISKCON Kalyani (B9/63 Kalyani)</p>
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
