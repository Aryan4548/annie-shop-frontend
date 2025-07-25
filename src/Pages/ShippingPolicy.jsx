import React from 'react';

const ShippingPolicy = () => {
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

  const paragraphStyle = {
    fontSize: '18px',
    marginBottom: '16px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Shipping Policy</h1>

      <p style={paragraphStyle}>
        Every <strong>PAN India</strong> order will be shipped within <strong>2–3 days</strong> and will be delivered
        within <strong>5–7 days</strong>.
      </p>

      <p style={paragraphStyle}>
        For <strong>international orders</strong>, the order will be shipped within <strong>2–3 days</strong> and will be
        delivered within <strong>15–45 days</strong> depending on the distance and customs procedures of the destination country.
      </p>
    </div>
  );
};

export default ShippingPolicy;
