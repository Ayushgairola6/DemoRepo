import React from "react";
import profiles from "../data.js";
import "./ProfileList.css";

const ProfileList = () => {
  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <div className="profile-card" key={index}>
          {/* Profile Image */}
          <img 
            src={profile.image} 
            alt={`${profile.name}'s profile`} 
            className="profile-image" 
          />
          
          {/* Profile Name */}
          <h2 className="profile-name">{profile.name}</h2>
          
          {/* Profile Location */}
          <p className="profile-location">{profile.location}</p>
          
          {/* Hobbies Section */}
          <div className="profile-hobbies">
            <strong>Hobbies:</strong>
            <ul>
              {profile.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
          
          {/* About Section */}
          <div className="profile-about">
            <strong>About:</strong>
            <ul>
              {profile.about.map((about, i) => (
                <li key={i}>{about}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
