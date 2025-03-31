import  React,{useRef,useEffect} from 'react';
import backgroundimg from '../../assets/backgroundimg.webp';
import Heart from '../assets/Heart.jpeg'
import Home from './Home'
import HowItWorks from './HowItWorks.jsx'

import Reviews from './Reviews.jsx';
import couple1 from '../assets/couple1.jpg'
import couple2 from '../assets/couple2.jpg'
import couple3 from '../assets/couple3.jpg'
import Video from '../assets/VIDEO.mp4'
import {motion} from 'framer-motion'
function Hero() {
    const vi = useRef();
    useEffect(()=>{
        vi.current.play();
    },[])
    return (<>
 <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} id="home">
   <div  className="flex-col md:flex-row lg:flex-row h-full flex  items-center justify-evenly p-3">
     <video ref={vi} className="md:w-[60%] lg:w-[60%] w-full   rounded-xl"  playbackRate='3' src={Video} autoPlay loop muted/>
     {/*headings*/}
     <div className="text-black w-full text-center  bottom-10  ">

      <h1 className="lg:text-6xl md:text-4xl text-4xl font-bold uppercase">
      Discover genuine connections 
      </h1>
        <h2 className="lg:text-3xl md:text-2xl text-2xl">
        Your journey starts here
        </h2>

     </div>

   </div>

    <Home/>
               <HowItWorks/>

               <Reviews/>

</motion.div>
    </>
    );
}

export default Hero;
