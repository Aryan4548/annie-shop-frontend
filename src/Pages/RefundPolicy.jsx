import React from 'react';

const RefundPolicy = () => {
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
      <h1 style={headingStyle}>Refund Policy</h1>

      <p style={paragraphStyle}>
        <strong>ARYAN YADAV</strong> believes in helping its customers as far as possible and has therefore adopted a liberal cancellation and refund policy. Please read the points below to understand how refunds and cancellations are handled:
      </p>

      <ul style={{ paddingLeft: '20px' }}>
        <li style={listItemStyle}>
          Cancellations will be considered only if the request is made immediately after placing the order. However, cancellation may not be possible if the order has already been processed by vendors or merchants.
        </li>
        <li style={listItemStyle}>
          ARYAN YADAV does not accept cancellations for perishable items like flowers or eatables. However, a refund or replacement may be issued if the quality of the delivered product is proven to be unsatisfactory.
        </li>
        <li style={listItemStyle}>
          In case of receipt of damaged or defective items, customers must report the issue to our Customer Service team within 7 days of receipt. After verification by the merchant, the issue will be addressed accordingly.
        </li>
        <li style={listItemStyle}>
          If the product received is not as displayed on the site or does not meet your expectations, you should notify customer service within 7 days of receipt. The team will investigate and provide an appropriate resolution.
        </li>
        <li style={listItemStyle}>
          For items with a manufacturer warranty, please contact the manufacturer directly for support or replacement.
        </li>
        <li style={listItemStyle}>
          If a refund is approved by <strong>ARYAN YADAV</strong>, it will be processed within 1–2 business days and credited to the customer's original payment method.
        </li>
      </ul>
    </div>
  );
};

export default RefundPolicy;
