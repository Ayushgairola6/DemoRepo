import React from "react";
import "./VirtualDatePlanning.css"; // Correct relative path for styles
const VirtualDatePlanning = () => {
  return (
    <div  className="virtual-date-planning">
      <div className="virtual-date-planning-card">
        <h2 className="section-title">Virtual Date Planning Resources</h2>

        {/* Curated Virtual Date Ideas */}
        <div className="virtual-date-content">
          <h3> Virtual Date Ideas:</h3>
          <ul>
            <li>Play online games together.</li>
            <li>Watch a movie on Rave.</li>
            <li>Cook or bake the same recipe while video chatting</li>
            <li>Attend an online concert or virtual event together</li>
          </ul>
        </div>

        {/* Tips for Long-Distance Connections */}
        <div className="virtual-date-tips">
          <h3>Tips for Building Meaningful Long-Distance Connections:</h3>
          <ul>
            <li>Be open and honest in your communication</li>
            <li>Make time for regular check-ins and video calls</li>
            <li>Send small surprises like letters or care packages</li>
            <li>Set clear goals for your relationship and stay committed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VirtualDatePlanning;
