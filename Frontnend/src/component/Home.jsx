import React from 'react';
import './Home.css'
import ReviewCard from './ReviewCard.jsx'
import {MdQuiz,MdRecommend,MdLock} from 'react-icons/md';
import {useState}from 'react';
function Home() {
 // state to keep track  ofthe visible or hidden sidebar
    
    return (
        <>
            
            <main className="features">
            <h3>Platform features</h3>
            <div className="cards-container">
            <div>
                <span>Innovative Match Compatibility Quiz <MdQuiz size={22}/></span>
                <p>Take the Compatibility Quiz and meet people that share your vision and thoughts</p>
            </div>
            <div>
                <span>Secure messaging tools <MdLock size={22}/></span>
                <p>Chat with freedom with the help of our end to end encryption protocol</p>
            </div>
            <div>
                <span>Personalized recommendations ensure connections that matter<MdRecommend size={42}/></span>
                <p>See Profile that match your preference and build connections</p>
            </div>
            </div>
        {/*testimonials*/}

                <ReviewCard/>
            {/*how-it-works*/}
            
            </main>
           
        </>
    );
}

export default Home;
