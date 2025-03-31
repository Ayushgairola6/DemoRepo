
import React, { useState } from "react";
import {motion} from 'framer-motion'

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {

        setModalMessage("Your message has been sent successfully! We'll get back to you soon.");
        setModalType("success");
        setShowModal(true);
        // Clear form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        const errorData = await response.json();
        setModalMessage(`Error: ${errorData.error || "Failed to send message. Please try again."}`);
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage("An error occurred. Please try again later.");
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  // Modal component
  const Modal = ({ message, type }) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white transform transition-transform duration-300 ease-in-out z-50`}>
      <p className="font-semibold">{message}</p>
    </div>
  );

  return (
    <motion.div 
      initial={{opacity:0}} 
      animate={{opacity:1,y:0}} 
      transition={{duration:0.5}} 
      className="min-h-screen bg-gradient-to-br from-lime-200 to-yellow-200 flex flex-col items-center py-10"
    >
      {showModal && (
        <Modal message={modalMessage} type={modalType} />
      )}
      
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {/* Customer Support Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Support Information</h2>

          {/* Email Support */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-medium text-gray-600">Email Support</h3>
            <p className="text-gray-500">For general inquiries, billing, or troubleshooting, reach out to us at:</p>
            <a href="mailto:Extendedleaseco24@gmail.com" className="text-blue-500 hover:underline">Extendedleaseco24@gmail.com</a>
          </div>

          {/* Live Chat or Contact Form */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-medium text-gray-600">Live Chat</h3>
            <p className="text-gray-500">For quick inquiries, use our live chat or fill out the contact form below:</p>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black focus:ring focus:ring-blue-300 transform hover:scale-105 transition-all duration-200">
              Start Live Chat
            </button>
          </div>

          {/* Phone Support */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-medium text-gray-600">Phone Support</h3>
            <p className="text-gray-500">Call us at:</p>
            <a href="tel:+1 (608) 620-4790" className="text-blue-500 hover:underline">+1 (608) 620-4790</a>
          </div>

          {/* Mailing Address */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-medium text-gray-600">Mailing Address</h3>
            <p className="text-gray-500">Send us mail at:</p>
            <a href="mailto:Extendedleaseco24@gmail.com" className="text-blue-500 hover:underline">Extendedleaseco24@gmail.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Form</h2>
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <label className="block text-gray-600 font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <label className="block text-gray-600 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <label className="block text-gray-600 font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-lg 
              hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black 
              font-bold focus:ring focus:ring-pink-300 transform hover:scale-105 
              transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </div>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};


export default ContactUs;
