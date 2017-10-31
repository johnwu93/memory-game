// @flow

import StatisticsView from '../views/statisticsview';
import Statistics from '../models/statistics';
import type { Rating } from '../models/ratingcomputer';
import TimeIncrementer from '../models/incrementer/timeincrementer';
import ModalView from '../views/modalview';

/**
 * Bind events for objects using Statistics and TimerIncrementer
 */
export default class StatisticsController {
  view: StatisticsView;
  model: Statistics;
  timeIncrementer: TimeIncrementer;
  modalView: ModalView;

  constructor(view: StatisticsView, model: Statistics) {
    this.view = view;
    this.model = model;
    this.timeIncrementer = new TimeIncrementer(this.updateTimer.bind(this));
    this.modalView = new ModalView();
  }

  setView() {
    this.timeIncrementer.setup();
    this.view.clear();
    this.view.initializeRendering(
      this.model.moveCounter,
      this.model.computeRating(),
      this.timeIncrementer.counter,
    );
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

  updateTimer(time: number) {
    this.view.updateTimer(time);
  }

  showWinModal() {
    this.timeIncrementer.terminateTimer();
    const rating = this.model.computeRating();
    const time = this.timeIncrementer.counter;
    const moves = this.model.moveCounter;
    this.modalView.show(rating, time, moves);
  }
}
