import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredFeature, setHoveredFeature] = useState(null);


  const plans = [
    {
      name: "Basic",
      price: {
        monthly: 9.99,
        yearly: 99.99
      },
      features: [
        {
          text: "Starter Connection",
          description: "Begin your journey with essential matching features"
        },
        {
          text: "Profile Creation",
          description: "Create and customize your basic profile"
        },
        {
          text: "Unlimited Browsing",
          description: "Browse through potential matches without limits"
        },
        {
          text: "Match Chemistry Quiz (limited)",
          description: "Access basic compatibility testing features"
        },
        {
          text: "One-Time Match Recommendation",
          description: "Receive one curated match recommendation"
        },
        {
          text: "Messaging: Send up to 10 messages",
          description: "Limited messaging capability for initial connections"
        },
        {
          text: "Basic Data Analysis",
          description: "Access fundamental matching insights"
        },
        {
          text: "Support: Email support with a 24-48 hour response time",
          description: "Standard customer support services"
        }
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Premium",
      price: {
        monthly: 24.99,
        yearly: 249.99
      },
      features: [
        {
          text: "Engaged Connection",
          description: "Enhanced matching capabilities for deeper connections"
        },
        {
          text: "Profile Creation & Enhanced Customization",
          description: "Advanced profile customization options"
        },
        {
          text: "Unlimited Matchmaking",
          description: "No limits on matching and connections"
        },
        {
          text: "Extended Match Chemistry Quiz",
          description: "Full access to compatibility assessment tools"
        },
        {
          text: "Unlimited Match Recommendations",
          description: "Receive unlimited personalized match suggestions"
        },
        {
          text: "Messaging & Communication",
          description: "Unlimited messaging with all features"
        },
        {
          text: "Enhanced Data Insights",
          description: "Detailed analytics and matching insights"
        },
        {
          text: "Priority Support: 12-24 hour response",
          description: "Faster customer support response"
        },
        {
          text: "Virtual Date Planning Resources",
          description: "Access to virtual date planning tools"
        }
      ],
      popular: true,
      color: "from-[#9a1f40] to-[#ff3366]"
    },
    {
      name: "Elite",
      price: {
        monthly: 39.99,
        yearly: 399.99
      },
      features: [
        {
          text: "True Connection",
          description: "Premium matching experience with all features"
        },
        {
          text: "Comprehensive Profile Creation & Customization",
          description: "Full profile customization with all premium features"
        },
        {
          text: "Priority Placement in Search Results",
          description: "Get noticed first in search results"
        },
        {
          text: "In-Depth Match Chemistry Quiz & Analysis",
          description: "Advanced compatibility analysis and insights"
        },
        {
          text: "Unlimited Match Recommendations & Behavioral Matching",
          description: "AI-powered matching recommendations"
        },
        {
          text: "Exclusive Virtual Relationship Coaching",
          description: "One-on-one coaching sessions"
        },
        {
          text: "Unlimited Messaging & Priority Communication",
          description: "Priority messaging features"
        },
        {
          text: "Real-Time Analytics Dashboard",
          description: "Comprehensive analytics and insights"
        },
        {
          text: "Elite Support: 24/7 VIP",
          description: "Round-the-clock premium support"
        },
        {
          text: "Free Access to Premium Events & Webinars",
          description: "Exclusive access to premium content"
        }
      ],
      popular: false,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateSavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyTotal - yearlyCost;
    return Math.round(savings);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect match with our flexible pricing options
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200
                ${billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              Monthly
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200
                ${billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save up to 20%
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl
                  ${plan.popular ? 'ring-2 ring-[#ff3366]' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white px-4 py-2 text-center text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h2>
                  <div className="mb-6">
                    <p className="text-4xl font-extrabold text-gray-900">
                      ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </p>
                    <p className="text-gray-500">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </p>
                    {billingCycle === 'yearly' && (
                      <p className="text-green-500 text-sm mt-2">
                        Save ${calculateSavings(plan)} yearly
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        onMouseEnter={() => setHoveredFeature(`${plan.name}-${i}`)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="text-green-500">✓</span>
                          {feature.text}
                        </div>
                        <AnimatePresence>
                          {hoveredFeature === `${plan.name}-${i}` && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute z-10 bg-gray-800 text-white text-sm rounded-lg p-3 mt-2 w-64"
                            >
                              {feature.description}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r ${plan.color} 
                      transform transition-all duration-200 hover:shadow-lg`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Subscription Modal */}
        <AnimatePresence>
          {showModal && selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Subscribe to {selectedPlan.name}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {billingCycle === 'monthly' 
                        ? `$${selectedPlan.price.monthly}/month`
                        : `$${selectedPlan.price.yearly}/year`}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <img
                    src="../../src/assets/qrCode.png"
                    alt="QR Code"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Scan the QR code to complete your subscription
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Money Back Guarantee */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            30-Day Money Back Guarantee
          </h2>
          <p className="text-gray-600">
            Try any plan risk-free. If you're not completely satisfied, we'll refund your payment.
            No questions asked.
          </p>
        </motion.div> */}
      </div>

    </motion.div>
  );
};

export default PlanPage;
