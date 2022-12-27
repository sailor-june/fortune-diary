const MAJOR = ["Trump"]
const SUITS = ["Cups", "Wands","Pentacles","Swords"]
const MINVALUES = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"]
const MAJVALUES = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21"]

export default class Deck {
    constructor(cards = buildDeck()){
        this.cards=cards
    }
}

class Card {
    constructor(suit,value){
        this.suit = suit
        this.value = value
    }
}

function buildDeck(){
    let minorArcana = SUITS.flatMap(suit=>{
        return MINVALUES.map(value=>{
             return new Card(suit, value)
        })
    })
    
    let majorArcana = MAJOR.flatMap(suit=>{
        return MAJVALUES.map(value=>{
            return new Card(suit,value)
        })
    })
    let Deck = []
    for (let cards of minorArcana){
        Deck.push(cards)
    }
    for (let cards of majorArcana){
        Deck.push(cards)
    }
    return Deck
}

