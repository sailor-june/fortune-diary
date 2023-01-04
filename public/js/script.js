//////////////CONSTRUCTING EACH CARD
const MAJOR = ["Trump"];
const SUITS = ["Cups", "Wands", "Pentacles", "Swords"];
const MINVALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];
const MAJVALUES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
];
export default class Deck {
  constructor(cards = buildDeck()) {
    this.cards = cards;
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}
////////////////////////////////////////////////////////
/////////////assemble deck from individual cards////////
////////////////////////////////////////////////////////

function buildDeck() {
  let minorArcana = SUITS.flatMap((suit) => {
    return MINVALUES.map((value) => {
      return new Card(suit, value);
    });
  });
  let majorArcana = MAJOR.flatMap((suit) => {
    return MAJVALUES.map((value) => {
      return new Card(suit, value);
    });
  });
  let Deck = [];
  for (let cards of minorArcana) {
    Deck.push(cards);
  }
  for (let cards of majorArcana) {
    Deck.push(cards);
  }
  return Deck;
}

const deck = new Deck();

const reading = [];

///////////////////////////////
///////cached dom elements ////
///////////////////////////////
const readingForm = document.getElementById("readingForm");
const save = document.getElementById("save");
const signifier = document.getElementById("signifier");
const oldCards = document.getElementById("oldcards");
const cardSlot = document.getElementById("newslot");
const $deck = document.getElementById("deck");
let library = { cards : []}
fetch('../tarot-images.json')
  .then((response) => response.json())
  .then((data) => library.cards = data.cards);

//////////////////////////////////////////
////////////////card draw logic//////////
////////////////////////////////////////

function drawCard() {
  if (!cardSlot.firstChild) {
    let choice = Math.floor(Math.random() * deck.cards.length);
    let rawCard = {
      suit: deck.cards[choice].suit,
      number: deck.cards[choice].value,
    };
    let chosenCard = {}
    for (let i of library.cards){
      if (i.suit === rawCard.suit && i.number === rawCard.number){
        chosenCard = i
      }
    }
    
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `<img src="../cards/${chosenCard.img}">`


    // if (rawCard.suit !== "Trump") {
    //   if (rawCard.number == 1) {
    //     newCard.innerHTML = `<p>Ace of ${rawCard.suit}</p>`;
    //   } else if (rawCard.number == 11) {
    //     newCard.innerHTML = `<p>Page of ${rawCard.suit}</p>`;
    //   } else if (rawCard.number == 12) {
    //     newCard.innerHTML = `<p>Knight of ${rawCard.suit}</p>`;
    //   } else if (rawCard.number == 13) {
    //     newCard.innerHTML = `<p>Queen of ${rawCard.suit}</p>`;
    //   } else if (rawCard.number == 14) {
    //     newCard.innerHTML = `<p>King of ${rawCard.suit}</p>`;
    //   } else {
    //     newCard.innerHTML = `<p>${rawCard.number} of ${rawCard.suit}</p>`;
    //   }
    // } else if (rawCard.suit == "Trump") {
    //   newCard.innerHTML = `<p>${rawCard.number} of ${rawCard.suit}</p>`;
    // }
    reading.push(rawCard);
    console.log(reading);

    deck.cards.splice(choice, 1);
    cardSlot.appendChild(newCard);
  } else {
    let oldCard = cardSlot.firstChild;
    if (!signifier.firstChild) {
      signifier.appendChild(oldCard);
    } else {
      oldCards.appendChild(oldCard);
    }
  }
  if (deck.cards.length === 0) {
    $deck.classList.remove("deck");
  }
}



$deck.onclick = drawCard;
save.addEventListener("click", function (e) {
  e.preventDefault();
  fetch("/diary", {
    method: "POST",
    body: JSON.stringify({
      cards: reading,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
});
