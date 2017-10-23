// @flow

import $ from 'jquery';
import renderRating from './renderrating';


const TEMPLATE = `
  <div class="container mb-2">
    <section class="restart d-inline mx-2">
        <i class="fa fa-repeat"></i>
    </section>
    <ul class="stars d-inline"></ul>
    
    <section class="mx-2">
      <p class="pr-2 d-inline">
        Moves: <span class="moves"></span>
      </p>
      <p class="d-inline">
        Time: <span class="timer"></span>
      </p>
    </section>
  </div>
    `;

export default class StatisticsView {
  statsSelector: JQuery;
  ratingSelector: JQuery;
  moveSelector: JQuery;
  timerSelector: JQuery;
  restartSelector: JQuery;
  statisticsSelector: JQuery;

  constructor() {
    this.statsSelector = $(TEMPLATE);
    this.ratingSelector = $(this.statsSelector).find('.stars');
    this.moveSelector = $(this.statsSelector).find('.moves');
    this.timerSelector = $(this.statsSelector).find('.timer');
    this.restartSelector = $(this.statsSelector).find('.restart');
    this.statisticsSelector = $('.statistics');
  }

  initializeRendering(numberMoves: number, rating: number, time: number) {
    this.updateMoves(numberMoves);
    this.updateRating(rating);
    this.updateTimer(time);
    this.statisticsSelector.empty();
    this.statisticsSelector.append(this.statsSelector);
  }

  clear() {
    this.statisticsSelector.empty();
  }

  updateRating(newRating: number) {
    const ratingMarkDown = renderRating(newRating);
    $(this.ratingSelector).html(ratingMarkDown);
  }

  updateMoves(newMoves: number) {
    $(this.moveSelector).html(newMoves.toString());
  }

  updateTimer(time: number) {
    $(this.timerSelector).html(time.toString());
  }

  bindRestartClick(gameRestarter: () => void) {
    $(this.restartSelector).click(gameRestarter);
  }
}
