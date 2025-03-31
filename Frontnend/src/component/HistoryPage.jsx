import React from 'react';

const HistoryPage = ({ quizHistory }) => {
  return (
    <div className="historyPage page">
      <div className="history-header flex items-center gap-4 mb-8">
        <button className="back-button p-2 rounded-full hover:bg-pink-600 transform hover:scale-105" onClick={() => window.location.reload()}>
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 className="text-3xl font-bold">Quiz History</h2>
      </div>
      <div id="historyContent">
        {quizHistory.results.length === 0 ? (
          <div className="text-center">No quiz results yet. Take the quiz to see your results here!</div>
        ) : (
          quizHistory.results.map(result => (
            <div key={result.id} className="history-item bg-white p-6 rounded-lg shadow-md mb-4">
              <div className="history-header-content flex justify-between items-center mb-4">
                <div className="history-date flex items-center gap-2 text-gray-600">
                  <i data-lucide="calendar"></i>
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
                <div className="history-score text-pink-500 text-xl font-bold">{Math.round(result.overallScore)}%</div>
              </div>
              <div className="category-scores grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category} className="category-score">
                    <div className="category-name text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    <div className="score-bar bg-gray-200 h-4 rounded-full mt-2">
                      <div className="score-fill bg-blue-500 h-full rounded-full" style={{ width: `${score}%` }}></div>
                    </div>
                    <div className="score-value mt-2 text-lg">{Math.round(score)}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
