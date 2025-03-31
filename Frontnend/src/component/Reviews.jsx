import { useRef, useState } from "react";
import axios from 'axios';
import { MdFeedback } from "react-icons/md";
import { UseStore } from '../store/store';
import { FaStar } from "react-icons/fa6";
const Reviews = () => {

  const { isLoggedIn } = UseStore()
  const [status, setStatus] = useState('idle')
  const Input = useRef();
  const [rating, setRating] = useState(0);
  // function to send reviews
  async function handleReviews() {
    if (isLoggedIn === false) {
      alert("Please login first");
    }
    if (Input.current.value === "" || rating===0) return;
    try {
      setStatus("pending")
      const response = await axios.post("https://luvlensebackend.onrender.com/review/data", { review: Input.current.value ,rating:rating}, { withCredentials: true });
      if (response.data.message === "Review received successfully") {
        setStatus("success");
      }
      setTimeout(() => {
        setStatus("idle");
      }, 1000)
    } catch (error) {
      setStatus("idle");
      console.log(error);
      throw new Error("Error while sending review");
    }
    setRating(0);
    Input.current.value = "";
  }

  return (<>
    <div className="w-[98%] mt-6   min-h-[30vh]  p-4 mx-auto bg-gray-300 border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-black mb-4 text-center flex items-center justify-center gap-2">
        {status === "success" ? "Thanks for your feedback" : "Want to share any feedback!"}
        <MdFeedback />

      </h3>
      <div className="flex flex-col items-center justify-center gap-2 my-4">
        {rating !== 0 ? <p style={{color:"black"}} className="font-bold ">{rating} Stars</p> : <p style={{color:"black"}} className="font-bold ">Please rate Us!</p>}
        <div className="flex  items-center justify-center gap-2 ">
          {[1, 2, 3, 4, 5].map((value, index) => {
            return (<>
              <FaStar className="hover:scale-125 transition-all" style={{ color: `${value <= rating ? "goldenrod" : "gray"}` }} onClick={() => {
                if (rating === value) {
                  setRating(0);
                  return;
                }
                setRating(value);
              }} key={value} size={25} /></>)
          })}
        </div>

      </div>
      <div className="flex items-center space-x-3">

        <textarea
          type="text"
          ref={Input}
          placeholder="Write your feedback here..."
          className="w-full  text-black px-4 font-bold py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {status === "idle" ? <button
          onClick={handleReviews} style={{ background: "linear-gradient(to right , #9a1f40 ,#ff3366)" }}
          className="px-5 py-2  text-white font-semibold rounded-lg  transition duration-300"
        >
          Submit
        </button> : <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin m-auto"></div>}
      </div>
    </div>
  </>)
}

export default Reviews;