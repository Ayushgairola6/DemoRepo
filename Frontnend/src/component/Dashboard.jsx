import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Profile Overview */}
      <div className="dashboard-box profile-box">
        <h2>Profile Overview</h2>
        <img src="/assets/profile-pic.png" alt="Profile" className="profile-img" />
        <p><strong>Name:</strong> Jane Doe</p>
        <p><strong>Age:</strong> 28</p>
        <p><strong>Match Chemistry Score:</strong> 85%</p>
        <button>Edit Profile</button>
      </div>

      {/* Matchmaking Section */}
      <div className="dashboard-box matchmaking-box">
        <h2>Matchmaking</h2>
        <p><strong>Closest Matches:</strong></p>
        <ul>
          <li>John Smith - 90%</li>
          <li>Emily Johnson - 87%</li>
          <li>Michael Brown - 85%</li>
        </ul>
        <button>Retake Chemistry Quiz</button>
      </div>

      {/* Messaging Section */}
      <div className="dashboard-box messaging-box">
        <h2>Messages</h2>
        <p><strong>Inbox:</strong> 5 new messages</p>
        <p><strong>Outbox:</strong> 2 sent messages</p>
        <button>View Messages</button>
      </div>

      {/* Virtual Date Planning Section */}
      <div className="dashboard-box virtual-date-box">
        <h2>Virtual Date Planning</h2>
        <p>Plan your next virtual date with these ideas:</p>
        <ul>
          <li>Watch a movie together</li>
          <li>Play online games</li>
          <li>Share a virtual dinner</li>
        </ul>
        <button>Start Planning</button>
      </div>
    </div>
  );
}

export default Dashboard;
