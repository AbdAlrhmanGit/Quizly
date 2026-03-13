// Getting the elements
const currentSpan = document.querySelector(".question-counter .current");
const countSpan = document.querySelector(".question-counter .length");
const theTimer = document.querySelector(".timer");
const progressBar = document.querySelector(".progress-bar");
const theBar = document.querySelector(".progress-bar .bar");
const progressCircles = document.querySelector(".progress-circles");
const questionLine = document.querySelector(".question");
const answersCountainer = document.querySelector(".answers");
const answerDivs = document.querySelectorAll(".answers div");
const submitBtn = document.querySelector("button");
// settings
let currentQuestion = 1;
let questionsLength;
let fetchedData = [];
let correctCounter = 0;
let totalTime = timer = 300; // 5 minutes // formatter maybe change this line revise it on error
let answer;
let counter;
// fetch the data
fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    fetchedData = data;
    // setting the properties
  })
  .then(setTheProperties)
  .then(() => {
    createProgressCircles();
    // creating count Down
    counter = setInterval(() => {
      timer--;
      theTimer.innerHTML = `${Math.floor(timer / 60) > 10 ? Math.floor(timer / 60) : "0" + Math.floor(timer / 60)}: ${timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}`;
      if (timer <= 30 && timer > 0) {
        theTimer.classList.add("timeout");
      } else if (timer == 0) {
        stopAndShowResult();
        answerDivs.forEach((e) => {
          e.removeEventListener("click");
        });
      }
    }, 1000);
    // click on Divs
    answerDivs.forEach((e) => {
      e.addEventListener("click", () => {
        answerDivs.forEach((e) => e.classList.remove("active"));
        e.classList.add("active");
        answer = e.innerText;
      });
    });
    // submit Answer
    submitBtn.onclick = () => {
      if (currentQuestion != questionsLength) {
        if (
          String(answer)
            .toLowerCase()
            .includes(
              fetchedData[currentQuestion - 1]["right-Answer"].toLowerCase(),
            )
        ) {
          correctCounter++;
          GoToNextQuestion();
        } else {
          GoToNextQuestion();
        }
      } else {
        if (
          String(answer)
            .toLowerCase()
            .includes(
              fetchedData[currentQuestion - 1]["right-Answer"].toLowerCase(),
            )
        ) {
          correctCounter++;
        }
        theBar.style.left = 0;
        let circles = document.querySelectorAll(".progress-circles span");
        Array.from(circles)[currentQuestion - 1].classList.add("done");
        Array.from(circles)[currentQuestion - 1].classList.remove("on");
        stopAndShowResult();
      }
    };
  }).catch((err)=>{console.log(Error(err))});
window.onresize = () => footerInBottom();
