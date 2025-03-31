import React from 'react';
import './Home.css';

function Footer() {
    return (
        <footer className=" bg-[#800020] text-white 00 p-3 mx-auto flex flex-col items-center text-center md:text-left">
        <div className="flex flex-wrap justify-center md:justify-between w-full max-w-2xl text-sm font-medium gap-6">
           <div className="flex flex-col gap-2">
        <a href="#privacy-policy" className="hover:text-sky-600 font-bold transition">Privacy Policy</a>
        <a href="#terms-of-service" className="hover:text-sky-600 font-bold transition">Terms of Service</a>
        <a href="#faqs" className="hover:text-sky-600 transition font-bold">FAQs</a>
      </div>
            <div className="flex flex-col gap-2">
        <a href="#facebook" className="hover:text-sky-600 font-bold transition">Facebook</a>
        <a href="#instagram" className="hover:text-sky-600 font-bold transition">Instagram</a>
        <a href="#twitter" className="hover:text-sky-600 font-bold transition">Twitter</a>
      </div>

            </div>
             <div className="mt-4 text-xs opacity-80 text-center">
      <p>Contact us: <span className="font-semibold">email@example.com</span> | +123-456-7890 | Address</p>
      <p className="mt-1">Legal Disclaimer: This is a sample disclaimer text.</p>
    </div>
        </footer>
    );
}

export default Footer;
