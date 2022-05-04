'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const gameRules = document.querySelector('.game-rules');
const overlay = document.querySelector('.overlay');
const btnCloseRules = document.querySelector('.btn-close-text');
const btnOpenRules = document.querySelector('.btn--game-rules');

const closeRulesText = function () {
  gameRules.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openRulesText = function () {
  gameRules.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnOpenRules.addEventListener('click', openRulesText);
btnCloseRules.addEventListener('click', closeRulesText);
overlay.addEventListener('click', closeRulesText);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !gameRules.classList.contains('hidden')) {
    closeRulesText();
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // check for rolled 1:
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner';
      // Switch to the next player
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document.getElementById(`name--${activePlayer}`).textContent = `player ${
    activePlayer + 1
  }`;
  init();
});
