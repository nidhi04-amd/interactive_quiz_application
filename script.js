const allQuestions = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language styles web pages?",
      options: ["HTML", "CSS", "JS", "Python"],
      answer: "CSS"
    }
  ],
  math: [
    {
      question: "What is 5 + 7?",
      options: ["10", "11", "12", "13"],
      answer: "12"
    },
    {
      question: "What is 9 × 3?",
      options: ["27", "18", "21", "24"],
      answer: "27"
    }
  ]
};

let currentQuestion = 0;
let score = 0;
let selectedCategory = 'general';
let questions = [];
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startScreen = document.getElementById("start-screen");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");

// Load high score from localStorage
const savedHighScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = savedHighScore;

function startQuiz() {
  selectedCategory = document.getElementById("category-select").value;
  questions = allQuestions[selectedCategory];
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  nextBtn.disabled = true;
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#d4edda"; // green
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#f8d7da"; // red
    }
  });
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    startTimer();
    nextBtn.disabled = true;
  } else {
    showResult();
  }
});

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(""); // auto-skip
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerEl.textContent = 10;
}

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;

  // Save high score
  if (score > savedHighScore) {
    localStorage.setItem("highScore", score);
    highScoreEl.textContent = score;
  }
}

function restartQuiz() {
  startScreen.classList.remove("hidden");
  resultEl.classList.add("hidden");
}
