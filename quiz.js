const startPage = document.getElementById("start-page");
const startButton = document.getElementById("start-btn");
const quizPage = document.getElementById("quiz-page");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "You notice smoke coming from the exhaust that is blue, what does this usually indicate?",
        answers: [
            { text: "Overheating engine", correct: false },
            { text: "Too much fuel", correct: false },
            { text: "Burning oil", correct: true },
            { text: "Water in the exhaust", correct: false },
        ]
    },
    {
        question: "You turn the key and the engine doesn't start you only hear a clicking noise, what's the most likely cause?",
        answers: [
            { text: "Flat tire", correct: false },
            { text: "Dead battery", correct: true },
            { text: "Faulty spark plug", correct: false },
            { text: "Empty fuel tank", correct: false },
        ]
    },
    {
        question: "When braking, you feel a vibration or pulsing through the brake pedal.",
        answers: [
            { text: "Worn brake pads", correct: false },
            { text: "Low brake fluid", correct: false },
            { text: "Warped brake rotors", correct: true },
            { text: "Loose wheel nuts", correct: false },
        ]
    }
];

// Start the quiz
startButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    nextButton.classList.add("hidden");
    // If the Restart listener is attached, remove it so Next will use the main handler
    nextButton.removeEventListener("click", startQuiz);
    // Ensure the next handler is attached exactly once
    nextButton.removeEventListener("click", handleNext);
    nextButton.addEventListener("click", handleNext);
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.classList.remove("hidden");
}

// Named handler so we can add/remove it to avoid 
function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Attach the next handler initially
nextButton.addEventListener("click", handleNext);

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart";
    nextButton.classList.remove("hidden");
    // Switch the button to restart mode: remove the next handler and ensure restart is the only listener
    nextButton.removeEventListener("click", handleNext);
    // Prevent duplicate restart listeners
    nextButton.removeEventListener("click", startQuiz);
    nextButton.addEventListener("click", startQuiz);
}