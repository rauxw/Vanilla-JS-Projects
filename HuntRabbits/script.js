const scoreEl = document.getElementById("score-el");
const playgroundEL = document.getElementById("playground-el");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const highScoreEL = document.getElementById("high-score-el");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

highScoreEL.textContent = "High Score: " + highScore;

let gameIntervalBunny = null;
let gameIntervalSpecialBunny = null;

function playGunShotAudio() {
  const gunshotAudioEl = document.getElementById("shoot-audio");
  gunshotAudioEl.currentTime = 0;
  return gunshotAudioEl.play();
}

function generateBunny() {
  const bunnyEl = document.createElement("div");
  bunnyEl.classList.add("bunny");

  const maxX = playgroundEL.clientWidth - 70;
  const maxY = playgroundEL.clientHeight - 70;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  bunnyEl.style.left = randomX + "px";
  bunnyEl.style.top = randomY + "px";

  bunnyEl.addEventListener("click", function () {
    playGunShotAudio();

    score++;
    scoreEl.textContent = "Score: " + score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreEL.textContent = "High score: " + highScore;
    }

    bunnyEl.remove();
  });

  playgroundEL.appendChild(bunnyEl);
}

function generateSpecialBunny() {
  const specialBunnyEL = document.createElement("div");
  specialBunnyEL.classList.add("bunny-special");

  const maxX = playgroundEL.clientWidth - 90;
  const maxY = playgroundEL.clientHeight - 90;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  specialBunnyEL.style.left = randomX + "px";
  specialBunnyEL.style.top = randomY + "px";

  specialBunnyEL.addEventListener("click", function () {
    playGunShotAudio();

    score += 5;
    scoreEl.textContent = "Score: " + score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreEL.textContent = "High score: " + highScore;
    }

    specialBunnyEL.remove();
  });

  playgroundEL.appendChild(specialBunnyEL);
}

startBtn.addEventListener("click", function () {
  if (!gameIntervalBunny && !gameIntervalSpecialBunny) {
    gameIntervalBunny = setInterval(generateBunny, 1500);
    gameIntervalSpecialBunny = setInterval(generateSpecialBunny, 3500);
  }
});

stopBtn.addEventListener("click", function () {
  clearInterval(gameIntervalBunny);
  gameIntervalBunny = null;

  clearInterval(gameIntervalSpecialBunny);
  gameIntervalSpecialBunny = null;
});
