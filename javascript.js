'use strict';

const current0El = document.querySelector('.current--0');
const current1El = document.querySelector('.current--1');
const score0El = document.querySelector('.score--0');
const score1El = document.querySelector('.score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.getElementById('btnRoll');
const btnHold = document.getElementById('btnHold');
const btnAgain = document.getElementById('btnAgain');

let scores, currentScore, activePlayer, playing;

function init() {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  document.querySelector(`.current--0`).textContent = 0;
  document.querySelector(`.current--1`).textContent = 0;
  document.querySelector('.score--0').textContent = 0;
  document.querySelector('.score--1').textContent = 0;
}

init();

const switchPlayer = () => {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('.player--0').classList.toggle('player-active');
  document.querySelector('.player--1').classList.toggle('player-active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');
    } else {
      switchPlayer();
    }
  }
});

// Modal

btnAgain.addEventListener('click', init);

document.querySelector('.rules').addEventListener('click', modalOpen);
document.querySelector('.close-modal').addEventListener('click', modalClose);
document.querySelector('.overlay').addEventListener('click', modalClose);

function modalOpen() {
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.modal').classList.remove('hidden');
}

function modalClose() {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.modal').classList.add('hidden');
}

document.addEventListener('keydown', e => {
  if (
    !document.querySelector('.modal').classList.contains('hidden') &&
    e.key === 'Escape'
  ) {
    modalClose();
  }
});
