'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let total1 = 0;
let total2 = 0;
const switch1To2 = function () {
  currentScore = 0;
  current0El.textContent = currentScore;
  player2.classList.add('player--active');
  player1.classList.remove('player--active');
};
const switch2To1 = function () {
  currentScore = 0;
  current1El.textContent = currentScore;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // 2. display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. check for rolled 1
  if (dice !== 1 && player1.classList.contains('player--active')) {
    currentScore += dice; // add dice to current score
    current0El.textContent = currentScore;
  } else if (dice !== 1 && player2.classList.contains('player--active')) {
    currentScore += dice;
    current1El.textContent = currentScore;
    // switch to next player
  } else if (dice === 1 && player1.classList.contains('player--active')) {
    switch1To2();
  } else if (dice === 1 && player2.classList.contains('player--active')) {
    switch2To1();
  }
});

btnHold.addEventListener('click', function () {
  // add current score to total score
  if (player1.classList.contains('player--active')) {
    total1 += currentScore;
    score0El.textContent = total1;
    currentScore = 0;
    score0El.textContent >= 100
      ? player1.classList.add('player--winner')
      : switch1To2();
  } else if (player2.classList.contains('player--active')) {
    total2 += currentScore;
    score1El.textContent = total2;
    currentScore = 0;
    score1El.textContent >= 100
      ? player2.classList.add('player--winner')
      : switch2To1();
  }

  if (score0El.textContent >= 100 || score1El.textContent >= 100) {
    diceEl.classList.add('hidden');
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
});

btnNew.addEventListener('click', function () {
  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--active', 'player--winner');
  diceEl.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  total1 = 0;
  total2 = 0;
});
