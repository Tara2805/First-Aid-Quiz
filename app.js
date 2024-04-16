// Hide the quiz container initially
document.querySelector(".quizContainer").style.display = "none";

// Select all radio buttons in the quiz container
const radioButtons = document.querySelectorAll(
  '.quizContainer input[type="radio"]'
);

// Disable all radio buttons initially
radioButtons.forEach((button) => {
  button.disabled = true;
});

document.getElementById("Quiz").addEventListener("submit", function (event) {
  event.preventDefault();
  let userName = document.getElementById("name").value;

  // Insert greeting message
  document.getElementById("Greeting").textContent =
    "Hello " +
    userName +
    "! This quiz has 10 questions. Answer all questions correctly to pass.";

  // Enable all radio buttons in the quiz container
  radioButtons.forEach((button) => {
    button.disabled = false;
  });

  // Show the quiz container
  document.querySelector(".quizContainer").style.display = "block";
  questions[0].style.display = "block";
});

//setting up the count
const questions = document.querySelectorAll(".question");
const nextButtons = document.querySelectorAll(".next");
let currentQuestion = 0;
let correctAnswers = 0;

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectOption();
  });
});

function selectOption() {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestion + 1}"]:checked`
  );
  if (selectedOption) {
    if (
      selectedOption.value ===
      questions[currentQuestion].getAttribute("data-correct")
    ) {
      correctAnswers++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questions[currentQuestion - 1].style.display = "none";
      questions[currentQuestion].style.display = "block";
    } else {
      // If there are no more questions, show the results
      calculateResults();
    }
  }
}

const submitButton = document.getElementById("submitQuiz");

submitButton.addEventListener("click", function () {
  calculateResults();
});

function backgroundColourChange() {
  if (correctAnswers == 10) {
    document.body.style.backgroundColor = "green";
  } else {
    document.body.style.backgroundColor = "red";
  }
}

//calculate results js
function calculateResults() {
  selectOption();
  const totalQuestions = questions.length;
  const percentage = (correctAnswers / totalQuestions) * 100;
  document.getElementById(
    "results"
  ).innerHTML = `You got ${correctAnswers} out of ${totalQuestions} questions correct (${percentage}%)`;
  backgroundColourChange();

  let retakeButton = document.getElementById("retakeButton");

  if (!retakeButton && percentage < 100) {
    retakeButton = document.createElement("button");
    retakeButton.textContent = "Retake";
    retakeButton.id = "retakeButton";
    document.body.appendChild(retakeButton);
    retakeButton.style.position = "absolute";
    retakeButton.style.left = "50%";
    retakeButton.style.marginTop = "20px";
    retakeButton.style.margin = "20px";
    retakeButton.style.transform = "translateX(-50%)";
    retakeButton.addEventListener("click", refreshPage);

    function refreshPage() {
      window.history.go(0);
    }

    /* Refreshes the whole page */
    retakeButton.addEventListener("click", refreshPage);
  }
}
