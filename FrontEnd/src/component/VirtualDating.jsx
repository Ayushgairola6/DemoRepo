import {React,useEffect} from 'react';
import '../styles/VirtualSec.css';
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';

const VirtualDating = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = UseStore();

 useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])

  return (
    <section className="virtual-dating">
      <div className="virtual-dating-overlay">
        <div className="virtual-dating-content">
          <h2>Explore Virtual Dating</h2>
          <p>
            Discover meaningful connections in a modern way. Chat, engage in fun activities, 
            and build genuine relationships—all from the comfort of your home.
          </p>
          <button className="virtual-dating-button">Start Your Journey</button>
        </div>
      </div>
    </section>
  );
};

export default VirtualDating;
