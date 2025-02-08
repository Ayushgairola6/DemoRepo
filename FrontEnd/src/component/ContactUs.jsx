import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {/* Customer Support Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Support Information</h2>

          {/* Email Support */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600">Email Support</h3>
            <p className="text-gray-500">For general inquiries, billing, or troubleshooting, reach out to us at:</p>
            <a href="mailto:Extendedleaseco24@gmail.com" className="text-blue-500 hover:underline">Extendedleaseco24@gmail.com</a>
          </div>

          {/* Live Chat or Contact Form */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600">Live Chat</h3>
            <p className="text-gray-500">For quick inquiries, use our live chat or fill out the contact form below:</p>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black focus:ring focus:ring-blue-300">
              Start Live Chat
            </button>
          </div>

           {/* Phone Support */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600">Phone Support</h3>
            <p className="text-gray-500">Call us at:</p>
            <a href="tel:+1 (608) 620-4790" className="text-blue-500 hover:underline">+1 (608) 620-4790</a>
          </div>

          {/* Mailing Address */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600">Mailing Address</h3>
            <p className="text-gray-500">Send us mail at:</p>
            <a href="mailto:Extendedleaseco24@gmail.com" className="text-blue-500 hover:underline">Extendedleaseco24@gmail.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Form</h2>
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black rounded-lg font-bold focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Your message has been sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
export default ContactUs;
