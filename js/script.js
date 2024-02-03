'use strict';

let gameNumber, score, gameStatus;

const init = function () {
  document.querySelector('.guess').value = 0;
  gameNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  gameScore.textContent = 20;
  gameStatus = true;
  displayNumber('?');
  activeUI();
  displayMessage('Start guessing...');
};

let highScore = 0;

// VARIABLES
const container = document.querySelector('body');
const numberEl = document.querySelector('.number');
const gameMessage = document.querySelector('.message');
const gameScore = document.querySelector('.score');
const gameHighcore = document.querySelector('.highscore');

const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');

const containerPopup = document.querySelector('.popup');
const btnClosePopup = document.querySelector('.popup__close');

// FUNCTIONS
// Updating user-interface text content
const displayMessage = function (message) {
  gameMessage.textContent = message;
};
const displayScore = function (score) {
  gameScore.textContent = score;
};
const displayHighScore = function (highscore) {
  gameHighcore.textContent = highscore;
};
const displayNumber = function (number) {
  numberEl.textContent = number;
};

// User Interface: Start the Game
const activeUI = function () {
  container.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
};

// User Interface: Game Lost
const lostUI = function () {
  container.style.backgroundColor = 'red';
  numberEl.style.width = '30rem';
};

// User Interface: Game Win
const winUI = function () {
  container.style.backgroundColor = '#60b347';
};

init();

// EventListener: CHECK BUTTON
btnCheck.addEventListener('click', function () {
  const inputNumber = Number(document.querySelector('.guess').value);
  if (gameStatus) {
    //   If Input Number is falsy value
    if (!inputNumber) {
      displayMessage('Invalid Number');
    }

    //   If GUESS IS WRONG
    else if (inputNumber !== gameNumber) {
      // If Input Number greater than Game Number
      displayMessage(inputNumber > gameNumber ? 'Too High...' : 'Too Low...');

      // REDUCE Current Score
      score--;
      displayScore(score);

      //   Current Score < 1 --> Stop the game
      if (score < 1) {
        gameStatus = false;
        displayNumber(gameNumber);
        gameMessage.textContent = 'You LOST!!!';
        lostUI();
      }

      //   If GUESS IS CORRECT
    } else if (inputNumber === gameNumber) {
      winUI();
      gameMessage.textContent = 'Correct!!!';

      if (score > highScore) {
        highScore = score;
        displayHighScore(highScore);
      }

      displayNumber(gameNumber);
      gameStatus = false;
    }
  }
});

// EventListener: AGAIN BUTTON
btnAgain.addEventListener('click', init);

// EventListener: POPUP CLOSE BUTTON
btnClosePopup.addEventListener('click', function () {
  containerPopup.classList.add('hidden');
});
