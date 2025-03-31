import React from 'react';

const ResultsPage = ({ quizHistory }) => {
  const latestResult = quizHistory.results[quizHistory.results.length - 1];

  return (
    <div className="resultsPage page">
      <div className="results-content text-center">
        <h2 className="text-3xl font-bold">Your Chemistry Score</h2>
        <div className="overall-score mt-4 text-4xl">{Math.round(latestResult.overallScore)}%</div>
        <p className="mt-4">Here's your relationship compatibility breakdown</p>
        <div className="category-scores mt-6">
          {Object.entries(latestResult.categoryScores).map(([category, score]) => (
            <div key={category} className="category-score mb-4">
              <div className="category-name text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              <div className="score-bar mt-2 bg-gray-200 h-4 rounded-full">
                <div className="score-fill bg-blue-500 h-full rounded-full" style={{ width: `${score}%` }}></div>
              </div>
              <div className="score-value mt-2 text-lg">{Math.round(score)}%</div>
            </div>
          ))}
        </div>
        <button className="primary-button mt-6" onClick={() => window.location.reload()}>Take Quiz Again</button>
        <button className="primary-button mt-4" onClick={() => window.location.href = '/'}>Home</button>
      </div>
    </div>
  );
};

export default ResultsPage;
