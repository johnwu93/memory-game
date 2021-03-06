// @flow
import $ from 'jquery';
import 'bootstrap';
import renderRating from './renderrating';

const template = `
  <aside class="modal fade" id="winModal" tabindex="-1" role="dialog" aria-hidden="true">
    <section class="modal-dialog" role="document">
      <div class="modal-content">
        <header class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close selectable-hover" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <article class="modal-body">
          <section class="win__title text-center">
            <h1 class="win__title__header">Congratulations!</h1>
            <h2>You Won!</h2>
          </section>

          <section class="win__statistics">
            <p class="win__statistics__rating my-0">
              Rating: <span class="win__statistics__rating--value"></span>
            </p>
            <p class="win__statistics__moves my-0">
              Moves: <span class="win__statistics__moves--value"></span>
            </p>
            <p class="win__statistics__time my-0">
              Time: <span class="win__statistics__time--value"></span>
            </p>
          </section>
                    
          <section class="win__play-again text-center">
            <button type="button" class="btn btn-success win__play-again__button selectable-hover" data-dismiss="modal">Play Again?</button>
          </section>
        </article>
        <footer class="modal-footer">
          <button type="button" class="btn btn-secondary selectable-hover" data-dismiss="modal">Close</button>
        </footer>
      </div>
    </section>
  </aside>
`;

/**
 * @description Constructs the view of the modal and renders their properties. These properties are
 * from TimerIncrement and Statistics from the model
 */
export default class ModalView {
  modalSelector: JQuery;
  ratingSelector: JQuery;
  timeSelector: JQuery;
  numMovesSelector: JQuery;
  resetButton: JQuery;

  constructor() {
    this.modalSelector = $(template);
    this.ratingSelector = $(this.modalSelector).find('.win__statistics__rating--value');
    this.timeSelector = $(this.modalSelector).find('.win__statistics__time--value');
    this.numMovesSelector = $(this.modalSelector).find('.win__statistics__moves--value');
    this.resetButton = $(this.modalSelector).find('.win__play-again__button');
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

  bindResetEvent(gameRestarter: () => void) {
    $(this.resetButton).click(gameRestarter);
  }
}
