// @flow
import type { Rating, RatingComputer } from './ratingcomputer';

/**
 * @description Holds information of the number of moves that have passed in the game and the rating
 * of the users performance. These factors send notifications whenever they are updated or called
 */
export default class Statistics {
  moveCounter: number;
  ratingComputer: RatingComputer;
  counterNotifier: (number) => void;
  ratingNotifier: (Rating) => void;

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

  setRatingNotifier(ratingNotifier: (Rating) => void) {
    this.ratingNotifier = ratingNotifier;
  }
}
