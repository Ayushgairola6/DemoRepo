import {useState} from 'react' 
import profileImg from '../assets/profileImage.webp';
import {IoStarSharp} from 'react-icons/io5'

function ReviewCard({ date, comment, rating }) {

   const [reviews,setReviews] = useState(null);

        



    return (<>

           <h4 className='hover:underline' id="reviewheading">Customer Reviews</h4>
           <div className="Reviews">
       {/*1st ReviewCard*/}
        <div className="review-card">
    {/*container for userimage and username with date of comment*/}
          <div>
          <img src={profileImg} alt="img"/>
          <section>
              <span>Sabrina Carpenter</span>
          <span>29-01-2025</span>
          </section> 
          
          </div>           
      {/*rating span*/}
      <span className="inline-flex"><IoStarSharp/></span>
      <p>I am really enjoying my time on LuvLens , I got to know a lot of people and met the love of life here , thanks to the Advanced matchmaking technology and quiz games</p>
        </div>
       {/*2nd ReviewCard*/}

<div className="review-card">
    {/*container for userimage and username with date of comment*/}
          <div>
          <img src={profileImg} alt="img"/>
          <section>
              <span>Sabrina Carpenter</span>
          <span>29-01-2025</span>
          </section> 
          
          </div>           
      {/*rating span*/}
      <span className="inline-flex"><IoStarSharp/><IoStarSharp/></span>
      <p>I am really enjoying my time on LuvLens , I got to know a lot of people and met the love of life here , thanks to the Advanced matchmaking technology and quiz games</p>
        </div>
       {/*3rd ReviewCard*/}

<div className="review-card">
    {/*container for userimage and username with date of comment*/}
          <div>
          <img src={profileImg} alt="img"/>
          <section>
              <span>Sabrina Carpenter</span>
          <span>29-01-2025</span>
          </section> 
          
          </div>           
      {/*rating span*/}
      <span className="inline-flex"><IoStarSharp/><IoStarSharp/><IoStarSharp/></span>
      <p>I am really enjoying my time on LuvLens , I got to know a lot of people and met the love of life here , thanks to the Advanced matchmaking technology and quiz games</p>
        </div>

       {/*4th ReviewCard*/}

<div className="review-card">
    {/*container for userimage and username with date of comment*/}
          <div>
          <img src={profileImg} alt="img"/>
          <section>
              <span>Sabrina Carpenter</span>
          <span>29-01-2025</span>
          </section> 
          
          </div>           
      {/*rating span*/}
      <span className="inline-flex"> <IoStarSharp/><IoStarSharp/><IoStarSharp/><IoStarSharp/></span>
      <p>I am really enjoying my time on LuvLens , I got to know a lot of people and met the love of life here , thanks to the Advanced matchmaking technology and quiz games</p>
        </div>
       {/*1st ReviewCard*/}

           </div>
         
        </>
    );
}

export default ReviewCard;
