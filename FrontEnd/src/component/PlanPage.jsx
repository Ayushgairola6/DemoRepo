import React, { useState } from "react";

const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // State for selected plan
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: [
        "Starter Connection",
        "Profile Creation",
        "Unlimited Browsing",
        "Match Chemistry Quiz(limited).",
        "One-Time Match Recommendation",
        "Messaging: Send up to 10 messages",
        "Basic Data Analysis",
        "Support: Email support with a 24-48 hour response time for inquiries.",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "$24.99",
      features: [
        "Engaged Connection",
        "Profile Creation & Enhanced Customization",
        "Unlimited Matchmaking",
        "Extended Match Chemistry Quiz",
        "Unlimited Match Recommendations",
        "Messaging & Communication",
        "Enhanced Data Insights",
        "Priority Support: Access to priority customer service with a response time of 12-24 hours.",
        "Virtual Date Planning Resources",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$39.99",
      features: [
        "True Connection",
        "Comprehensive Profile Creation & Customization",
        "Priority Placement in Search Results",
        "In-Depth Match Chemistry Quiz & Analysis",
        "Unlimited Match Recommendations & Behavioral Matching",
        "Exclusive Virtual Relationship Coaching",
        "Unlimited Messaging & Priority Communication",
        "Real-Time Analytics Dashboard",
        "Elite Support: 24/7 VIP",
        "Free Access to Premium Events & Webinars",
      ],
      popular: false,
    },
  ];

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan); // Set selected plan
    setShowModal(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-900">
            Pricing Plans
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Choose the plan that suits your needs.
          </p>
        </div>
        <div className="flex flex-wrap -m-8">
          {plans.map((plan, index) => (
            <div key={index} className="p-4 md:w-1/3">
              <div
                className={`h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white bg-opacity-85 hover:shadow-xl ${
                  plan.popular ? "border-red-600" : "border-gray-300"
                }`}
              >
                {plan.popular && (
                  <span className="bg-red-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                    Popular
                  </span>
                )}
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  {plan.name}
                </h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  {plan.price}
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /month
                  </span>
                </h1>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start ">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-300 text-gray-900 rounded-full flex-shrink-0">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`mt-auto text-white py-2 px-4 rounded shadow-md ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
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
              Subscribe to {selectedPlan.name}
            </h2>
            <p className="mb-4 text-gray-600">
              Thank you for choosing the {selectedPlan.name} plan for just{" "}
              {selectedPlan.price}/month.
            </p>
            
            {/* QR Code Image */}
            <img
              src="../../src/assets/qrCode.png" // Replace with your actual QR code path
              alt="QR Code"
              className="w-full h-auto mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlanPage;
