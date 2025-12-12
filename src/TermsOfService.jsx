export default function TermsOfService() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Terms of Service</h1>
      <p style={dateStyle}>Last updated: December 12, 2025</p>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>1. Acceptance of Terms</h2>
        <p>By using the Mahaprasadam meal booking service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>2. Booking Policy</h2>
        <ul style={listStyle}>
          <li><strong>Booking Deadlines:</strong> To book a meal, you must place your booking before the following deadlines:
            <ul style={{...listStyle, marginTop: '0.5rem'}}>
              <li>Breakfast: Must be booked before 6:00 AM on the meal date</li>
              <li>Lunch: Must be booked before 10:00 AM on the meal date</li>
              <li>Dinner: Must be booked before 4:00 PM on the meal date</li>
            </ul>
          </li>
          <li><strong>Booking Confirmation:</strong> Your booking is subject to confirmation by the admin</li>
        </ul>
      </section>


      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>3. User Responsibilities</h2>
        <p>You agree to:</p>
        <ul style={listStyle}>
          <li>Provide accurate and complete information when booking</li>
          <li>Arrive on time for your scheduled meal</li>
          <li>Notify us promptly of any changes to your booking</li>
          <li>Respect the prasadam (sanctified food) and the temple premises</li>
          <li>Follow all rules and guidelines provided</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>4. Service Availability</h2>
        <p>We strive to fulfill all confirmed bookings. However, we reserve the right to cancel or reschedule bookings due to unforeseen circumstances such as:</p>
        <ul style={listStyle}>
          <li>Temple events or special occasions</li>
          <li>Insufficient resources</li>
          <li>Force majeure events</li>
        </ul>
        <p>In such cases, we will notify you as soon as possible.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>5. Prasadam (Sanctified Food)</h2>
        <p>The meals served are prasadam - food offered to Lord Krishna. We request all visitors to:</p>
        <ul style={listStyle}>
          <li>Treat the prasadam with respect</li>
          <li>Avoid waste</li>
          <li>Follow the dining etiquette as instructed</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>6. Limitation of Liability</h2>
        <p>Mahaprasadam shall not be liable for any indirect, incidental, or consequential damages arising from the use of our booking service or consumption of meals.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>8. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>9. Contact Information</h2>
        <p>For questions or concerns about these Terms of Service, please contact us:</p>
        <p>Phone: +91 8077871623</p>
        <p>Address: Kalyani</p>
      </section>

      <section style={sectionStyle}>
        <p style={{fontStyle: 'italic', color: '#666'}}>
          Hare Krishna! Thank you for using Mahaprasadam booking service.
        </p>
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
