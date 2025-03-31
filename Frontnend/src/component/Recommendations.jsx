import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recommendations.css"; // Import specific styles for Recommendations

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("https://luvlensebackend.onrender/api/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-container">
      <div className="recommendations-card">
        <h2 className="section-title">Personalized Recommendations</h2>

        {/* Recommendations List */}
        <div className="recommendations-list">
       {/*   {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div className="recommendation-item" key={index}>
                <h3>{rec.title}</h3>
                <p>{rec.description}</p>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}*/}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
