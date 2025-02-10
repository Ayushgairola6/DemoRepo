import React from "react";

const DataProtectionInfo = () => (
  <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 opacity-95 flex flex-col gap-6">
    <h2 className="font-bold text-2xl text-gray-800">
      Data Protection & Encryption
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed">
      We prioritize your security and privacy. Here’s how we protect your data:
    </p>
    <ul className="list-disc pl-6 text-gray-700 text-lg leading-relaxed">
      <li>
        <strong>End-to-End Encryption:</strong> Your messages and sensitive data
        are encrypted from the moment they leave your device until they reach
        the intended recipient. No one else can access them—not even us.
      </li>
      <li>
        <strong>Secure Storage:</strong> All your data is stored in compliant,
        state-of-the-art data centers with advanced access controls and regular
        audits.
      </li>
      <li>
        <strong>Continuous Monitoring:</strong> We employ real-time monitoring
        and threat detection systems to protect against unauthorized access or
        breaches.
      </li>
    </ul>
    <p className="text-gray-700 text-lg leading-relaxed">
      Rest assured, we follow industry-leading standards to keep your
      information safe at all times.
    </p>
  </div>
);

export default DataProtectionInfo;
