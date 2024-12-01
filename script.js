const homeScreen = document.getElementById("home-screen");
const timerScreen = document.getElementById("timer-screen");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const confirmButton = document.getElementById("confirm-button");
const timerDisplay = document.getElementById("timer-display");
const startPauseButton = document.getElementById("start-pause-button");
const backButton = document.getElementById("back-button");

let initialTime = 0; // 初始倒數時間
let currentTime = 0; // 當前倒數時間
let isRunning = false; // 計時器是否正在運行
let timerStage = 1; // 1: 第一階段倒數, 2: 第二階段倒數
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
      // 切換倒數階段
      if (timerStage === 1) {
        timerStage = 2;
        currentTime = initialTime - 1; // 第二次倒數從初始時間 - 1 開始
        if (currentTime <= 0) currentTime = 1; // 確保不小於 1
      } else {
        timerStage = 1;
        currentTime = initialTime; // 重置到初始時間
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
  initialTime = Math.ceil(totalSeconds / 16); // 除以 16 無條件進位
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
  timerStage = 1; // 重置到第一階段
  homeScreen.classList.remove("hidden");
  timerScreen.classList.add("hidden");
});
