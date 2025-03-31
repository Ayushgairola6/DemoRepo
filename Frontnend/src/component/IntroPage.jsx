import React from 'react';

const IntroPage = ({ onStartQuiz, onShowHistory }) => {
  return (
    <div className="page active">
      <div className="hearts-container"></div>
      <div className="content text-center">
        <div className="logo">
          <i data-lucide="heart" className="heart-logo"></i>
        </div>
        <h1 className="text-4xl font-bold">Find Your Perfect Match</h1>
        <p className="mt-4">
          Discover your relationship potential through our comprehensive compatibility quiz.
          Understand yourself better and find what truly matters in your perfect match.
        </p>
        <button className="primary-button mt-6" onClick={onStartQuiz}>
          Start Quiz
        </button>
        <button
          id="viewHistoryBtn"
          className="secondary-button mt-4"
          onClick={onShowHistory}
        >
          View Previous Results
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
