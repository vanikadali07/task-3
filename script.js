const factEl = document.getElementById('fact');
const refreshFactBtn = document.getElementById('refreshFact');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const scoreSection = document.getElementById('score-section');
const questionSection = document.getElementById('question-section');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedChoice = null;

// Fetch and display a random trivia fact
async function fetchFact() {
  factEl.innerHTML = '<span class="loader"></span> Loading...';
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
    const data = await response.json();
    factEl.innerText = data.text || "No fact found.";
  } catch (error) {
    factEl.innerText = "Couldn't load trivia. Try again!";
  }
}

refreshFactBtn.addEventListener('click', fetchFact);

// Knowledge-based quiz questions
questions = [
  {
    question: "Which element has the chemical symbol 'Fe'?",
    choices: ["Fluorine", "Iron", "Francium", "Fermium"],
    answer: "Iron"
  },
  {
    question: "What is the powerhouse of the cell?",
    choices: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    answer: "Mitochondria"
  },
  {
    question: "Which year did World War II end?",
    choices: ["1942", "1945", "1948", "1950"],
    answer: "1945"
  },
  {
    question: "What is the square root of 144?",
    choices: ["11", "12", "13", "14"],
    answer: "12"
  },
  {
    question: "Who was the first President of India?",
    choices: ["Dr. Rajendra Prasad", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
    answer: "Dr. Rajendra Prasad"
  }
];

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionNumberEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionTextEl.innerText = currentQuestion.question;
  choicesContainer.innerHTML = '';

  const optionLabels = ['a', 'b', 'c', 'd'];
  currentQuestion.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.classList.add('choice-btn');
    btn.innerText = `${optionLabels[index]}. ${choice}`;
    btn.onclick = () => {
      Array.from(choicesContainer.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedChoice = choice;
      nextBtn.disabled = false;
    };
    choicesContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
  nextBtn.onclick = handleNext;
}

function handleNext() {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.answer) {
    score++;
  }
  currentQuestionIndex++;
  selectedChoice = null;
  showQuestion();
}

function showResults() {
  questionSection.style.display = 'none';
  scoreSection.style.display = 'block';
  scoreSection.innerHTML = `<h2>✅ Quiz Completed!</h2><p>Your score: ${score} out of ${questions.length}</p>`;
}

// Initialize
fetchFact();
showQuestion();
