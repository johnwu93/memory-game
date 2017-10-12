import STATE from './State';


export default class Game {
  constructor(cardsInput) {
    this.cards = cardsInput;
    this.currentlyPickedCards = [];
    this.numMatches = 0;
    // Todo add functionality to show mismatched states
  }

  processInput(index) {
    this.pickCard(this.cards[index]);
    if (this.isWin()) {
      // Todo display win modal
    }
  }

  pickCard(card) {
    if (card.state === STATE.FACEDOWN) {
      this.computeFaceUpState(card);
    } else {
      throw new Error(`Unable to pick card ${card.toString()}. It's already face up.`);
    }
  }

  computeFaceUpState(card) {
    if (this.currentlyPickedCards.length === 0) {
      card.setState(STATE.PICKED);
      this.currentlyPickedCards = [card];
    } else if (this.currentlyPickedCards.length === 1) {
      this.computeMatchCard(card, this.currentlyPickedCards[0]);
    } else {
      throw new RangeError('Illegal amount of picked states');
    }
  }

  computeMatchCard(thisCard, thatCard) {
    if (thisCard.isMatchingCard(thatCard)) {
      thisCard.setState(STATE.MISMATCH);
      thatCard.setState(STATE.MISMATCH);
      this.currentlyPickedCards = [];
    } else {
      thisCard.setState(STATE.MATCH);
      thatCard.setState(STATE.MATCH);
      this.currentlyPickedCards = [];
      this.numMatches += 1;
    }
  }

  isWin() {
    return this.numMatches * 2 === this.currentlyPickedCards.length;
  }
}