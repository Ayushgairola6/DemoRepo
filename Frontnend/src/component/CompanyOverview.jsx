import React from 'react';
import './CompanyOverview.css'; 

const CompanyOverview = () => {
  return (
    <section className="company-overview">
      <h2>Company Overview</h2>
      <div className="content">
        {/* Box 1: */}
        <div className="box">
          <h3 className="text-black">Mission</h3>
          <p>
            Our mission is to bring love and creativity to life by providing innovative solutions that inspire connections and enhance experiences.
          </p>
        </div>
        {/* Box 2: */}
        <div className="box">
          <h3>Vision</h3>
          <p>
            Our vision is to be the leading platform that fosters meaningful relationships and inspires growth through technology and design.
          </p>
        </div>
        {/* Box 3: */}
        <div className="box">
          <h3>Values</h3>
          <p>
            We value creativity, empathy, and collaboration to make the world a more connected and inclusive place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;