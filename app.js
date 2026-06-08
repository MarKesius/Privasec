const GROUP_FILES = {
  a: 'quiz1.json',
  b: 'quiz2.json'
};

const questionsContainer = document.getElementById('questions');
const groupButtons = document.querySelectorAll('.group-btn');
let loadedData = {};
let selectedAnswers = {};

async function loadGroupData(groupKey) {
  if (loadedData[groupKey]) {
    return loadedData[groupKey];
  }

  const response = await fetch(GROUP_FILES[groupKey]);
  const data = await response.json();
  loadedData[groupKey] = data;
  return data;
}

function formatOption(optionText) {
  return optionText.replace(/^(Α|Β|Γ|Δ|Ε|Ζ|Η)\./u, match => match + '');
}

function getCorrectOptionText(options, correctLetter) {
  const formatted = options.find(option => option.trim().startsWith(correctLetter + '.'));
  return formatted || correctLetter;
}

function applyQuestionResult(card, selectedOption, correctAnswer, correctLetter) {
  const selected = (selectedOption || '').trim();
  const answerText = (correctAnswer || '').trim();
  const answerLetter = (correctLetter || '').trim();

  card.classList.remove('correct', 'wrong');

  if (!selected || (!answerText && !answerLetter)) {
    return;
  }

  const isCorrect = selected === answerText || (answerLetter && selected.startsWith(answerLetter + '.'));
  card.classList.add(isCorrect ? 'correct' : 'wrong');
}

function renderQuestions(groupKey, questions) {
  questionsContainer.innerHTML = '';
  const groupHeading = document.createElement('div');
  groupHeading.className = 'intro-card';
  groupHeading.innerHTML = `<strong>Ομάδα ${groupKey.toUpperCase()}</strong> — ${questions.length} ερωτήσεις`;
  questionsContainer.appendChild(groupHeading);

  if (groupKey === 'b') {
    const groupNotice = document.createElement('div');
    groupNotice.className = 'group-notice';
    groupNotice.textContent = 'Για τις ερωτήσεις της ομάδας Β δεν υπάρχει συγκεκριμένη σωστή απάντηση';
    questionsContainer.appendChild(groupNotice);
  }

  questions.forEach((item, index) => {
    const answerKey = `${groupKey}-${index}`;
    const card = document.createElement('div');
    card.className = 'question-block';

    const summary = document.createElement('div');
    summary.className = 'question-summary';
    summary.textContent = `${index + 1}. ${item.question}`;
    summary.setAttribute('role', 'button');
    summary.setAttribute('tabindex', '0');

    const content = document.createElement('div');
    content.className = 'details-content';

    const optionsList = document.createElement('ul');
    optionsList.className = 'options';

    const correctLetter = item.correct || item.correctAnswer || '';
    const correctAnswer = getCorrectOptionText(item.options, correctLetter);
    const hasCorrectAnswer = Boolean((correctLetter || '').trim());
    const answerBlock = document.createElement('div');
    answerBlock.className = 'answer-line';
    answerBlock.style.display = 'none';
    answerBlock.innerHTML = `Η σωστή απάντηση είναι: <strong>${correctAnswer}</strong>`;

    item.options.forEach(optionText => {
      const optionItem = document.createElement('li');
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.textContent = optionText;
      optionButton.className = 'option-button';
      optionButton.addEventListener('click', () => {
        const allButtons = optionsList.querySelectorAll('button');
        allButtons.forEach(btn => btn.classList.remove('selected'));
        optionButton.classList.add('selected');
        selectedAnswers[answerKey] = optionText;
        if (hasCorrectAnswer) {
          answerBlock.style.display = 'block';
        }
        applyQuestionResult(card, optionText, correctAnswer, correctLetter);
      });

      if (selectedAnswers[answerKey] === optionText) {
        optionButton.classList.add('selected');
        if (hasCorrectAnswer) {
          answerBlock.style.display = 'block';
        }
        applyQuestionResult(card, optionText, correctAnswer, correctLetter);
      }

      optionItem.appendChild(optionButton);
      optionsList.appendChild(optionItem);
    });

    content.appendChild(optionsList);
    if (hasCorrectAnswer) {
      content.appendChild(answerBlock);
    }

    function closeOtherCards() {
      document.querySelectorAll('#questions .question-block').forEach(other => {
        if (other !== card && other.classList.contains('active')) {
          other.classList.remove('active');
        }
      });
    }

    const toggleCard = () => {
      const isOpen = card.classList.toggle('active');
      if (isOpen) {
        closeOtherCards();
      }
    };

    summary.addEventListener('click', toggleCard);
    summary.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });

    card.appendChild(summary);
    card.appendChild(content);
    questionsContainer.appendChild(card);
  });
}

async function switchGroup(groupKey) {
  groupButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.group === groupKey));
  questionsContainer.innerHTML = '<p>Φόρτωση...</p>';
  try {
    const data = await loadGroupData(groupKey);
    renderQuestions(groupKey, data);
  } catch (error) {
    questionsContainer.innerHTML = '<p>Σφάλμα κατά τη φόρτωση των ερωτήσεων.</p>';
    console.error(error);
  }
}

groupButtons.forEach(button => {
  button.addEventListener('click', () => switchGroup(button.dataset.group));
});

switchGroup('a');
