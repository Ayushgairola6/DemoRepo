import CompanyOverview from './CompanyOverview';
import CoreValues from './CoreValues';
import FoundersStory from './FoundersStory';
import PlatformBenefits from './PlatformBenefits';
import logo from '../assets/logo.webp';
import './AboutUs.css'
const AboutUs =()=>{
	return (<>
		  <div className="app-container">
      {/* Header */}
     
      {/* Hero Section */}
      <main className="hero3">
        <p className="hero-text">
          LoveLens is a next-generation virtual dating app designed to redefine<br/>
          how people connect, interact, and build relationships in the digital<br/>
          age. It goes beyond swipes and likes, creating a meaningful space<br />
          where connections are based on authenticity, compatibility, and shared
          values.
        </p>
        <div className="cta-buttons">
          <button className="bg-white p-2 rounded-full font-semibold border" aria-label="Know About Us">
            Know About Us
          </button>
          <button className="bg-white p-2 rounded-full font-semibold border" aria-label="Watch Video">
            Watch Video
          </button>
        </div>
      </main>

      <CompanyOverview />
      <CoreValues />
      <FoundersStory />
      <PlatformBenefits />
    </div>
	</>)
}

export default AboutUs;