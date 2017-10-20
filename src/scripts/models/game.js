// @flow
import { CARD_STATE } from '../util/cardstate';
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
      card.getState().isStateEqual(CARD_STATE.PICKED)
    ));
    this.mismatchedCards = cardsInput.filter(card => (
      card.getState().isStateEqual(CARD_STATE.MISMATCH)
    ));

    this.matchedCards = cardsInput.filter(card => (
      card.getState().isStateEqual(CARD_STATE.MATCH)
    ));
  }

  setWinNotification(notifyWin: () => void) {
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
    if (card.getState().isStateEqual(CARD_STATE.FACEDOWN)) {
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
      card.setState(CARD_STATE.PICKED);
      this.currentlyPickedCards = [card];
    } else if (this.currentlyPickedCards.length === 1) {
      this.computeMatchCards(card, this.currentlyPickedCards[0]);
    } else {
      throw new RangeError('Illegal amount of picked states');
    }
  }

  hideMismatchedCards() {
    this.mismatchedCards.forEach(mismatchedCard => mismatchedCard.setState(CARD_STATE.FACEDOWN));
    this.mismatchedCards = [];
  }

  computeMatchCards(thisCard: Card, thatCard: Card) {
    if (thisCard.isMatchingCard(thatCard)) {
      thisCard.setState(CARD_STATE.MATCH);
      thatCard.setState(CARD_STATE.MATCH);
      this.currentlyPickedCards = [];
      this.matchedCards = this.matchedCards.concat(thisCard, thatCard);
    } else {
      thisCard.setState(CARD_STATE.MISMATCH);
      thatCard.setState(CARD_STATE.MISMATCH);
      this.mismatchedCards = [thisCard, thatCard];
      this.currentlyPickedCards = [];
    }
  }

  isWin() {
    return this.matchedCards.length === this.cards.length;
  }
}
