const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const messageBox = document.getElementById('message-box');
const infoLink = document.getElementById('info-link');
const questionsAttemptedElement = document.getElementById('questions-attempted');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const unattemptedElement = document.getElementById('unattempted');

let currentQuestionIndex = 0;
let attempted = 0;
let correct = 0;
let wrong = 0;
let unattempted = 10;
let quizStarted = false;

const questions = [
    { question: "What does PACE stand for?", answers: [{ text: "Plankton, Aerosol, Cloud, ocean Ecosystem", correct: true }, { text: "Polar and Arctic Climate Exploration", correct: false }], infoLink: "https://pace.oceansciences.org/overview.htm" },
    { question: "When did the PACE mission launch?", answers: [{ text: "February 8, 2024", correct: true }, { text: "March 15, 2022", correct: false }], infoLink: "https://pace.oceansciences.org/launch.htm" },
    { question: "What is the primary goal of PACE?", answers: [{ text: "Study ocean ecosystems and atmosphere interactions", correct: true }, { text: "Explore deep space", correct: false }], infoLink: "https://pace.oceansciences.org/science.htm" },
    { question: "Which instrument helps PACE measure ocean color?", answers: [{ text: "Ocean Color Instrument (OCI)", correct: true }, { text: "Hyper-Angular Rainbow Polarimeter (HARP2)", correct: false }], infoLink: "https://pace.oceansciences.org/instruments.htm" },
    { question: "What type of data does PACE primarily collect?", answers: [{ text: "Ocean and atmospheric data", correct: true }, { text: "Data on planetary geology", correct: false }], infoLink: "https://pace.oceansciences.org/data.htm" },
    { question: "How does PACE contribute to climate research?", answers: [{ text: "By studying carbon dioxide exchange between the ocean and atmosphere", correct: true }, { text: "By mapping seismic activity under the sea", correct: false }], infoLink: "https://pace.oceansciences.org/science_ocean.htm" },
    { question: "What is the benefit of PACE's data being open to the public?", answers: [{ text: "Allows anyone to make scientific discoveries", correct: true }, { text: "Data is reserved only for NASA researchers", correct: false }], infoLink: "https://pace.oceansciences.org/opendata.htm" },
    { question: "What are phytoplankton, as studied by PACE?", answers: [{ text: "Microscopic plants in the ocean", correct: true }, { text: "Large marine mammals", correct: false }], infoLink: "https://pace.oceansciences.org/phytoplankton.htm" },
    { question: "What does the SPEXone instrument measure?", answers: [{ text: "Aerosols and their properties", correct: true }, { text: "Water depth in the ocean", correct: false }], infoLink: "https://pace.oceansciences.org/instruments_spexone.htm" },
    { question: "What does PACE help scientists understand about aerosols?", answers: [{ text: "Their role in fueling phytoplankton growth", correct: true }, { text: "How they affect tectonic movements", correct: false }], infoLink: "https://pace.oceansciences.org/aerosols.htm" }
];

// Start Quiz button event listener
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    quizStarted = true;
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    infoLink.href = question.infoLink;
    infoLink.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    // Prevent further answer selection
    if (!quizStarted) return;

    attempted++;
    if (answer.correct) {
        correct++;
        messageBox.innerText = "Correct!";
    } else {
        wrong++;
        messageBox.innerText = "Wrong!";
    }
    
    // Update link and show more info
    infoLink.style.display = 'block';

    // Disable all buttons after an answer is selected
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    // Update stats in the legend
    updateStats();
    
    // Show next button for the next question
    nextButton.style.display = 'block';
}

// Function to show the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        messageBox.innerText = "";
        nextButton.style.display = 'none';
        infoLink.style.display = 'none';
    } else {
        showResults();
    }
});

function updateStats() {
    questionsAttemptedElement.innerText = attempted;
    correctAnswersElement.innerText = correct;
    wrongAnswersElement.innerText = wrong;
    unattemptedElement.innerText = questions.length - attempted;
}

function showResults() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${correct} / ${questions.length}</p>
    `;
    quizStarted = false;
}
    