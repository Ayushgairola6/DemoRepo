import React, { useEffect } from 'react';
import { validateCurrentSection, clearError, showError } from '../QuizUtils';

const QuizPage = ({ currentStep, setCurrentStep, answers, setAnswers, QUIZ_SECTIONS, onShowResults }) => {
  useEffect(() => {
    showQuizSection();
  }, [currentStep]);

  const showQuizSection = () => {
    const sections = Object.values(QUIZ_SECTIONS);
    const currentSection = sections[currentStep - 1];
    
    document.querySelector('.progress').style.width = `${(currentStep / sections.length) * 100}%`;
    document.getElementById('sectionTitle').textContent = currentSection.title;

    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';

    currentSection.questions.forEach(q => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question', 'mb-4');

      const label = document.createElement('label');
      label.textContent = q.question + (q.required ? ' *' : '');
      questionDiv.appendChild(label);

      if (q.options) {
        q.options.forEach(option => {
          const radioDiv = document.createElement('div');
          radioDiv.classList.add('radio-option', 'ml-4');

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = q.id;
          input.value = option;
          input.checked = answers[q.id] === option;
          input.onchange = () => {
            setAnswers({ ...answers, [q.id]: option });
            clearError();
          };

          const optionLabel = document.createElement('span');
          optionLabel.textContent = option;

          radioDiv.appendChild(input);
          radioDiv.appendChild(optionLabel);
          questionDiv.appendChild(radioDiv);
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = answers[q.id] || '';
        textarea.onchange = (e) => {
          setAnswers({ ...answers, [q.id]: e.target.value });
          clearError();
        };
        textarea.placeholder = 'Please provide a detailed answer...';
        questionDiv.appendChild(textarea);
      }

      questionsContainer.appendChild(questionDiv);
    });

    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.className = 'error-message';
    questionsContainer.appendChild(errorDiv);

    document.getElementById('prevButton').disabled = currentStep === 1;
    document.getElementById('nextButton').textContent = currentStep === sections.length ? 'See Results' : 'Next';
  };

  const previousSection = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const nextSection = () => {
    const validation = validateCurrentSection(currentStep, QUIZ_SECTIONS, answers);
    if (!validation.isValid) {
      showError(validation.errorMessage);
      return;
    }

    const sections = Object.values(QUIZ_SECTIONS);
    if (currentStep < sections.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onShowResults();
    }
  };

  return (
    <div className="quizPage page">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="quiz-content">
        <div className="section-header">
          <i data-lucide="heart"></i>
          <h2 id="sectionTitle"></h2>
        </div>
        <div id="questions"></div>
        <div className="navigation-buttons">
          <button onClick={previousSection} id="prevButton">Previous</button>
          <button onClick={nextSection} id="nextButton">Next</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
