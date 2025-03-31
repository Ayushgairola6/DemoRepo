import React from 'react';
import './Styles/steps.css';
import './Styles/FAQ.css';
import storyIcon from './Images/script.png';
import quizIcon from './Images/quiz-icon.png';
import matchesIcon from './Images/matches-icon.png';
import connectionsIcon from './Images/connection-icon.png';
import {motion} from 'framer-motion'
const HowItWorks = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="how-it-works bg-gradient-to-br from-gray-200 to-lime-200">
      <section className="steps">
        <div className="step">
          <img src={storyIcon} alt="Craft your story icon" />
          <h3>Step 1: Craft Your Story</h3>
          <p>Create a profile that reflects who you are. Share your passions, interests, and what makes you unique.</p>
        </div>
        <div className="step">
          <img src={quizIcon} alt="Take the Match Compatibility Quiz icon" />
          <h3>Step 2: Take the Match Compatibility Quiz</h3>
          <p>Uncover what truly matters to you by taking our insightful compatibility quiz.</p>
        </div>
        <div className="step">
          <img src={matchesIcon} alt="Discover your matches icon" />
          <h3>Step 3: Discover Your Matches</h3>
          <p>Explore your closest matches, tailored to your preferences.</p>
        </div>
        <div className="step">
          <img src={connectionsIcon} alt="Build connections icon" />
          <h3>Step 4: Build Connections</h3>
          <p>Engage with potential matches through secure messaging and virtual date tools.</p>
        </div>
      </section>
      <section className="faq">
        <h2>FAQ</h2>
        <div className="faq-item">
          <h3>Is my information private?</h3>
          <p>Yes, your privacy is our priority. We use advanced security measures to ensure your data is protected.</p>
        </div>
        <div className="faq-item">
          <h3>How do I sign up?</h3>
          <p>The signup process is quick and simple. Provide your basic information, craft your profile, and take the compatibility quiz.</p>
        </div>
        <div className="faq-item">
          <h3>Can I make meaningful connections here?</h3>
          <p>Absolutely! Our platform is designed to foster genuine connections.</p>
        </div>
        <div className="faq-item">
          <h3>Can I edit my profile after signing up?</h3>
          <p>Yes, you can update your profile information anytime by going to the "Edit Profile" section in your account settings.</p>
        </div>
        <div className="faq-item">
          <h3>Is my data secure on this platform?</h3>
          <p>Absolutely! We prioritize security and use industry-standard encryption to protect your personal information.</p>
        </div>
        <div className="faq-item">
          <h3>What happens if I don’t find a match right away?</h3>
          <p>Finding the right connection takes time. You can refine your preferences or check back as more users join the platform.</p>
        </div>
        <div className="faq-item">
          <h3>How can I contact customer support?</h3>
          <p>You can reach out to our support team via the "Help & Support" section in your account or email us at support@example.com.</p>
        </div>
        <div className="faq-item">
          <h3>Is there a way to block or report users?</h3>
          <p>Yes, we have features that allow you to block or report users who violate our guidelines.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default HowItWorks;
