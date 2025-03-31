import React, { useState ,useEffect} from 'react'
import PlanType from './PlansType';
import PlanPage from './PlanPage';
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';
const plans = [
  {
    title: "Starter Connection Plan",
    idealFor: "Free access to essential features.",
    price: "9.99",
    features: [
      "Profile Creation: Access to create and personalize your profile with a bio, interests, and profile picture.",
      "Unlimited Browsing: Search for potential matches using basic filters such as location, age, and interests.",
      "Match Chemistry Quiz: Access to a basic version of the relationship chemistry quiz (limited set of questions).",
      "One-Time Match Recommendation: Receive one recommended match per month based on Chemistry results.",
      "Messaging: Send up to 10 messages per month to any active member on the platform.",
      "Basic Data Analysis: Get basic insights into the Chemistry of your matches, including personality type and communication style.",
      "Support: Email support with a response time of 24-48 hours for general inquiries and assistance.",
    ],
    benefits: [
      "Cost-effective for those who want to get started on the platform without a heavy investment.",
      "Provides access to core features, ensuring an engaging and functional experience.",
    ],
  },
  {
    title: "Engaged Connection",
    idealFor: "Deeper features at a moderate price",
    price: "24.99",
    features: [
      "Profile Creation & Enhanced Customization: Create a detailed profile with photos, background information, and interests. Includes advanced customization options to highlight preferences.",
      "Unlimited Matchmaking: Full access to advanced search filters like interests, relationship goals, and values.",
      "Extended Match Chemistry Quiz: Complete access to the full relationship Chemistry quiz with in-depth questions.",
      "Unlimited Match Recommendations: Receive unlimited personalized match suggestions based on quiz results and behavioral data analysis.",
      "Messaging & Communication: Unlimited messaging capabilities for deeper conversations and relationship-building.",
      "Enhanced Data Insights: Advanced Chemistry reports, including feedback on communication styles and suggestions for improving relationship success.",
      "Priority Support: Access to priority customer service with a response time of 12-24 hours.",
      "Virtual Date Planning Resources: Curated date ideas and resources for virtual dates.",
    ],
    benefits: [
      "Ideal for users seeking a more immersive experience with deeper personalization.",
      "Enhanced features offer a better chance of finding meaningful connections.",
      "Includes resources for fostering relationships both online and in the long term.",
    ],
  },
  {
    title: "True Connection",
    idealFor: " Premium features for an enhanced experience.",
    price: "39.99",
    features: [
      "Comprehensive Profile Creation & Customization: Full control over your profile, with options to highlight hobbies, career, and goals.",
      "Unlimited Advanced Matchmaking: Full access to advanced matchmaking algorithms that consider lifestyle preferences, long-term goals, and relationship visions.",
      "Priority Placement in Search Results: Increased visibility in search results for a competitive edge.",
      "In-Depth Match Chemistry Quiz & Analysis: Extensive relationship chemistry quiz covering areas like family dynamics, financial goals, and values.",
      "Unlimited Match Recommendations & Behavioral Matching: Tailored match suggestions based on dynamic behavioral data analysis.",
      "Exclusive Virtual Relationship Coaching: Access to coaching sessions for expert advice on building meaningful relationships.",
      "Unlimited Messaging & Priority Communication: Send unlimited messages and prioritize important matches.",
      "Real-Time Analytics Dashboard: Insights into match behavior, relationship progress, and detailed reports.",
      "Elite Support: 24/7 VIP customer support with a dedicated agent.",
      "Free Access to Premium Events & Webinars: Invitations to virtual events, workshops, and webinars with dating experts.",
    ],
    benefits: [
      "Offers the most personalized and immersive experience.",
      "Perfect for individuals serious about forming lasting, meaningful relationships.",
      "Access to premium-level support and tools for relationship success.",
    ],
  },
];

const PlanDesc = () => {

  const navigate = useNavigate();
  const {isLoggedIn} = UseStore();

 useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])


 const [planIndex, setPlanIndex] = useState(1);
 const [fade, setFade] = useState(true);
  const indicators = Array(3).fill(null);

  const handlePrev = () => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      if (planIndex === 0) {
        setPlanIndex(plans.length - 1);
      } else {
        setPlanIndex(planIndex - 1);
      }
      setFade(true); // Start fade-in after index change
    }, 300); // Allow time for fade-out effect
  };

    const handleNext = () => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        if (planIndex === plans.length - 1) {
          setPlanIndex(0);
        } else {
          setPlanIndex(planIndex + 1);
        }
        setFade(true); // Start fade-in after index change
      }, 300); // Allow time for fade-out effect
    };
  return (<>
    <div className="max-w-screen md:h-[300vh] h-[410vh]   px-6 py-6  flex flex-col items-center space-y-2 justify-normal">
      <div className="flex items-center justify-center ">
        <button
          onClick={handlePrev}
          className="py-4  px-6 rounded-full mr-5 text-black font-bold text-xl bg-white bg-opacity-60 hover:bg-opacity-80"
        >
          &lt;
        </button>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {plans.map(
            (plan, index) =>
              index == planIndex && <PlanType key={index} plan={plan} />
          )}
        </div>
        <button
          onClick={handleNext}
          className="py-4  px-6 rounded-full ml-5 text-black font-bold text-xl bg-white bg-opacity-60 hover:bg-opacity-80"
        >
          &gt;
        </button>
      </div>
      <div className="flex space-x-2">
        {indicators.map((_, index) => (
          <div
            key={index}
            onClick={() => setPlanIndex(index)} // Set active index on click
            className={`w-6 h-6 rounded-full  cursor-pointer ${
              planIndex === index ? "bg-gray-400" : "bg-white"
            }`}
          ></div>
        ))}

      </div>
    <PlanPage/>
    </div>
    </>
  );
}

export default PlanDesc