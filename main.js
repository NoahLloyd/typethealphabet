let currentLetter = "a";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const bigLetter = document.getElementById("letter");
const time = document.getElementById("time");
const speed = document.getElementById("speed");
let startTime;
let gameOver = false;

document.addEventListener("keydown", (e) => {
  const pressedKey = e.key.toLowerCase();
  const currentLetterInAlphabet = document.getElementById(currentLetter);
  // If correct letter pressed
  if (pressedKey === currentLetter) {
    currentLetterInAlphabet.classList.add("correct");

    // Start timer and track speed
    if (pressedKey === "a") {
      gameOver = false;
      startTime = new Date();
      const stopwatch = setInterval(() => {
        if (gameOver) clearInterval(stopwatch);
        const timeTaken = getTimeInterval(startTime, new Date());
        time.innerText = timeTaken;
        setTimeout(() => {
          getAndInsertSpeed(new Date() - startTime);
        }, 100);
      }, 1);
    }

    // End game
    if (pressedKey === "z") {
      gameOver = true;
      const timeTaken = getTimeInterval(startTime, new Date());
      time.innerText = timeTaken;
      bigLetter.innerText = timeTaken;

      return;
    }

    // Gets the next letter
    nextLetterIndex = alphabet.indexOf(currentLetter) + 1;

    // Changes the current letter, and displayed letter to the next in the alphabet
    currentLetter = alphabet[nextLetterIndex];
    bigLetter.innerText = currentLetter;

    // If not correct letter pressed
  } else {
    currentLetterInAlphabet.classList.add("incorrect");
  }

  // Reset
  if (e.key === " " || e.key === "Tab" || e.key === "Enter") reset();
});

const reset = () => {
  currentLetter = "a";
  bigLetter.innerText = "a";
  time.innerText = "0.000";
  speed.innerText = "0";
  document.querySelectorAll("span[id]").forEach((span) => {
    span.className = "";
  });
};

const getTimeInterval = (start, end) => {
  const timeTaken = new Date(end - start);
  const minutes = timeTaken.getMinutes();
  const seconds = timeTaken.getSeconds();
  const miliseconds = timeTaken.getMilliseconds();
  let formattedTime = `${
    minutes ? minutes + ":" : ""
  }${seconds}:${miliseconds}`;

  // Adds extra 0's to the end if there are too few decimals
  return formattedTime.padEnd(5 - formattedTime.length, "0");
};

const getAndInsertSpeed = (timeTaken) => {
  const wordsWritten = alphabet.indexOf(currentLetter);
  let WPM = Math.round((wordsWritten / 4.7 / (timeTaken / 1000)) * 60);
  speed.innerText = WPM;
};
const toggleDarkMode = () => {
  console.log("asds");
  const data = document.documentElement.dataset;
  if (data.theme) {
    data.theme = "";
  } else {
    data.theme = "dark";
  }
};
document.getElementById("darkMode").addEventListener("click", () => {
  toggleDarkMode();
});
