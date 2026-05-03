import React from 'react';
import './Hero.css';

const Hero = ({ scrollRef }) => {
  const handleScroll = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="hero-image-section">
      <div className="hero-overlay">
        <h1 className="hero-heading">UNLEASH YOUR INNER HERO</h1>
        <button className="hero-button" onClick={handleScroll}>
          Latest Collection →
        </button>
      </div>
    </div>
  );
};

export default Hero;
