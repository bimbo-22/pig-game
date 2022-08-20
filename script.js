'use strict';

//selecting elements from html
const player0El = document.querySelector('.player--0'); // player 1 active to change background color
const player1El = document.querySelector('.player--1'); // player 2 active to change background color
const score0El = document.querySelector('#score--0'); //total score for player 1
const score1El = document.querySelector('#score--1'); // total score for player 2
const current0El = document.getElementById('current--0'); // current player 1 score
const current1El = document.getElementById('current--1'); // current player 2 score
const diceEl = document.querySelector('.dice'); // dice
const btnNew = document.querySelector('.btn--new'); // new game
const btnRoll = document.querySelector('.btn--roll'); // roll dice
const btnHold = document.querySelector('.btn--hold'); // hold

//declaration and initial variables
let playing, currentScore, totalScore, activePlayer;

const init = function () {
  playing = true;
  totalScore = [0, 0]; // this holds the total score of each player in an array
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  // need to set the current player's score to 0 before switching it to the second player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  // if activeplayer is 0 return 1 else return 0
  // reassign the active player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // if true play continues else game stops
    //Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    // check for rolled dice a) if true, swith to the next player
    if (dice !== 1) {
      currentScore += dice;
      // output the score to the active player`
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // build id name dynamically
    } else {
      //switch players
      switchPlayer();
    }
  }
});

//  hold dice funcitonality
btnHold.addEventListener('click', function () {
  if (playing) {
    // also if playing is still true continue else stop
    // add currrent score to total score
    totalScore[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    // if the totalscore is greater than or equal to 100 don't switch player else switch player
    if (totalScore[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // when player wins add class player winner which contains the bgcolor
      document
        .querySelector(`.score--${activePlayer}`)
        .classList.remove('player--active'); // when player wins remove class player active which contains the white bg
    } else {
      switchPlayer();
    }
  }
});

// new game functionality
btnNew.addEventListener('click', init);
