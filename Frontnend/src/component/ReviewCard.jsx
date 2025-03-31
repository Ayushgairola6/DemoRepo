import { useState, useEffect } from 'react'
import profileImg from '../assets/profileImage.webp';
import { IoStarSharp } from 'react-icons/io5'
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
function ReviewCard({ date, comment, rating }) {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const getReviews = async () => {
            const response = await axios.get("/api/reviews/get/all", { withCredentials: true });
            setReviews(response.data);
        }
        getReviews();
    }, [])




    return (<>


        <h4 onClick={() => console.log(reviews)} className='hover:underline' id="reviewheading">Customer Reviews</h4>

        <div className="Reviews">
            {/*1st ReviewCard*/}
            {reviews!==null && reviews.length!==0?reviews.map((review, index) => {
                return <div className="review-card">
                    {/*container for userimage and username with date of comment*/}
                    <div>
                        <img src={review.images[0]?review.images[0]:"https://th.bing.com/th?q=No+User+Display+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"} alt="img" />
                        <section>
                            <span>{review.name}</span>
                            <span>{review.day.split("T")[0]}</span>
                        </section>

                    </div>
                    {/*rating span*/}
                    <div className='flex items-center justify-center gap-2'>
                        {Array.from({length:review.rating},(_,i)=>{
                          return  (<IoStarSharp key={i} style={{color:"goldenrod"}} size={24}/>)
                        })}
                    </div>

                    <p>{review.text}</p>
                </div>
            }):null}


            {/*1st ReviewCard*/}

        </div>

    </>
    );
}

export default ReviewCard;
