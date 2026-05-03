import React from 'react';

const PrivacyPolicy = () => {
  const containerStyle = {
    padding: '40px 5%',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
    lineHeight: '1.7',
    backgroundColor: '#f9fafb',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '6px',
    color: '#111827',
  };

  const sectionHeadingStyle = {
    fontSize: '22px',
    fontWeight: '600',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#111827',
  };

  const paragraphStyle = {
    marginBottom: '16px',
  };

  const listStyle = {
    paddingLeft: '20px',
    marginBottom: '16px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Privacy Policy</h1>
      <p style={paragraphStyle}><strong>Last updated: June 11, 2025</strong></p>
      <p style={paragraphStyle}>
        My Store operates this store and website, including all related information, content, features, tools, products and services...
      </p>

      <h2 style={sectionHeadingStyle}>Personal Information We Collect or Process</h2>
      <p style={paragraphStyle}>
        When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you...
      </p>
      <ul style={listStyle}>
        <li>Contact details including your name, address, billing and shipping address, phone, and email.</li>
        <li>Financial and payment details.</li>
        <li>Account information like username and preferences.</li>
        <li>Usage and device information.</li>
      </ul>

      <h2 style={sectionHeadingStyle}>Personal Information Sources</h2>
      <p style={paragraphStyle}>
        We may collect personal information from:
      </p>
      <ul style={listStyle}>
        <li>Directly from you</li>
        <li>Automatically through the Services</li>
        <li>Service providers</li>
        <li>Partners or third parties</li>
      </ul>

      <h2 style={sectionHeadingStyle}>How We Use Your Personal Information</h2>
      <ul style={listStyle}>
        <li>Provide, tailor, and improve the Services</li>
        <li>Marketing and advertising</li>
        <li>Security and fraud prevention</li>
        <li>Legal compliance and communication</li>
      </ul>

      <h2 style={sectionHeadingStyle}>How We Disclose Personal Information</h2>
      <p style={paragraphStyle}>
        We may disclose your information to Shopify, partners, or as required by law, business transitions, or your consent.
      </p>

      <h2 style={sectionHeadingStyle}>Relationship with Shopify</h2>
      <p style={paragraphStyle}>
        This site is hosted by Shopify, which also processes data. For more information, see the Shopify Privacy Policy or contact their support.
      </p>

      <h2 style={sectionHeadingStyle}>Third-Party Websites and Links</h2>
      <p style={paragraphStyle}>
        We are not responsible for the privacy practices of third-party sites linked from our Services.
      </p>

      <h2 style={sectionHeadingStyle}>Children's Data</h2>
      <p style={paragraphStyle}>
        We do not knowingly collect data from children under the age of majority. Contact us if such data is found.
      </p>

      <h2 style={sectionHeadingStyle}>Security and Retention</h2>
      <p style={paragraphStyle}>
        While we use safeguards to protect your data, no method is completely secure. We retain data as long as necessary for legal or business purposes.
      </p>

      <h2 style={sectionHeadingStyle}>Your Rights and Choices</h2>
      <ul style={listStyle}>
        <li>Right to access, delete, correct, and port your data</li>
        <li>Manage communication preferences</li>
        <li>Opt-out of targeted marketing</li>
      </ul>

      <h2 style={sectionHeadingStyle}>Complaints</h2>
      <p style={paragraphStyle}>
        Contact us for privacy concerns. You may also reach out to your local data protection authority.
      </p>

      <h2 style={sectionHeadingStyle}>International Transfers</h2>
      <p style={paragraphStyle}>
        We may transfer data internationally with proper safeguards, including Standard Contractual Clauses.
      </p>

      <h2 style={sectionHeadingStyle}>Changes to This Policy</h2>
      <p style={paragraphStyle}>
        We may update this Privacy Policy. Changes will be posted on this page with the effective date.
      </p>

      <h2 style={sectionHeadingStyle}>Contact</h2>
      <p style={paragraphStyle}>
        Email: <a href="mailto:annieshoporignal@gmail.com">annieshoporignal@gmail.com</a><br />
        Address: Gughal Mandir Pandeywala Subhash Nagar, K95, Jwalapur, UK, 249407, IN
      </p>
    </div>
  );
};

export default PrivacyPolicy;
