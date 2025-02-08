import React from 'react';
import backgroundimg from '../../assets/backgroundimg.webp';
import Heart from '../assets/Heart.jpeg'
import Home from './Home'
import HowItWorks from './HowItWorks.jsx'
import couple1 from '../assets/couple1.jpg'
import couple2 from '../assets/couple2.jpg'
import couple3 from '../assets/couple3.jpg'

function Hero() {
    return (<>
        <div className="hero">
        {/*hero section headings*/}
    <div className="headings">
        <h1 className="">discover <span>genuine
        </span> connnections</h1>
        <h3 className="font-semibold text-center">Your <span>journey</span> starts here</h3>
    </div>
    {/*carousel*/}
         <div className="carousel">
        <div className="carousel-track">
            <img src={couple1} alt="Image 1"/>
            <img src={couple2} alt="Image 2"/>
            <img src={couple3} alt="Image 3"/>
            <img src={couple2} alt="Image 4"/>
            <img src={couple1} alt="Image 1"/>
            <img src={couple2} alt="Image 2"/>
            <img src={couple3} alt="Image 3"/>
            <img src={couple2} alt="Image 4"/>
        </div>
    </div>

    </div>
    <Home/>
               <HowItWorks/>

    </>
    );
}

export default Hero;
