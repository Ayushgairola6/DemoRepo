import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile");
      }
    };

    loadProfile();
  }, [userId]);

  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <p>Age: {profile.age}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
