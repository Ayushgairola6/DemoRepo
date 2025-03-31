import React from 'react';
import './PlatformBenefits.css'; 

const PlatformBenefits = () => {
  return (
    <section className="platform-benefits">
      <h2>Platform Benefits</h2>
      <div className="flex-container">
        {/* Benefit Box 1 */}
        <div className="benefit-box">
          <p>Relationship Quiz: <br /> Tailored to understand your connection needs.</p>
        </div>
        {/* Benefit Box 2 */}
        <div className="benefit-box">
          <p>Data-Driven Recommendations: <br /> Customized insights for growth.</p>
        </div>
        {/* Benefit Box 3 */}
        <div className="benefit-box">
          <p>Comprehensive Analytics: <br /> Gain insights into patterns and trends in your connections.</p>
        </div>
        {/* Benefit Box 4 */}
        <div className="benefit-box">
          <p>Focus on Inclusivity: <br /> Supporting meaningful connections across all relationship types, even with incarcerated individuals.</p>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
