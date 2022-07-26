// Establish an array of 5 objects with properties composed of quiz question, multiple choices and correct answer

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
        correct: "c",
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

// Establish timer which will eventually be equivalent to final score in scoreboard

const timerEl = document.getElementById("timer");
const finalScore = document.getElementById("finalscore");

let time = quizArray.length * 20;
let interval = setInterval(countDown, 1000);

// Set a normal countDown 

function countDown() {
    time--;
    showTimer();
    if (time < 1) {
        endQuiz();
    }
}

function showTimer() {
    timerEl.innerText = time;
}

// Show quiz container

const quiz = document.getElementById("quiz");

quiz.removeAttribute("hidden");

// Replace current text with respective question and multiple choice

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

// Start the quiz with first question being the first object of quizArray

let currentQuiz = 0;

startQuiz();

function startQuiz() {
    removeUnchecked();

    const currentQuizArray = quizArray[currentQuiz];

    questionEl.innerText = currentQuizArray.question;
    a_text.innerText = currentQuizArray.a;
    b_text.innerText = currentQuizArray.b;
    c_text.innerText = currentQuizArray.c;
    d_text.innerText = currentQuizArray.d;
}

// User doesn't click on radio button and those unchecked radio buttons are defined by below function

function removeUnchecked() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// User clicks on radio button and those checked radio buttons are defined by below function

function selectChecked() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Upon submitting five answers to five questions within time, scoreboard and final score appears

const scoreBoard = document.getElementById("scoreboard");
const confirmAnswer = document.getElementById("confirmanswer");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    const answer = selectChecked();
    if (answer) {
        if (answer === quizArray[currentQuiz].correct) {
            confirmAnswer.innerText = "Correct!";
        } else {
            time = time - 20;
            confirmAnswer.innerText = "Incorrect!";
        }
        currentQuiz++;
        if (currentQuiz < quizArray.length) {
            startQuiz();
        } else {
            endQuiz();
        }
    }
})

// Establish what happens any time quiz must end

function endQuiz() {
    clearInterval(interval);
    quiz.setAttribute("hidden", true);
    scoreBoard.removeAttribute("hidden");
    finalScore.innerText = time;
}

const initials = document.getElementById("initials");
const storeBtn = document.getElementById("store");
const initialsEl = document.getElementById("initials");
const leads = document.getElementById("leads");
const highScores = document.getElementById("highscores");
  
  //Store user initials and score when submit button is clicked
  storeBtn.addEventListener("click", storeScore);
  
  function storeScore(event) {
    
    // prevent normal form function
    
    event.preventDefault();
  
    // Make sure if initials aren't submitted, the user submits characters
    
    if (!initialsEl.value) {
      alert("Don't forget to submit your initials");
      return;
    }
  
    // Applications will show an object of initials and final score

    const leadsProperties = {
      initials: initialsEl.value,
      score: finalScore.innerHTML,
    };

    updateCurrentLeads(leadsProperties);
  
    // Allow leads-container to appear
    scoreBoard.setAttribute("hidden", true);
    leads.removeAttribute("hidden");
  
    renderLeads();
  }
  
  // Function below needed for storeScore function

  function updateCurrentLeads(leadsProperties) {

    let leadsArray = getLeads();

    leadsArray.push(leadsProperties);

    // "The JSON.stringify() method converts a JavaScript object or value to a JSON string"

    localStorage.setItem("leadsArray", JSON.stringify(leadsArray));
  }
  
  // Function used for leadsArray

  function getLeads() {

    let storedLeads = localStorage.getItem("leadsArray");
    if (storedLeads !== null) {

    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    
    let leadsArray = JSON.parse(storedLeads);
      return leadsArray;
    } else {
      leadsArray = [];
    }
    return leadsArray;
  }
  
  // Function below also necessary for add event listener
  
  function renderLeads() {

    let orderLeadsArray = orderLeads();

    highScores.innerHTML = "";
    
    for (let i = 0; i < orderLeadsArray.length; i++) {
      let submittedLeads = orderLeadsArray[i];
      let newLeads = document.createElement("li");
      newLeads.textContent = submittedLeads.initials + " - " + submittedLeads.score;
      highScores.append(newLeads);
    }
  }
  
  // Function below necessary for above

  function orderLeads() {
    let leadsArray = getLeads();
    if (!leadsArray) {
      return;
    }
  
    leadsArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leadsArray;
  }
  
  // User selects clear score button to clear list

  const clearScoreBtn = document.getElementById("clearscore");

  clearScoreBtn.addEventListener("click", clearScore);
  
  function clearScore() {
    localStorage.clear();
    renderLeads();
  }
