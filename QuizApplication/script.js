const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: "<a>",
  },
  {
    question: "Which CSS property changes text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["var", "int", "string", "float"],
    answer: "var",
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "getElementByClass()",
      "querySelectorAll()",
      "getElementById()",
      "selectElement()",
    ],
    answer: "getElementById()",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "##", "<!-- -->", "**"],
    answer: "//",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft", "Apple"],
    answer: "Netscape",
  },
  {
    question: "Which tag displays images in HTML?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    answer: "<img>",
  },
  {
    question: "Which method converts JSON to object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
];

const questionTitle = document.getElementById("question-title");
const optionBoxes = document.querySelectorAll(".questions-option");
const optionTexts = document.querySelectorAll(".question-option-choose");
const submitButton = document.getElementById("submit-button");
const quizList = document.querySelectorAll(".question-back-forth-section");

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

function loadQuestion() {
  const question = quizQuestions[currentQuestion];
  questionTitle.textContent = question.question;

  optionTexts.forEach((option, index) => {
    option.textContent = question.options[index];
  });

  selectedAnswer = null;

  optionBoxes.forEach((box) => {
    box.style.borderColor = "";
  });
  updateQuizList();
}

optionBoxes.forEach((box, index) => {
  box.addEventListener("click", function () {
    optionBoxes.forEach((b) => (b.style.borderColor = ""));
    box.style.borderColor = "#7ba194";
    selectedAnswer = optionTexts[index].textContent;
  });
});

submitButton.addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("Please select option");
    return;
  }

  const correctAnswer = quizQuestions[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    score += 1;
  }

  currentQuestion += 1;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    document.querySelector(".question-select-ans-div").innerHTML = `
      <h1>Quiz Completed</h1>
      <h2>Your score: ${score} / 9</h2>
      <button id="restart-btn" onclick="location.reload()">Restart Quiz</button>
    `;
  }
});

function updateQuizList() {
  quizList.forEach((quiz, index) => {
    quiz.style.backgroundColor = "";
    quiz.style.color = "";

    if (index === currentQuestion) {
      quiz.style.backgroundColor = "#e9f3f0";
      quiz.style.color = "#6e9f94";
    }
  });
}

quizList.forEach((quiz, index) => {
  quiz.addEventListener("click", function () {
    currentQuestion = index;
    loadQuestion();
  });
});

loadQuestion();
