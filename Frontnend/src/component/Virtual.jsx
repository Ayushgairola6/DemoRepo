import React from 'react';
import Hero2 from './Hero2'; // Importing the Hero component
import '../styles/Hero.css';
import VirtualSec  from './VirtualDating';
import CoachingSection from './CoachingSection';
import '../styles/CoachingSection.css';
import '../styles/VirtualSec.css'; 
import VirtualDating from './VirtualDating';
const Virtual = () => {
  return (
    <div>
      <Hero2 />
      <VirtualDating/>
      <CoachingSection />
    </div>
  );
};

export default Virtual;
