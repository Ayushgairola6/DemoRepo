import React, { useState } from "react";

const PlanType = ({ plan }) => {
  const { title, idealFor, price, features, benefits } = plan;
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleSubscribeClick = () => {
    setShowModal(true); // Show modal on button click
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="max-w-4xl w-full bg-white bg-opacity-85 rounded-lg shadow-lg p-8">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h1>
      <p className="text-xl text-gray-600 mb-3 text-center">{idealFor}</p>

      {/* Pricing Section */}
      <div className="mb-6">
        <p className="text-4xl font-extrabold text-red-600">${price}/month</p>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
        <ul className="text-gray-700 space-y-3 list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Benefits Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Benefits</h2>
        <ul className="text-gray-700 space-y-3 list-disc list-inside">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* CTA Section */}
      <div className="flex justify-center">
        <button
          onClick={handleSubscribeClick}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-800 transition"
        >
          Subscribe Now
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Cross Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Subscribe to {title}
            </h2>
            <p className="mb-4 text-gray-600">
              Thank you for choosing the {title} plan for just ${price}/month.
            </p>
            <img
              src="../../src/assets/qrCode.png" // Replace with your QR code image path
              alt="QR Code"
              className="w-full h-auto mb-4"
            />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanType;
