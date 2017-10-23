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

  constructor() {
    this.statsSelector = $(TEMPLATE);
    this.ratingSelector = $(this.statsSelector).find('.stars');
    this.moveSelector = $(this.statsSelector).find('.moves');
    this.timerSelector = $(this.statsSelector).find('.timer');
  }

  initializeRendering(numberMoves: number, rating: number, time: number) {
    this.updateMoves(numberMoves);
    this.updateRating(rating);
    this.updateTimer(time);
    $('.statistics').append(this.statsSelector);
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
}
