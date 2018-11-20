/*/*
Project completed with much help from Mike Wales' YouTube walkthrough
& Yahya Elharony's too: https://www.youtube.com/watch?v=G8J13lmApkQ
*/

/*
 * Create a list that holds all of your cards
 */


var cards = [ 'fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-bomb', 'fa-bomb',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',

];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function initGame() {
  let deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}
//refresh button
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function(e){

  window.location.reload(true);

}); 
  
  initGame();


var allCards = document.querySelectorAll('.card');
var openCards = [];
let matched = 0;
const popup = document.querySelector('.popup');


allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
    openCards.push(card);
    card.classList.add('open', 'show');

    if (openCards.length === 2) {
      if (openCards[0].dataset.card === openCards[1].dataset.card) {
        openCards[0].classList.add('match');
        openCards[0].classList.add('open');
        openCards[0].classList.add('show');

        openCards[1].classList.add('match');
        openCards[1].classList.add('open');
        openCards[1].classList.add('show');

        openCards = [];

        matched++;

      } else {
      //if cards don't match, hide
      setTimeout(function() {
      openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
      });

        openCards = [];
      }, 500);
    }
    countMoves();
  }
});
});




//Count Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
function countMoves() {
  moves++;
  movesContainer.innerHTML = moves;
  if (moves === 1) {
    startTimer();
  }
  //set the rating
  rating();
}

//Reset Moves
function resetMoves() {
  movesContainer.innerHTML = 0;
}


//Rating
const starsContainer = document.querySelector(".stars");
  function rating() {
    if (moves <= 14) {
      starsContainer.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    } else if (moves > 14 && moves <= 18) {
      starsContainer.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    } else {
      starsContainer.innerHTML =
      '<li><i class="fa fa-star"></i></li>';
    }
  }

//reset Stars
function resetStars() {
  starsContainer.innerHTML =
  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
}

/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = "00";
    totalMinutes = "00";

// Set the default value to the timer's container
timerContainer.innerHTML = totalMinutes + ":"+ totalSeconds

 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
        //Increase minutes when seconds equal 60
        if(totalSeconds === 60) {
          totalMinutes++;
          totalSeconds = 0;
          totalSeconds++;
          // Update the HTML Container with the new time
          timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
        }
        //stop timer when there are 8 matched pairs
        if(matched === 8) {
          stopTimer();
          gameOver();
        }

    }, 1000);
}

//reset timer
function resetTimer() {
  timerContainer.innerHTML = "00:00";
}

/*
* Stop Timer
*/

function stopTimer() {
    clearInterval(liveTimer);
}



/*
*Game Over pop up
*/

function gameOver() {
  popup.classList.remove("hide");
  document.querySelector('.final-move').innerHTML = document.querySelector('.moves').innerHTML;
  document.querySelector('.final-time').innerHTML = document.querySelector('.timer').innerHTML;
  document.querySelector('.final-star').innerHTML = document.querySelector('.stars').innerHTML;
  
}

//close popup
function closePopup() {
  popup.classList.add("hide");
  resetMoves();
  resetTimer();
  resetStars();
  initGame();
}
