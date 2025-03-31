
import React, { useState } from "react";
import { motion } from "framer-motion";

const DataProtectionInfo = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const securitySections = [
    {
      id: 1,
      title: "End-to-End Encryption",
      icon: "🔒",
      description: "Your messages and sensitive data are encrypted from the moment they leave your device until they reach the intended recipient. No one else can access them—not even us.",
      details: [
        "256-bit AES encryption",
        "Secure key exchange protocols",
        "No plaintext data storage"
      ]
    },
    {
      id: 2,
      title: "Secure Storage",
      icon: "🏢",
      description: "All your data is stored in compliant, state-of-the-art data centers with advanced access controls and regular audits.",
      details: [
        "ISO 27001 certified data centers",
        "Regular security audits",
        "Redundant backups"
      ]
    },
    {
      id: 3,
      title: "Continuous Monitoring",
      icon: "👁️",
      description: "We employ real-time monitoring and threat detection systems to protect against unauthorized access or breaches.",
      details: [
        "24/7 security monitoring",
        "Automated threat detection",
        "Instant alert system"
      ]
    },
    {
      id: 4,
      title: "Privacy Controls",
      icon: "🛡️",
      description: "You have complete control over your privacy settings and data sharing preferences.",
      details: [
        "Customizable privacy settings",
        "Data export options",
        "Account deletion rights"
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Security is Our Priority
          </h1>
          <p className="text-xl text-gray-600">
            We use industry-leading security measures to protect your data and privacy
          </p>
        </motion.div>

        <div className="grid gap-6">
          {securitySections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl
                ${expandedSection === section.id ? 'ring-2 ring-pink-500' : ''}`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{section.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                
                <p className="text-gray-600 text-lg mb-4">{section.description}</p>

                <motion.div
                  initial={false}
                  animate={{ height: expandedSection === section.id ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  {expandedSection === section.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Key Features:</h3>
                      <ul className="space-y-2">
                        {section.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <span className="text-pink-500">•</span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>

                <div className="flex justify-end mt-2">
                  <motion.button
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ▼
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-r from-[#9a1f40] to-[#ff3366] p-8 rounded-xl text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Have Questions About Security?</h2>
          <p className="text-lg mb-6">Our team is here to help you understand how we protect your data</p>
          <button 
            className="bg-white text-[#9a1f40] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DataProtectionInfo;
