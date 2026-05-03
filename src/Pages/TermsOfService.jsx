import React from 'react';

const TermsOfService = () => {
  const containerStyle = {
    padding: '40px 5%',
    maxWidth: '850px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    lineHeight: '1.7',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '24px',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '6px',
    color: '#111827',
  };

  const paragraphStyle = {
    fontSize: '17px',
    marginBottom: '18px',
  };

  const listItemStyle = {
    fontSize: '16px',
    marginBottom: '14px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Terms of Service</h1>

      <p style={paragraphStyle}>Last updated on 20-01-2025 20:07:46</p>

      <p style={paragraphStyle}>
        These Terms and Conditions, along with the privacy policy or other terms (“Terms”), constitute a binding agreement
        between <strong>ARYAN YADAV</strong> (“Website Owner” or “we” or “us” or “our”) and you (“you” or “your”) and relate to your
        use of our website, goods, or services (collectively, “Services”).
      </p>

      <p style={paragraphStyle}>
        By using our website and availing the Services, you agree that you have read and accepted these Terms. We may update
        these Terms at any time, and it is your responsibility to check them periodically.
      </p>

      <ul style={{ paddingLeft: '20px' }}>
        <li style={listItemStyle}>You agree to provide accurate and complete information during registration.</li>
        <li style={listItemStyle}>
          We do not guarantee the accuracy, completeness, or performance of the content on our website or Services.
        </li>
        <li style={listItemStyle}>
          You agree to use the Services at your own risk and acknowledge your responsibility for assessing suitability.
        </li>
        <li style={listItemStyle}>
          All content on the Website is proprietary and protected by intellectual property laws.
        </li>
        <li style={listItemStyle}>
          Unauthorized use of the Website or Services may lead to legal action.
        </li>
        <li style={listItemStyle}>You agree to pay all applicable charges associated with availing our Services.</li>
        <li style={listItemStyle}>You shall not use the Website or Services for any unlawful purposes.</li>
        <li style={listItemStyle}>
          Third-party websites accessed through our platform are governed by their own terms and policies.
        </li>
        <li style={listItemStyle}>
          Initiating a transaction implies a legally binding agreement with us for the Service.
        </li>
        <li style={listItemStyle}>
          You may claim a refund as per the timelines defined in our policies. Claims beyond the window will be ineligible.
        </li>
        <li style={listItemStyle}>
          We are not liable for delays due to force majeure events (natural disasters, etc.).
        </li>
        <li style={listItemStyle}>
          These Terms shall be governed by the laws of India, and any disputes will be subject to the courts of Jwalapur, Uttarakhand.
        </li>
      </ul>

      <p style={paragraphStyle}>
        For any questions or communications regarding these Terms, please use the contact details provided on our website.
      </p>
    </div>
  );
};

export default TermsOfService;
