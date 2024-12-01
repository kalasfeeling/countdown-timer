const homeScreen = document.getElementById("home-screen");
const timerScreen = document.getElementById("timer-screen");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const confirmButton = document.getElementById("confirm-button");
const timerDisplay = document.getElementById("timer-display");
const startPauseButton = document.getElementById("start-pause-button");
const backButton = document.getElementById("back-button");

let totalSeconds = 0;
let intervalId;
let isRunning = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  intervalId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      timerDisplay.textContent = formatTime(totalSeconds);
    } else {
      totalSeconds = Math.ceil(totalSeconds / 16) || 15; // 重置倒數
      timerDisplay.textContent = formatTime(totalSeconds);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

confirmButton.addEventListener("click", () => {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  totalSeconds = minutes * 60 + seconds;
  totalSeconds = Math.ceil(totalSeconds / 16); // 無條件進位
  timerDisplay.textContent = formatTime(totalSeconds);

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
  homeScreen.classList.remove("hidden");
  timerScreen.classList.add("hidden");
});
