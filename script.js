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
const homeButton = document.getElementById("home-button");
const instructionsImage = document.getElementById("instructions-image");

let initialTime = 0; // 初始倒數時間
let currentTime = 0; // 當前倒數時間
let isRunning = false; // 計時器是否正在運行
let timerStage = 1; // 1: 第一階段倒數, 2: 第二階段倒數
let intervalId;

function formatTime(seconds) {
  return `${seconds}`;
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

instructionsButton.addEventListener("click", () => {
  homeScreen.classList.add("hidden");
  instructionsScreen.classList.remove("hidden");

  // 載入使用說明圖片
  instructionsImage.src = "instructions.png"; // 替換成您的圖片 URL
});

homeButton.addEventListener("click", () => {
  instructionsScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});
