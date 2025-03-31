import {FaLightbulb ,FaFire,FaHandshake} from 'react-icons/fa'
import {motion} from 'framer-motion'
const HowItWorks=()=>{
	return (<>
		 <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="howitworks ">
                    <h2>Our Vision</h2>
                    <p>At LoveLense, we believe that true connections transcend boundaries. Our mission is to foster meaningful relationships by breaking down barriers of distance and circumstance. Whether you're looking for friendship, companionship, or love, our innovative Match Compatibility Quiz, secure messaging tools, and personalized recommendations are designed to bring you closer to those who matter. Join us in discovering genuine connections and building lasting bonds.</p>
                {/*Vision container*/}
                    <div className="vision">
                    	<div>
                    		<h5>Innovation<FaLightbulb/></h5>
                           <p>Creating the best technology to provide the best services</p>
                    	</div>
                    	<div>
                    		<h5>Perfection<FaFire/></h5>
                           <p>Providing what is best for our users</p>
                    		
                    	</div>
                    	<div>
                    		<h5>Trustworthy<FaHandshake/></h5>
                           <p>Creating a safe environment for everyone</p>
                    		
                    	</div>

                    </div>
                </motion.div>
	</>)
}

export default HowItWorks;