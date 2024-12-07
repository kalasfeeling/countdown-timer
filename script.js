const homeScreen = document.getElementById("home-screen");
const timerScreen = document.getElementById("timer-screen");
const instructionsScreen = document.getElementById("instructions-screen");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const confirmButton = document.getElementById("confirm-button");
const instructionsButton = document.getElementById("instructions-button");
const timerDisplay = document.getElementById("timer-display");
const startPauseButton = document.getElementById("start-pause-button");
const backButton = document.getElementById("back-button");
const backToHomeButton = document.getElementById("back-to-home-button");
const instructionImage = document.getElementById("instruction-image");

let initialTime = 0;
let currentTime = 0;
let isRunning = false;
let timerStage = 1;
let intervalId;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  intervalId = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      timerDisplay.textContent = formatTime(currentTime);
    } else {
      if (timerStage === 1) {
        timerStage = 2;
        currentTime = initialTime - 1;
        if (currentTime <= 0) currentTime = 1;
      } else {
        timerStage = 1;
        currentTime = initialTime;
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

confirmButton.addEventListener("click", () => {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  const totalSeconds = minutes * 60 + seconds;
  initialTime = Math.ceil(totalSeconds / 16);
  currentTime = initialTime;

  timerDisplay.textContent = formatTime(currentTime);

  homeScreen.classList.add("hidden");
  timerScreen.classList.remove("hidden");
});

startPauseButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    startPauseButton.textContent = "開始";
  } else {
    startTimer();
    startPauseButton.textContent = "暫停";
  }
  isRunning = !isRunning;
});

backButton.addEventListener("click", () => {
  stopTimer();
  isRunning = false;
  startPauseButton.textContent = "開始";
  minutesInput.value = "";
  secondsInput.value = "";
  timerStage = 1;
  homeScreen.classList.remove("hidden");
  timerScreen.classList.add("hidden");
});

instructionsButton.addEventListener("click", () => {
  homeScreen.classList.add("hidden");
  instructionsScreen.classList.remove("hidden");
  instructionImage.src = "instructions.png"; // 替換為您的圖片路徑
});

backToHomeButton.addEventListener("click", () => {
  instructionsScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});
