// @flow

import $ from 'jquery';


const template = `
  <section class="score-panel">
    <ul class="stars">
    </ul>

    Moves: <span class="moves"></span>
    
    Time: <span class="timer"></span>

    <div class="restart">
      <i class="fa fa-repeat"></i>
    </div>
  </section>
    `;

export default class StatisticsView {
  statsSelector: JQuery;
  ratingSelector: JQuery;
  moveSelector: JQuery;
  timerSelector: JQuery;

  constructor() {
    this.statsSelector = $(template);
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
    const ratingMarkDown = Array
      .from({length: newRating}, () => '<li><i class="fa fa-star"></i></li>')
      .join('\n');
    $(this.ratingSelector).html(ratingMarkDown);
  }

  updateMoves(newMoves: number) {
    $(this.moveSelector).html(newMoves.toString());
  }

  updateTimer(time: number) {
    $(this.timerSelector).html(time.toString());
  }
}