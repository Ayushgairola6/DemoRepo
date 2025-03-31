import {React,useState} from 'react';
import '../styles/Hero.css'; // Assuming Hero.jsx is in src/components
import ErrorComp from './Error.jsx'
const Hero = () => {

  const [visible,setVisible] = useState(false)
  

  return (
    <div
      className="hero2 relative"
      style={{ backgroundImage: '' }}
    >
    {visible===true?<ErrorComp setVisible={setVisible} visible={visible}/>:null}
      <div className="hero-content">
        <h1>Connect. Grow. Thrive Together.</h1>
        <p>
          Discover meaningful connections and build stronger relationships with
          our expert-guided programs.
        </p>
        <div className="hero-buttons">
          <button onClick={()=>{
            setVisible(!visible)
            }} className="btn-primary">Book a Session</button>
          <button  className="btn-secondary">Join a Virtual Date</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
