import React from 'react';

const ContactInfo = () => {
  const containerStyle = {
    padding: '40px 5%',
    maxWidth: '800px',
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

  const itemStyle = {
    marginBottom: '18px',
    fontSize: '18px',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#374151',
  };

  const emailStyle = {
    color: '#2563eb',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Information</h1>

      <p style={itemStyle}>
        <span style={labelStyle}>Merchant Legal Entity Name:</span> ARYAN YADAV
      </p>

      <p style={itemStyle}>
        <span style={labelStyle}>Registered Address:</span> Pandeywala, Jwalapur, Uttarakhand, PIN: 249407
      </p>

      <p style={itemStyle}>
        <span style={labelStyle}>Operational Address:</span> Pandeywala, Jwalapur, Uttarakhand, PIN: 249407
      </p>

      <p style={itemStyle}>
        <span style={labelStyle}>Telephone No:</span> 9368640891
      </p>

      <p style={itemStyle}>
        <span style={labelStyle}>E-Mail ID:</span>{' '}
        <a style={emailStyle} href="mailto:annieshoporignal@gmail.com">
          annieshoporignal@gmail.com
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
