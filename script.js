let questions = [
          {
                    question: "Wer ist der Erfinder von Linux?",
                    answer_1: "Linus Torvalds",
                    answer_2: "Bill Gates",
                    answer_3: "Steve Jobs",
                    answer_4: "Mark Zuckerberg",
                    answer_5: "Google(Firma)",
                    right_answer: 1,
          },
          {
                    question: "Wie viele Linux Distros gibt es ungefähr?",
                    answer_1: "ca. 60",
                    answer_2: "ca. 100",
                    answer_3: "ca. 70",
                    answer_4: "ca. 10",
                    answer_5: "ca. 50",
                    right_answer: 5,
          },

          {
                    question: "Was davon ist keine Linux Oberfläche?",
                    answer_1: "Plasma",
                    answer_2: "Mate",
                    answer_3: "Xfce",
                    answer_4: "Elementary",
                    answer_5: "Unity",
                    right_answer: 4,
          },
          {
                    question: "In welchem Bereich wird Linux am häufigsten eingesetzt?",
                    answer_1: "Gaming",
                    answer_2: "Server",
                    answer_3: "Developing",
                    answer_4: "Office",
                    answer_5: "Desktop PCs",
                    right_answer: 2,
          },
          {
                    question: "Was davon ist keine Linux Distro?",
                    answer_1: "Damn Small Linux",
                    answer_2: "KDE",
                    answer_3: "Peppermint",
                    answer_4: "Manjaro",
                    answer_5: "Poppy",
                    right_answer: 2,
          },
          {
                    question: "Welche Distribution hat die Anwendungsverwaltung mit den meisten Anwendungen?",
                    answer_1: "Elementary",
                    answer_2: "Mint",
                    answer_3: "Ubuntu ",
                    answer_4: "Arch",
                    answer_5: "Peppermint",
                    right_answer: 3,
          },
          {
                    question: "Was ist die ressourcensparendste Linux Oberfläche?",
                    answer_1: "Mate",
                    answer_2: "XFCE",
                    answer_3: "Cinnamon",
                    answer_4: "LXDE",
                    answer_5: "KDE",
                    right_answer: 4,
          },
          {
                    question: "Was hiervon ist keine Paketverwaltung?",
                    answer_1: "apt",
                    answer_2: "packager",
                    answer_3: "pacman",
                    answer_4: "flatpack",
                    answer_5: "slackware",
                    right_answer: 2,
          },
          {
                    question: "Zwischen wie viel Arbeitsspeicher können die unterschiedlichen Distros brauchen?",
                    answer_1: "10 MB - 1 GB",
                    answer_2: "400 MB - 700 MB",
                    answer_3: "1 GB - 5GB",
                    answer_4: "600 MB - 1,4 GB",
                    answer_5: "1,4 GB - 2,0 GB",
                    right_answer: 1,
          },
          {
                    question: "Was ist kein Desktop?",
                    answer_1: "Plasma",
                    answer_2: "Mate",
                    answer_3: "Xfce",
                    answer_4: "Elementary",
                    answer_5: "Unity",
                    right_answer: 4,
          },
];

let score = 0;
let currentQuestion = 0;

let audioSuccess = new Audio("audio/success.mp3");
let audioWrong = new Audio("audio/wrong.mp3");

//start quiz
function startQuiz() {
          document.getElementById("startSide").style = "display:none";
          document.getElementById("quizSideStart").style = " ";
          init();
}

//render main start side
function init() {
          document.getElementById(
                    "maxQuestions"
          ).innerHTML = `${questions.length}`;
          showQuestion();
}

//show question
function showQuestion() {
          if (currentQuestion >= questions.length) {
                    showEndResult();
          } else {
                    showNextQuestion();
          }
}

//check answer and go next question
function answer(idValue) {
          let questionRightAnswer = questions[currentQuestion].right_answer;
          let questionLastValue = idValue.slice(-1);

          if (questionLastValue == questionRightAnswer) {
                    rightAnswer(idValue);
          } else {
                    wrongAnswer(idValue, questionRightAnswer);
          }
          disableAnswer();

          document.getElementById("sendButton").disabled = false;
}

function showEndResult() {
          progressBar();
          document.getElementById("endScreen").style = "";
          document.getElementById("questionBody").style = "display:none;";
          document.getElementById("imgQuiz").src = "img/cup.jpg";

          document.getElementById("maxQuestionsEnd").innerHTML =
                    questions.length;
          document.getElementById("resultPlayer").innerHTML = score;
}

function showNextQuestion() {
          let question = questions[currentQuestion];
          document.getElementById("questiontext").innerHTML = question.question;
          document.getElementById("answer_1").innerHTML = question.answer_1;
          document.getElementById("answer_2").innerHTML = question.answer_2;
          document.getElementById("answer_3").innerHTML = question.answer_3;
          document.getElementById("answer_4").innerHTML = question.answer_4;
          document.getElementById("answer_5").innerHTML = question.answer_5;
          enableAnswer();
          progressBar();
}

function rightAnswer(idValue) {
          document.getElementById(idValue).classList.add("bg-success");
          audioSuccess.play();
          score++;
}

function wrongAnswer(idValue, questionRightAnswer) {
          document.getElementById(idValue).classList.add("bg-danger");
          let rightID = "answer_" + questionRightAnswer;
          document.getElementById(`${rightID}`).classList.add("bg-success");
          audioWrong.play();
}

function disableAnswer() {
          document.getElementById("answerBox1").style.pointerEvents = "none";
          document.getElementById("answerBox2").style.pointerEvents = "none";
          document.getElementById("answerBox3").style.pointerEvents = "none";
          document.getElementById("answerBox4").style.pointerEvents = "none";
          document.getElementById("answerBox5").style.pointerEvents = "none";
}

function enableAnswer() {
          document.getElementById("answerBox1").style.pointerEvents = "auto";
          document.getElementById("answerBox2").style.pointerEvents = "auto";
          document.getElementById("answerBox3").style.pointerEvents = "auto";
          document.getElementById("answerBox4").style.pointerEvents = "auto";
          document.getElementById("answerBox5").style.pointerEvents = "auto";
}

function nextQuestion() {
          //increases counter for next element in json
          currentQuestion++;
          //disable button
          document.getElementById("sendButton").disabled = true;
          //show current question
          document.getElementById("currentQuestion").innerHTML = `${
                    currentQuestion + 1
          }`;
          //reset background color answer
          resetAnswerButtons();
          //show next question
          showQuestion();
}

//reset background color answer
function resetAnswerButtons() {
          for (let index = 1; index < 6; index++) {
                    const element = "answer_" + index;
                    document.getElementById(element).classList.remove(
                              "bg-success"
                    );
                    document.getElementById(element).classList.remove(
                              "bg-danger"
                    );
          }
}

//show progress bar questions
function progressBar() {
          let progress = currentQuestion;
          let allQestions = questions.length;
          let progressInPercent = Math.round((100 / allQestions) * progress);

          document.getElementById(
                    `progressBar`
          ).style = `width: ${progressInPercent}%`;
          document.getElementById(
                    `progressBar`
          ).innerHTML = `${progressInPercent}%`;
}

function restartGame() {
          document.getElementById("imgQuiz").src = "img/question.jpg";
          document.getElementById("endScreen").style = "display:none;";
          document.getElementById("questionBody").style = "";
          document.getElementById("currentQuestion").innerHTML = 1;
          score = 0;
          currentQuestion = 0;
          init();
}
