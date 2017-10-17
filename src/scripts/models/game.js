// @flow
import { STATE, isStateEqual } from '../util/state';
import Card from './card';


export default class Game {
  cards: Array<Card>;
  currentlyPickedCards: Array<Card>;
  mismatchedCards: Array<Card>;
  numMatches: number;

  constructor(cardsInput: Array<Card>) {
    this.cards = cardsInput;
    this.currentlyPickedCards = cardsInput.filter(card => (
      isStateEqual(card.getState(), STATE.PICKED)
    ));
    this.mismatchedCards = cardsInput.filter(card => (
      isStateEqual(card.getState(), STATE.MISMATCH)
    ));
    this.numMatches = 0;
  }

  processInput(index: number) {
    this.pickCard(this.cards[index]);
    if (this.isWin()) {
      // Todo display win modal
    }
  }

  pickCard(card: Card) {
    if (isStateEqual(card.getState(), STATE.FACEDOWN)) {
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
      this.numMatches += 1;
    } else {
      thisCard.setState(STATE.MISMATCH);
      thatCard.setState(STATE.MISMATCH);
      this.mismatchedCards = [thisCard, thatCard];
      this.currentlyPickedCards = [];
    }
  }

  isWin() {
    return this.numMatches * 2 === this.cards.length;
  }
}
