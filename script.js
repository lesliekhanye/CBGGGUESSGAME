document.addEventListener('click', () => {
    const audio = document.getElementById('background-audio');
    if (audio.paused) {
        audio.play();
    }
});

const guessedNumber = document.querySelector(".guessedNumber");
const buttonGuess = document.querySelector(".play");

const guesses = document.querySelector(".guesses");
const score = document.querySelector(".score");
const gamesPlayed = document.querySelector(".gamesPlayed");
const hint = document.querySelector(".hint");
const difficultyDropdown = document.querySelector(".difficultyLevel");

const rule = document.querySelector(".rule");

let totalScore = 0;
let games = 0;
let guessesleft;
let currentGuessNumber;

// Function to initialize the game based on difficulty
function initializeGame() {
  const difficultyLevel = difficultyDropdown.value;

  if (difficultyLevel === "Easy") {
    guessesleft = 20;
    currentGuessNumber = Math.floor(Math.random() * 21);
    rule.textContent = "You have 20 chances to guess a number between 0 and 21";
  } else if (difficultyLevel === "Medium") {
    guessesleft = 15;
    currentGuessNumber = Math.floor(Math.random() * 31); // Range 0-30
    rule.textContent = "You have 15 chances to guess a number between 0 and 31";
  } else if (difficultyLevel === "Hard") {
    guessesleft = 8;
    currentGuessNumber = Math.floor(Math.random() * 51); // Range 0-50
    rule.textContent = "You have 8 chances to guess a number between 0 and 51";
  } else if (difficultyLevel === "Impossible") {
    guessesleft = 2;
    currentGuessNumber = Math.floor(Math.random() * 101); // Range 0-100
    rule.textContent = "You have 2 chances to guess a number between 0 and 101";
  }

  guesses.textContent = guessesleft;
  hint.textContent = "READY TO PLAY";
  guessedNumber.value = ""; // Clear the input field
  buttonGuess.textContent = "GuessNumber"; // Reset the button text
  console.log(
    `Game started with difficulty: ${difficultyLevel}, Number: ${currentGuessNumber}`
  );

  // Ensure the button does not have multiple event listeners
  buttonGuess.removeEventListener("click", initializeGame); // Remove the "Play Again" listener if it exists
}

// Event listener for the button
buttonGuess.addEventListener("click", function () {
  const userValue = parseInt(guessedNumber.value, 10);

  if (isNaN(userValue)) {
    hint.textContent = "Please enter a valid number!";
    return;
  }

  if (guessesleft > 0) {
    if (currentGuessNumber > userValue) {
      hint.textContent = "Go High";
      guessedNumber.value = "";
    } else if (currentGuessNumber < userValue) {
      hint.textContent = "Go Low";
      guessedNumber.value = "";
    } else {
      hint.textContent = "CORRECT! Ready for the next round.";
      const winSplash = document.querySelector(".splashWin");

      // Flash background green
      winSplash.classList.remove("bg-[#393939]");
      winSplash.classList.add("bg-[#00FF00]");

      // Revert background to the original color
      setTimeout(() => {
        winSplash.classList.remove("bg-[#00FF00]");
        winSplash.classList.add("bg-[#393939]");
      }, 1000);

      console.log("Yay, you guessed it!");
      totalScore += guessesleft; // Add remaining guesses to score
      score.textContent = totalScore;
      games++;
      gamesPlayed.textContent = games;

      // Reset for the next round
      initializeGame();
      return;
    }

    guessesleft--; // Decrement guesses left
    guesses.textContent = guessesleft;

    if (guessesleft <= 0) {
      console.log("No guesses left. Game over.");
      hint.textContent = "You Lose, Try Again!";
      buttonGuess.textContent = "Play Again";

      // Add "Play Again" functionality
      buttonGuess.addEventListener("click", initializeGame);
    }
  }
});

// Initialize the game when the dropdown value changes
difficultyDropdown.addEventListener("change", initializeGame);

// Initialize the game on page load
initializeGame();
