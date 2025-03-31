import React from "react";
import { UseStore } from '../store/store';
import { Link } from 'react-router-dom';

const Matched = () => {
  const { user, matchedUser } = UseStore();
  
  return (
    <>
      {/* Outside container with dark low opacity background */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "999",
        }}
      >
        {/* Main card that will show current user and matched user's image */}
        <div
          style={{
            backgroundColor: "white",
            height: "24rem",
            width: "24rem",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "fade-in 0.3s ease-out",
          }}
        >
          <h3
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            It's a match!
          </h3>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            {/* Current user's image */}
            <img
              src={
                user !== null
                  ? user[0].images[0]
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              } // Replace with your image URL
              alt="Your profile"
              style={{
                width: "6rem",
                height: "6rem",
                borderRadius: "50%",
                border: "4px solid white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            {/* Matched user's image */}
            <img
              src={
                matchedUser
                  ? matchedUser
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              } // Replace with your image URL
              alt="Matched profile"
              style={{
                width: "6rem",
                height: "6rem",
                borderRadius: "50%",
                border: "4px solid white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                backgroundImage: "linear-gradient(to right, #9a1f40, #ff3366)",
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.3s",
                fontWeight: "bold",
              }}
            >
              Keep Swiping
            </button>
            <Link
              to="/messages"
              style={{
                backgroundImage: "linear-gradient(to right, #84cc16, #22c55e)",
                color: "black",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                textAlign: "center",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
            >
              Chat
            </Link>
          </div>
        </div>
      </div>

      {/* Add custom animation keyframes for fade-in effect */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Matched;
