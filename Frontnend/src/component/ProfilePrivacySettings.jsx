import React, { useState, useEffect } from "react";
import axios from "axios";

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState("");
  const [messagePrivacy, setMessagePrivacy] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch current privacy settings
  useEffect(() => {
    const fetchPrivacySettings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/privacy-settings`,
          {
            headers: {
              Authorization: `Bearer ${"token"}`,
            },
          }
        );
        setProfileVisibility(response.data.profileVisibility);
        setMessagePrivacy(response.data.messagePrivacy);
      } catch (error) {
        console.error("Error fetching privacy settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacySettings();
  }, ["token"]);

  // Handle privacy settings update
  const handleSaveSettings = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}/profile/privacy`,
        { profileVisibility, messagePrivacy },
        {
          headers: {
            Authorization: `Bearer ${"token"}`,
          },
        }
      );
      alert(response.data.message); // Success message from backend
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      alert("Error updating privacy settings.");
    }
  };

  if (loading) {
    return <p>Loading privacy settings...</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white opacity-90 shadow-lg rounded-lg border border-gray-200">
      <h2 className="font-bold text-2xl text-gray-800">Privacy Settings</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="text-lg font-medium text-gray-700">
            Profile Visibility:
          </label>
          <select
            className="border-gray-500 rounded focus:ring-2 focus:ring-blue-500"
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-lg font-medium text-gray-700">
            Message Privacy:
          </label>
          <select
            className="border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={messagePrivacy}
            onChange={(e) => setMessagePrivacy(e.target.value)}
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">Contacts Only</option>
            <option value="none">None</option>
          </select>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-black text-white py-2 rounded-xl w-full mt-4 max-w-[10rem]"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
