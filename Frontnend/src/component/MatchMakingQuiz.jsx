import React, { useState, useEffect } from "react";
import axios from "axios";
import { UseStore } from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import Confetti from "react-confetti";
import Quizres from "./QuizResults";
import {motion} from 'framer-motion'

const Matchmaking = () => {
  const { handleResponse, quizResponse, isLoggedIn } = UseStore();
  const [quizData, setQuizData] = useState(null);
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(1);

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("viewedStatus"));
    if (!status) {
      localStorage.setItem("viewedStatus", JSON.stringify({ viewedStatus: false }));
      setVisible(true);
    } else if (status.viewedStatus === true) {
      setVisible(false);

      setShowTutorial(false);

    }

    if (isLoggedIn === false) {
      navigate("/error");
      return;
    }
  }, [isLoggedIn]);

  const StartQuiz = async () => {
    try {
      setStatus("loading");

      setError("");
      const response = await axios.get(
        "https://luvlensebackend.onrender.com/quiz/queries",
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuizData(response.data);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setError(error.response?.data?.message || "Failed to load quiz. Please try again.");

    }
  };

  const handleQuiz = (query, option) => {
    setResponse((prevResponses) => {
      const existingEntry = prevResponses.find(
        (entry) => entry.question_id === query.question_id
      );

      if (existingEntry) {
        if (existingEntry.option_id === option.option_id) {
          return prevResponses.filter((entry) => entry.question_id !== query.question_id);
        } else {
          return prevResponses.map((entry) =>
            entry.question_id === query.question_id
              ? { question_id: query.question_id, option_id: option.option_id }
              : entry
          );
        }
      } else {
        return [...prevResponses, { question_id: query.question_id, option_id: option.option_id }];
      }
    });
  };

  const SubmitData = () => {
    // if (response.length < (quizData?.length || 0)) {
    //   setError("Please answer all questions before submitting.");
    //   return;
    // }
    setError("");
    handleResponse(response);
    setResponse([]);

    setTimeout(() => {
      navigate("/quizResult");
    }, 4000);
  };

  const TutorialModal = () => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-xl p-6 max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Welcome to the Match Quiz!</h3>
        {currentTutorialStep === 1 && (
          <>
            <p className="mb-4">This quiz will help you find people who share your thoughts and values.</p>
            <p className="mb-4">Here's how it works:</p>
            <ul className="list-disc list-inside mb-4">
              <li>All options start as <span className="text-red-500 font-bold">RED</span></li>
              <li>Click an option to select it - it turns <span className="text-green-600 font-bold">GREEN</span></li>
              <li>Click again to deselect if needed</li>
            </ul>
          </>
        )}
        {currentTutorialStep === 2 && (
          <>
            <p className="mb-4">Important tips:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Take your time to read each question carefully</li>
              <li>Choose answers that truly reflect your preferences</li>
              <li>You must answer all questions to get your matches</li>
            </ul>
          </>
        )}
        <div className="flex justify-between items-center mt-6">
          {currentTutorialStep > 1 && (
            <button
              onClick={() => setCurrentTutorialStep(prev => prev - 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => {
              if (currentTutorialStep < 2) {
                setCurrentTutorialStep(prev => prev + 1);
              } else {
                setShowTutorial(false);
                localStorage.setItem("viewedStatus", JSON.stringify({ viewedStatus: true }));
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-lg hover:from-pink-600 hover:to-pink-700"
          >
            {currentTutorialStep < 2 ? "Next" : "Start Quiz"}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    
    <motion.div 
      initial={{opacity:0}} 
      animate={{opacity:1,y:0}} 
      transition={{duration:0.5}} 
      className="min-h-screen p-2 relative flex flex-col items-center bg-gradient-to-br from-purple-300 to-red-300"
    >
      {showTutorial && <TutorialModal />}

      <div className="w-full max-w-4xl p-5 rounded-lg">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {quizData ? (
          <>
            <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600">
                Questions answered: <span className="font-bold">{response.length}</span> of <span className="font-bold">{quizData.length}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(response.length / quizData.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {quizData.map((query, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="bg-gray-200 shadow-sm hover:shadow-md shadow-black p-3 rounded-lg mb-4"
              >
                <label className="text-lg md:text-xl flex items-center justify-center font-semibold mb-2">
                  Related To - {query.category}
                </label>
                <p className="font-bold text-lg md:text-2xl mb-4">{query.question}</p>
                <div className="space-y-2">
                  {query.options.map((e, i) => {
                    const isSelected = response.some(
                      (entry) => entry.question_id === query.question_id && entry.option_id === e.option_id
                    );
                    return (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        
                        key={i}
                        onClick={() => handleQuiz(query, e)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? "bg-green-100 border-2 border-green-500 text-green-700" 
                            : "bg-white border border-gray-300 text-red-600 hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-base md:text-lg font-medium">
                          {e.option_serial}. {e.option}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          <div className="h-screen flex flex-col items-center justify-center text-center">
            <div className="shadow-sm shadow-black hover:shadow-md bg-gray-200 md:w-4/5 w-full p-8 rounded-xl">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">Find Your Perfect Match!</h1>
              <p className="text-lg md:text-xl mb-6">Take our personality quiz to discover people who share your values and interests.</p>
              {status === "idle" ? (
                <button 
                  onClick={StartQuiz} 
                  className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white text-lg font-bold py-3 px-8 rounded-full hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Start Quiz
                </button>
              ) : status === "loading" ? (
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="text-red-500 font-bold">{error}</div>
              )}
              <Link 
                to="/ProfileList" 
                className="block mt-6 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                ← Back to Profiles
              </Link>

            </div>
          </div>
        )}
      </div>
      {/* disabled={response.length < quizData.length} */}
      {quizData && (
        <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center">
          {quizResponse === "idle" ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={SubmitData}
              className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
              
            >
              {response.length < quizData.length 
                ? `Answer ${quizData.length - response.length} more question${quizData.length - response.length === 1 ? '' : 's'}`
                : "Find Your Matches!"
              }
            </motion.button>
          ) : quizResponse === "successfull" ? (
            <div className="fixed inset-0 flex items-center justify-center">
              <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} recycle={false} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold bg-white p-6 rounded-lg shadow-xl"
              >
                Congrats! Finding your matches...
              </motion.span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
              <span className="text-black font-medium">Processing your answers...</span>
            </div>

          )}
        </div>
      )}
    </motion.div>
  );
};

export default Matchmaking;
