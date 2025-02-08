import React from 'react';
import '../styles/Hero.css'; // Assuming Hero.jsx is in src/components

const Hero = () => {
  return (
    <div
      className="hero2"
      style={{ backgroundImage: '' }}
    >
      <div className="hero-content">
        <h1>Connect. Grow. Thrive Together.</h1>
        <p>
          Discover meaningful connections and build stronger relationships with
          our expert-guided programs.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Book a Session</button>
          <button className="btn-secondary">Join a Virtual Date</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
