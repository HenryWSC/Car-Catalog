const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    })

const questions = [
    {question: "insert question 1 here",  awnsers:[
        {text: "question 1", correct: false},
        {text: "question 2", correct: true},
        {text: "question 3", correct: false},
        {text: "question 4", correct: false},
    ]
    },
    {question: "insert question 2 here",  awnsers:[
        {text: "question 1", correct: true},
        {text: "question 2", correct: false},
        {text: "question 3", correct: false},
        {text: "question 4", correct: false},]}

];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.awnsers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button); 
});
}