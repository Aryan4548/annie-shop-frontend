import React from 'react';
import { useUser } from '../Context/UserContext';

const Profile = () => {
  const { user } = useUser();

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Profile</h2>

      {user ? (
        <>
          <img
            src="/images/demo-avatar.png"
            alt="avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '1rem',
            }}
          />
          <div style={{ marginBottom: '1rem', fontSize: '18px' }}>
            <strong>Name:</strong> {user.name}
          </div>
          <div style={{ fontSize: '18px' }}>
            <strong>Email:</strong> {user.email}
          </div>
        </>
      ) : (
        <p style={{ fontSize: '16px' }}>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
