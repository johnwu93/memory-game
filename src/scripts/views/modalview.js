// @flow
import $ from 'jquery';
import 'bootstrap';
import renderRating from './renderrating';

const template = `
  <div class="modal fade" id="winModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <section class="win__title">
            <div class="text-center">
              <h1 class="win__title__header">Congratulations!</h1>
              <h2>You Won!</h2>
            </div>
          </section>

          <section class="win__statistics">
            <div class="win__statistics__rating">
              Rating: <span class="win__statistics__rating--value"></span>
            </div>
            <div class="win__statistics__time">
              Time: <span class="win__statistics__time--value"></span>
            </div>
            <div class="win__statistics__moves">
              Moves: <span class="win__statistics__moves--value"></span>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;

export default class ModalView {
  modalSelector: JQuery;
  ratingSelector: JQuery;
  timeSelector: JQuery;
  numMovesSelector: JQuery;

  constructor() {
    this.modalSelector = $(template);
    this.ratingSelector = $(this.modalSelector).find('.win__statistics__rating--value');
    this.timeSelector = $(this.modalSelector).find('.win__statistics__time--value');
    this.numMovesSelector = $(this.modalSelector).find('.win__statistics__moves--value');
  }

  show(rating: number, time: number, numMoves: number) {
    $(this.modalSelector).on('show.bs.modal', () => {
      this.updateRating(rating);
      this.updateTime(time);
      this.updateNumMoves(numMoves);
    });
    // $FlowFixMe
    $(this.modalSelector).modal('show');
  }

  updateRating(rating: number) {
    $(this.ratingSelector).html(`<ul class="stars d-inline">${renderRating(rating)}</ul>`);
  }

  updateTime(time: number) {
    $(this.timeSelector).html(time.toString());
  }

  updateNumMoves(numMoves: number) {
    $(this.numMovesSelector).html(numMoves.toString());
  }
}
