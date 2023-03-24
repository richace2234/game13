// Define the quiz questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctChoice: 1
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Everest", "Kilimanjaro", "Denali"],
    correctChoice: 1
  },
  {
    question: "What is the currency of Japan?",
    choices: ["Yen", "Dollar", "Euro", "Pound"],
    correctChoice: 0
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "Canada", "China", "USA"],
    correctChoice: 0
  },
  {
    question: "What is the smallest country by area?",
    choices: ["Monaco", "Vatican City", "Nauru", "Tuvalu"],
    correctChoice: 1
  }
];

// Set up variables
let score = 0;
let questionIndex = 0;
let countdownIntervalId;

const startButton = document.getElementById("start");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const countdownElement = document.getElementById("countdown");
const resultsContainer = document.getElementById("results");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");

// Shuffle an array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the quiz
function startQuiz() {
  console.log("startQuiz() was called");
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  shuffleArray(questions);
  countdownElement.textContent = questions.length * 15;

  // Start the countdown timer
  countdownIntervalId = setInterval(() => {
    const newCountdownValue = parseInt(countdownElement.textContent) - 1;
    countdownElement.textContent = newCountdownValue;
    if (newCountdownValue <= 0) {
      endQuiz();
    }
  }, 1000);

  showQuestion();
}

// Show a question
function showQuestion() {
  const currentQuestion = questions[questionIndex];
  questionElement.textContent = currentQuestion.question;

  // Shuffle the answer choices
  shuffleArray(currentQuestion.choices);

  // Add the answer choices to the buttons
  for (let i = 0; i < choicesElement.children.length; i++) {
    const button = choicesElement.children[i].querySelector(".choice");
    button.textContent = currentQuestion.choices[i];
    button.addEventListener("click", handleAnswerClick);
  }
}

// Handle a click on an answer choice
function handleAnswerClick(event) {
  const selectedChoice = event.target;
  const currentQuestion = questions[questionIndex];

  if (currentQuestion.choices.indexOf(selectedChoice.textContent) === currentQuestion.correctChoice) {
    // Answer is correct
    score++;
  } else {
    // Answer is incorrect, deduct 10 seconds from the timer
    const newCountdownValue = parseInt(countdownElement.textContent) - 10;
    countdownElement.textContent = newCountdownValue;
  }

    // Move to the next question or end
  questionIndex++;
  if (questionIndex >= questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(countdownIntervalId);
  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";
  scoreElement.textContent = score;
}

// Save the score and initials
function saveScore() {
  const initials = initialsInput.value.toUpperCase();
  localStorage.setItem(initials, score);
  initialsInput.value = "";
  location.reload();
};

// Add event listener to start button
startButton.addEventListener("click", startQuiz);

// Add event listener to save button
document.getElementById("save").addEventListener("click", saveScore);
