import CompanyOverview from './CompanyOverview';
import CoreValues from './CoreValues';
import FoundersStory from './FoundersStory';
import PlatformBenefits from './PlatformBenefits';
import logo from '../assets/logo.webp';
import './AboutUs.css'
import {motion} from 'framer-motion'
const AboutUs =()=>{
	return (<>
		  <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="app-container bg-gradient-to-br from-lime-200 to-orange-200">
      {/* Header */}
     
      {/* Hero Section */}
      <main className="hero3 ">
      <h1 className="uppercase font-bold text-3xl">WHO ARE WE?</h1>
        <p className="hero-text font-bold text-md ">
          LoveLens is a next-generation virtual dating app designed to redefine<br/>
          how people connect, interact, and build relationships in the digital<br/>
          age. It goes beyond swipes and likes, creating a meaningful space<br />
          where connections are based on authenticity, compatibility, and shared
          values.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn" aria-label="Know About Us">
            Know About Us
          </button>
          <button className="cta-btn" aria-label="Watch Video">
            Watch Video
          </button>
        </div>
      </main>

      <CompanyOverview />
      <CoreValues />
      <FoundersStory />
      <PlatformBenefits />
    </motion.div>
	</>)
}

export default AboutUs;