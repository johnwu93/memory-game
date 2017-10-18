// @flow
import type { Rating, RatingComputer } from './ratingcomputer';

export default class Statistics {
  moveCounter: number;
  ratingComputer: RatingComputer;
  counterNotifier: (number) => void;
  ratingNotifier: (number) => void;

  constructor(ratingComputer: RatingComputer) {
    this.moveCounter = 0;
    this.ratingComputer = ratingComputer;
  }

  incrementMoveCounter() {
    this.moveCounter += 1;
    if (typeof this.counterNotifier !== 'undefined') {
      this.counterNotifier(this.moveCounter);
    }
  }

  setCounterNotifier(counterNotifier: (number) => void) {
    this.counterNotifier = counterNotifier;
  }

  computeRating(): Rating {
    const rating = this.ratingComputer(this.moveCounter);
    if (typeof this.ratingNotifier !== 'undefined') {
      this.ratingNotifier(rating);
    }
    return rating;
  }

  setRatingNotifier(ratingNotifier: (number) => void) {
    this.ratingNotifier = ratingNotifier;
  }
}
