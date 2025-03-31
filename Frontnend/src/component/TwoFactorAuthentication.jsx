import React, { useState, useEffect } from "react";
import axios from "axios";

const TwoFactorAuthentication = () => {
   
  const [enabled, setEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // State to store user email input
  const [loading, setLoading] = useState(true);

  // Fetch current 2FA status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/2fa-status`,
          {
            headers: {
              Authorization: `Bearer ${"token"}`,
            },
          }
        );
        setEnabled(response.data.enabled);
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, ["token"]);

  const handleGenerateQRCode = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const qrResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/setup-2fa`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${"token"}`,
          },
        }
      );
      setQrCodeUrl(qrResponse.data.qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      if (enabled == false && !email) {
        alert("Please provide email");
        return;
      }
      
      const enable = !enabled; // Toggle the current status
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}/2fa/enable_disable`,
        { enable },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // On success, update the state and show a message
      setEnabled(enable);
      alert(response.data.message); // Alert message from backend
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      alert("Error toggling 2FA.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/verify-2fa`,
        { otp, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.verified) {
        alert("2FA setup verified successfully!");
        setEnabled(true);
        setQrCodeUrl("");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white opacity-90 shadow-lg rounded-lg border border-gray-200">
      <h2 className="font-bold text-2xl text-gray-800">
        Two-Factor Authentication
      </h2>

      {/* Email Input Field */}
      {!enabled && (
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-lg font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-xl max-w-[80%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <button
            onClick={handleGenerateQRCode}
            className="bg-blue-500 text-white py-2 px-4 rounded-xl"
            disabled={loading || !email}
          >
            Generate QR Code
          </button>
        </div>
      )}

      {!enabled && qrCodeUrl && (
        <div className="text-gray-600 text-sm bg-gray-100 p-4 rounded-md border border-gray-300 max-w-[45rem]">
          <p>
            Scan the QR code below with an authenticator app (e.g., Google
            Authenticator, Authy):
          </p>
          <img src={qrCodeUrl} alt="QR Code" className="max-w-[20rem] mt-4" />
          <div className="mt-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-2 rounded-xl max-w-[80%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-black text-white py-2 rounded-xl w-[40%] mt-2"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="text-lg font-medium text-gray-700">Enable 2FA:</label>
        <input
          className="w-6 h-6 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
        />
      </div>
      {enabled && (
        <div className="text-green-600 font-medium">
          2FA is currently enabled for your account.
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthentication;
