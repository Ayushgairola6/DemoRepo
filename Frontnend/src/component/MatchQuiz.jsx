import React, { useState, useEffect } from 'react';
import IntroPage from './IntroPage';
import QuizPage from './QuizPage';
import ResultsPage from './QuizResultPage';
import HistoryPage from './HistoryPage';
// import { QUIZ_SECTIONS, calculateResults, createFloatingHearts, renderHistory } from '../QuizUtils';

function MatchQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fetchState, setFetchState] = useState('');
  const [quizHistory, setQuizHistory] = useState(
    JSON.parse(localStorage.getItem('quizHistory')) || { results: [] }
  );



  return (
    <div className="container mx-auto p-4">
      {fetchState === '' && <IntroPage onStartQuiz={handleStartQuiz} onShowHistory={handleShowHistory} />}
      {fetchState === 'quiz' && (
        <QuizPage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          answers={answers}
          setAnswers={setAnswers}
          QUIZ_SECTIONS={QUIZ_SECTIONS}
          onShowResults={handleShowResults}
        />
      )}
      {fetchState === 'results' && <ResultsPage quizHistory={quizHistory} />}
      {fetchState === 'history' && <HistoryPage quizHistory={quizHistory} />}
    </div>
  );
}

export default MatchQuiz;