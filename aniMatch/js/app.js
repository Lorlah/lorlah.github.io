document.addEventListener("DOMContentLoaded", function start() {
  // Global Variables

  const parentDeck = document.querySelector(".deck");
  const cardList = document.getElementsByClassName("card");
  let moveNo = 0;
  const moveFigure = document.querySelector(".moves");
  const stars = document.querySelectorAll(".stars li");
  const modal = document.querySelector(".modal-background");
  const modalTime = document.querySelector(".modal-time");
  const modalMoves = document.querySelector(".modal-moves");
  const modalStars = document.querySelector(".modal-stars");
  const modalClose = document.querySelector(".modal-close");
  const modalReplay = document.querySelector(".modal-replay");
  const restart = document.querySelector(".restart");
  let startedTimer = true;
  let minutes = 0,
    seconds = 0,
    timeCount;
  let timeFigure = document.getElementsByClassName("timer");
  /*
 * Create a list that holds all of your cards
 */
  const initialCards = Array.from(document.querySelectorAll(".deck li"));

  // Stores all opened cards

  let openedCards = [];

  //  *   - Shuffle the list of cards using the provided "shuffle" method below

  function shuffleDeck() {
    const shuffledCards = shuffle(initialCards);
    for (card of shuffledCards) {
      // Append each node to the parent element

      parentDeck.appendChild(card);
    }
  }
  shuffleDeck();

  // Shuffle function from http://stackoverflow.com/a/2450976

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //  * set up the event listener for a card. If a card is clicked:

  parentDeck.addEventListener("click", event => {
    startTimer();
    cardTarget = event.target;
    if (suitable(cardTarget)) {
      cardToggle(cardTarget);
      addOpenedCard(cardTarget);
      if (openedCards.length === 2) {
        checkMatch();
        logMove();
        starCount();
        cardsMatched();
        displayModal();
      }
    }
  });

  function suitable(cardTarget) {
    return (
      cardTarget.classList.contains("card") &&
      !cardTarget.classList.contains("match") &&
      openedCards.length < 2 &&
      !openedCards.includes(cardTarget)
    );
  }

  // Toggles the open & show classes
  //  *  - display the card's symbol (put this functionality in another function that you call from this one)

  function cardToggle(cardTarget) {
    cardTarget.classList.toggle("open");
    cardTarget.classList.toggle("show");
  }

  // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

  function addOpenedCard(cardTarget) {
    openedCards.push(cardTarget);
    console.log(openedCards);
  }

  //  *  - if the list already has another card, check to see if the two cards match

  function checkMatch() {
    if (
      openedCards[0].firstElementChild.className ===
      openedCards[1].firstElementChild.className
    ) {
      //  *    + if the cards do match, lock the cards in the open position

      openedCards[0].classList.toggle("match");
      openedCards[1].classList.toggle("match");

      // Reset Array

      openedCards = [];

      //  *    + if the cards do not match, remove the cards from the list and hide the card's symbol
    } else {
      setTimeout(() => {
        cardToggle(openedCards[0]);
        cardToggle(openedCards[1]);
        openedCards = [];
      }, 1000);
    }
  }

  //  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

  function logMove() {
    moveNo++;
    moveFigure.innerHTML = moveNo;
    modalMoves.innerHTML = moveNo;
  }

  //  Decrement the number of stars
  function starCount() {
    if (moveNo === 9 || moveNo === 18 || moveNo === 27) {
      reduceStar();
    }
  }

  const starsArray = Array.prototype.slice.call(stars);

  function reduceStar() {
    starsArray.splice(0, 1);
    for (star of stars) {
      if (star.style.display !== "none") {
        star.style.display = "none";
        break;
      }
    }
  }

  // Timer Setup

  function timer() {
    seconds += 1;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    for (let x = 0; x < timeFigure.length; x++) {
      timeFigure[x].innerText = minutes.addZero(2) + ":" + seconds.addZero(2);
    }
  }

  function startTimer() {
    if (startedTimer) {
      timeCount = setInterval(timer, 1500);
      startedTimer = false;
    }
  }

  // Adds zeros to single numbers

  Number.prototype.addZero = function(figures) {
    let singleNum = String(this);
    while (singleNum.length < figures) {
      singleNum = 0 + singleNum;
    }

    return singleNum;
  };

  function stopTimer() {
    clearInterval(timeCount);
    return "Timer Stopped!";
  }
  //  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

  function cardsMatched() {
    let allCardsMatched = true;
    for (let i = 0; i < cardList.length; i++) {
      if (!cardList[i].classList.contains("match")) {
        allCardsMatched = false;
        break;
      }
      // }
      // else {
      //     allCardsMatched = false;
      // }
    }
    return allCardsMatched;
  }

  function displayStats() {
    modalTime.innerHTML = `Your Time:  ${timeFigure[0].innerText}`;
    modalMoves.innerHTML = `Total Moves:  ${moveNo}`;
    modalStars.innerHTML = `Stars Collected:  ${starsArray.length}`;
  }
  function displayModal() {
    let gameOver = cardsMatched();
    console.log(gameOver);
    if (gameOver === true) {
      stopTimer();
      modal.classList.toggle("hide");
      displayStats();
    }
  }

  // On clicking the restart button

  restart.addEventListener("click", function(event) {
    console.log(event);

    window.location.reload();
  });

  modalClose.addEventListener("click", function(event) {
    console.log(event);

    displayModal();
  });

  modalReplay.addEventListener("click", function(event) {
    console.log(event);
    modal.classList.toggle("hide");
    window.location.reload();
  });
});
