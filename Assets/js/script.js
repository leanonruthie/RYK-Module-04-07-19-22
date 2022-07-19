const quizArray = [
    {
        question: "Commonly used data types DO NOT include?",
        a: "Strings",
        b: "Booleans",
        c: "Alerts",
        d: "Numbers",
        correct: "c",
    },
    {
        question: "The condition in an if/else statement is enclosed within _.",
        a: "Quotes",
        b: "Curly Brackets",
        c: "Parentheses",
        d: "Square Brackets",
        correct: "c",
    },
    {
        question: "Arrays in JavaScript can be used to store __.",
        a: "Numbers and Arrays",
        b: "Other Arrays",
        c: "Booleans",
        d: "All of the Above",
        correct: "d",
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        a: "Commas",
        b: "Curly Brackets",
        c: "Quotes",
        d: "Parentheses",
        correct: "a",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        a: "Javascript",
        b: "Terminal/Bash",
        c: "for Loops",
        d: "Console Log",
        correct: "d",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

generateQuiz();

function generateQuiz() {
    removeUnchecked();

    const currentQuizArray = quizArray[currentQuiz];

    questionEl.innerText = currentQuizArray.question;
    a_text.innerText = currentQuizArray.a;
    b_text.innerText = currentQuizArray.b;
    c_text.innerText = currentQuizArray.c;
    d_text.innerText = currentQuizArray.d;
}

function removeUnchecked() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function selectChecked() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = selectChecked();
    if (answer) {
        if (answer === quizArray[currentQuiz].correct) {
            score++;
        } 
        currentQuiz++;
        if (currentQuiz < quizArray.length) {
            generateQuiz();
        }
    }
})