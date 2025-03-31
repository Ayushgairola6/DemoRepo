export const QUIZ_SECTIONS = {
  demographics: {
    title: 'Basic Demographics and Relationship Goals',
    weight: 0.2,
    questions: [
      // Add your questions here...
    ]
  },
  lifestyle: {
    title: 'Personality and Lifestyle Chemistry',
    weight: 0.25,
    questions: [
      // Add your questions here...
    ]
  },
  values: {
    title: 'Values, Beliefs, and Future Aspirations',
    weight: 0.25,
    questions: [
      // Add your questions here...
    ]
  },
  attraction: {
    title: 'Physical Preferences and Attraction',
    weight: 0.2,
    questions: [
      // Add your questions here...
    ]
  },
  communication: {
    title: 'Communication and Relationship Expectations',
    weight: 0.1,
    questions: [
      // Add your questions here...
    ]
  }
};

export function validateCurrentSection(currentStep, QUIZ_SECTIONS, answers) {
  const sections = Object.values(QUIZ_SECTIONS);
  const currentSection = sections[currentStep - 1];
  let isValid = true;
  let errorMessage = '';

  currentSection.questions.forEach(q => {
    if (!answers[q.id]) {
      isValid = false;
      errorMessage = 'Please answer all questions before proceeding.';
    }

    if (q.required && (!answers[q.id] || answers[q.id].trim() === '')) {
      isValid = false;
      errorMessage = 'Please provide detailed answers for the reflection questions.';
    }
  });

  return { isValid, errorMessage };
}

export function clearError() {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }
}

export function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
 {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

export function calculateResults(answers) {
  const sections = Object.values(QUIZ_SECTIONS);
  const categoryScores = {};

  sections.forEach(section => {
    let sectionScore = 0;
    let maxPossibleScore = 0;

    section.questions.forEach(question => {
      if (question.options) {
        const answerIndex = question.options.indexOf(answers[question.id]);
        sectionScore += (answerIndex + 1) * 20;
        maxPossibleScore += 100;
      } else {
        const response = answers[question.id] || '';
        const wordCount = response.split(/\s+/).length;
        sectionScore += Math.min(wordCount * 10, 100);
        maxPossibleScore += 100;
      }
    });

    categoryScores[section.title.toLowerCase()] = (sectionScore / maxPossibleScore) * 100 * section.weight;
  });

  const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    overallScore,
    categoryScores,
    answers: Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer
    }))
  };
}

export function createFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('i');
    heart.setAttribute('data-lucide', 'heart');
    heart.classList.add('floating-heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heart.style.animationDuration = `${3 + Math.random() * 2}s`;
    container.appendChild(heart);
    lucide.createIcons({
      icons: {
        heart: heart
      }
    });
  }
}

export function renderHistory() {
  const historyContent = document.getElementById('historyContent');
  historyContent.innerHTML = '';

  const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || { results: [] };

  if (quizHistory.results.length === 0) {
    historyContent.innerHTML = '<div class="text-center">No quiz results yet. Take the quiz to see your results here!</div>';
    return;
  }

  quizHistory.results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('history-item');
    div.innerHTML = `
      <div class="history-header-content">
        <div class="history-date">
          <i data-lucide="calendar"></i>
          <span>${new Date(result.date).toLocaleDateString()}</span>
        </div>
        <div class="history-score">${Math.round(result.overallScore)}%</div>
      </div>
      <div class="category-scores">
        ${Object.entries(result.categoryScores).map(([category, score]) => `
          <div class="category-score">
            <div class="category-name">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div class="score-bar">
              <div class="score-fill" style="width: ${score}%"></div>
            </div>
            <div class="score-value">${Math.round(score)}%</div>
          </div>
        `).join('')}
      </div>
    `;
    historyContent.appendChild(div);
    lucide.createIcons();
  });
}
