function setTheProperties() {
  // the count down
  theTimer.innerHTML = `${Math.floor(timer / 60) > 10 ? Math.floor(timer / 60) : "0" + Math.floor(timer / 60)}: ${timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}`;
  questionsLength = fetchedData.length;
  //   bar progress
  theBar.style.left = `${-100 + ((currentQuestion - 1) / questionsLength) * 100}%`;
  currentSpan.innerHTML = currentQuestion;
  countSpan.innerHTML = questionsLength;
  questionLine.innerHTML = fetchedData[currentQuestion - 1].title;
  //   the answers
  document.querySelector(".answer-1").innerHTML =
    `<span>A</span> ${fetchedData[currentQuestion - 1]["Answer-one"]}`;
  document.querySelector(".answer-2").innerHTML =
    `<span>B</span> ${fetchedData[currentQuestion - 1]["Answer-two"]}`;
  document.querySelector(".answer-3").innerHTML =
    `<span>C</span> ${fetchedData[currentQuestion - 1]["Answer-three"]}`;
  document.querySelector(".answer-4").innerHTML =
    `<span>D</span> ${fetchedData[currentQuestion - 1]["Answer-four"]}`;
  footerInBottom();
}
function createProgressCircles() {
  for (i = 0; i < fetchedData.length; i++) {
    let span = document.createElement("span");
    if (i == 0) {
      span.className = "on";
    }
    progressCircles.appendChild(span);
  }
}
function clickonDivs(divs) {
  Array.from(divs).forEach((e) => {
    e.classList.remove("active");
  });
}
function GoToNextQuestion() {
  answerDivs.forEach((e) => e.classList.remove("active"));
  currentQuestion++;
  setTheProperties();
  let circles = document.querySelectorAll(".progress-circles span");
  Array.from(circles)[currentQuestion - 2].classList.remove("on"); // last question answered
  Array.from(circles)[currentQuestion - 2].classList.add("done"); // last question answered
  Array.from(circles)[currentQuestion - 1].classList.add("on"); // current question
}
function stopAndShowResult() {
  // remove elements
  questionLine.remove();
  answersCountainer.remove();
  submitBtn.remove();
  // show result
  let resultDiv = document.createElement("div");
  resultDiv.innerHTML = `You result is ${correctCounter} of ${questionsLength} <br> You've taken ${totalTime - timer < 60 ? totalTime - timer : Math.floor((totalTime - timer) / 60) + " minutes and " + ((totalTime - timer) % 60)} seconds.`;
  resultDiv.style.textAlign = "center";
  resultDiv.style.padding = "40px 0 0 0";
  resultDiv.style.fontSize = "24px";
  document.querySelector(".quiz-app").append(resultDiv);
  clearInterval(counter);
  footerInBottom()
}
// making the footer in the bottom 
function footerInBottom() {
  if (document.documentElement.scrollHeight <= window.innerHeight) {
    document.querySelector("footer").style.position = "fixed";
    document.querySelector("footer").style.bottom = "0";
  } else {
    document.querySelector("footer").style.position = "static";
    document.querySelector("footer").style.bottom = "auto";
  }
}
