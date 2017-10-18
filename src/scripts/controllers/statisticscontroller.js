// @flow

import StatisticsView from '../views/statisticsview';
import Statistics from '../models/statistics';
import type { Rating } from '../models/ratingcomputer';

export default class StatisticsController {
  view: StatisticsView;
  model: Statistics;

  constructor(view: StatisticsView, model: Statistics) {
    this.view = view;
    this.model = model;
  }

  setView() {
    this.view.initializeRendering(this.model.moveCounter, this.model.computeRating());
  }

  bindEvents() {
    this.model.setCounterNotifier(this.updateMovesCounter.bind(this));
    this.model.setRatingNotifier(this.updateRating.bind(this));
  }

  updateMovesCounter(numMoves: number) {
    this.view.updateMoves(numMoves);
  }

  updateRating(rating: Rating) {
    this.view.updateRating(rating);
  }
}
