// @flow
import { STATE } from '../util/state';
import Card from './card';
import Statistics from './statistics';


export default class Game {
  cards: Array<Card>;
  currentlyPickedCards: Array<Card>;
  mismatchedCards: Array<Card>;
  matchedCards: Array<Card>;
  statistics: Statistics;
  notifyWin: () => void;

  constructor(cardsInput: Array<Card>, statistics: Statistics) {
    this.cards = cardsInput;
    this.statistics = statistics;
    this.currentlyPickedCards = cardsInput.filter(card => (
      card.getState().isStateEqual(STATE.PICKED)
    ));
    this.mismatchedCards = cardsInput.filter(card => (
      card.getState().isStateEqual(STATE.MISMATCH)
    ));

    this.matchedCards = cardsInput.filter(card => (
      card.getState().isStateEqual(STATE.MATCH)
    ));
  }

  setNotify(notifyWin: () => void) {
    this.notifyWin = notifyWin;
  }

  processInput(index: number) {
    this.pickCard(this.cards[index]);
    this.statistics.incrementMoveCounter();
    if (this.isWin()) {
      if (typeof this.notifyWin !== 'undefined') {
        this.notifyWin();
      }
    }
  }

  pickCard(card: Card) {
    if (card.getState().isStateEqual(STATE.FACEDOWN)) {
      this.computeFaceUpState(card);
    } else {
      throw new Error(`Unable to pick card ${card.toString()}. It's already face up.`);
    }
  }

  computeFaceUpState(card: Card) {
    if (this.currentlyPickedCards.length === 0) {
      if (this.mismatchedCards.length === 2) {
        this.hideMismatchedCards();
      }
      card.setState(STATE.PICKED);
      this.currentlyPickedCards = [card];
    } else if (this.currentlyPickedCards.length === 1) {
      this.computeMatchCards(card, this.currentlyPickedCards[0]);
    } else {
      throw new RangeError('Illegal amount of picked states');
    }
  }

  hideMismatchedCards() {
    this.mismatchedCards.forEach(mismatchedCard => mismatchedCard.setState(STATE.FACEDOWN));
    this.mismatchedCards = [];
  }

  computeMatchCards(thisCard: Card, thatCard: Card) {
    if (thisCard.isMatchingCard(thatCard)) {
      thisCard.setState(STATE.MATCH);
      thatCard.setState(STATE.MATCH);
      this.currentlyPickedCards = [];
      this.matchedCards = this.matchedCards.concat(thisCard, thatCard);
    } else {
      thisCard.setState(STATE.MISMATCH);
      thatCard.setState(STATE.MISMATCH);
      this.mismatchedCards = [thisCard, thatCard];
      this.currentlyPickedCards = [];
    }
  }

  isWin() {
    return this.matchedCards.length === this.cards.length;
  }
}
