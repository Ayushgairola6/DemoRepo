import {React,useEffect} from "react";
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';
import Popup from './Popup.jsx'
const VirtualDatesPage = () => {
  const navigate = useNavigate();

  const {isLoggedIn} = UseStore();
  
   useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])
  return (
    <div className="bg-gray-100 text-center">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Step Into Your Dream Date – Virtually Anywhere, Anytime
        </h1>
        <p className="text-lg mb-6">
          Design unforgettable moments with immersive settings, customized
          avatars, and real-time interactions.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#create-date"
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Plan Your Date Now
          </a>
          <a
            href="#virtual-market"
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Explore Virtual Settings
          </a>
          <a
            href="#upgrade"
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Upgrade to Unlock Premium Experiences
          </a>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {/* Section 1: Create Your Virtual Date */}
        <section id="create-date" className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Create Your Virtual Date
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Easily schedule and design your virtual dates in innovative, fully
            immersive settings tailored to your style.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Serene Beach */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Serene Beach"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Serene Beach
              </h3>
              <p className="text-gray-600">
                Enjoy a peaceful sunset by the beach with breathtaking views.
              </p>
            </div>

            {/* Feature 2: Rooftop Lounge */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Rooftop Lounge"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Rooftop Lounge
              </h3>
              <p className="text-gray-600">
                Relax under the stars in a chic urban lounge.
              </p>
            </div>

            {/* Feature 3: Cozy Fireplace Cabin */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Cozy Fireplace Cabin"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cozy Fireplace Cabin
              </h3>
              <p className="text-gray-600">
                Snuggle up in a mountain cabin with a roaring fire.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Manage Your Virtual Dates */}
        <section id="manage-dates" className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Manage Your Virtual Dates
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Keep track of all your planned virtual connections with ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Schedule Dates */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-calendar-alt fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Schedule Dates
              </h3>
              <p className="text-gray-600">
                Set the perfect time and get reminders for upcoming dates.
              </p>
            </div>

            {/* Feature 2: Reschedule Easily */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-sync-alt fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Reschedule Easily
              </h3>
              <p className="text-gray-600">
                Reschedule or cancel your dates effortlessly.
              </p>
            </div>

            {/* Feature 3: Preview Experiences */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-eye fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Preview Experiences
              </h3>
              <p className="text-gray-600">
                Get a sneak peek of your date setting before confirming.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Virtual Date Market */}
        <section id="virtual-market" className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Virtual Date Market
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Shop virtual essentials to make your date unique and memorable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Fashion Store */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-tshirt fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fashion Store
              </h3>
              <p className="text-gray-600">
                Find stylish outfits and accessories for your avatar.
              </p>
            </div>

            {/* Feature 2: Event Props */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-gift fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Event Props
              </h3>
              <p className="text-gray-600">
                Add virtual gifts, meals, or flowers to enhance the experience.
              </p>
            </div>

            {/* Feature 3: Environment Customizations */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              <i className="fas fa-cloud-sun fa-3x text-gray-800 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Environment Customizations
              </h3>
              <p className="text-gray-600">
                Personalize your setting with weather, lighting, and music.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Enhance Your Date with Coaching */}
        <section id="coaching" className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Enhance Your Date with Coaching
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Access relationship coaching resources to make your virtual date
            meaningful.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Explore tips and tricks for effective communication and building
            rapport in a digital space.
          </p>
        </section>
      </main>

      {/* Footer */}
   {/*   <footer className="bg-black text-white py-6 text-center">
        <p className="text-lg">
          Get Started Today: Start crafting unforgettable moments with LuvLense.
        </p>
        <p>
          <a href="#faq" className="text-pink-400 hover:underline">
            FAQs
          </a>{" "}
          |
          <a href="#virtual-market" className="text-pink-400 hover:underline">
            Virtual Market
          </a>{" "}
          |
          <a href="#user-guide" className="text-pink-400 hover:underline">
            User Guide
          </a>
        </p>
        <p className="mt-4">
          Contact support for technical assistance or help designing your dream
          date.
        </p>
      </footer>*/}
    </div>
  );
};

export default VirtualDatesPage;
