// @flow
import type { RatingComputer } from './starcomputationutil';

export default class Statistics {
  moveCounter: number;
  ratingComputer: RatingComputer;
  numCards: number;

  constructor(ratingComputer: RatingComputer, numCards: number) {
    this.moveCounter = 0;
    this.ratingComputer = ratingComputer;
    this.numCards = numCards;
  }

  incrementMoveCounter() {
    this.moveCounter += 1;
  }

  getNumberMoves() {
    return this.moveCounter;
  }

  computeStarRating(): 1 | 2 | 3 {
    return this.ratingComputer(this.moveCounter, this.numCards);
  }
}
