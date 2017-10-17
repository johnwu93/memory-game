import $ from 'jquery';
import { STATE } from '../util/state';

const END_ANIMATION_EVENTS = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const MATCH_ANIMATION = 'animated rubberBand';
const MISMATCH_ANIMATION = 'animated shake';
const FLIP_IN_ANIMATION = 'animated flipOutY';
const FLIP_OUT_ANIMATION = 'animated flipInY';

export default class CardView {
  constructor(image, state, id) {
    this.image = image;
    this.state = state;
    this.id = id;
    this.cardSelector = $(this.render());
    // noinspection JSValidateTypes
    this.cardContent = $(this.cardSelector).children();
  }

  render() {
    return `
          <div id="${this.id}" class="mycard col-6 col-md-3 my-3">
            <div class="${this.state.css} mx-auto">
              <i class="fa ${this.image}"></i>
            </div>
          </div>
          `;
  }

  // callback is a function that accepts an id value as input
  bindFaceDownClick(chooseCallback) {
    $(this.cardSelector).on('click', `.${STATE.FACEDOWN.css}`, () => chooseCallback(this.id));
  }

  renderAnimationTransition(animationEffectString) {
    this.addClassAnimation(animationEffectString, this.removeClassAnimation.bind(this));
  }

  animateFlip(newState) {
    // todo fix bug when a bug when a card
    // is being flipped,
    // the animation does not appear changin to mismatched
    const cardView = this;
    this.addClassAnimation(FLIP_IN_ANIMATION, () => {
      $(cardView.cardContent)
        .removeClass(`${cardView.state.css} ${FLIP_IN_ANIMATION}`);
      cardView.state = newState;
      cardView.renderAnimationTransition(FLIP_OUT_ANIMATION);
    });
  }

  setPicked() {
    this.animateFlip(STATE.PICKED);
  }

  setFacedown() {
    this.animateFlip(STATE.FACEDOWN);
  }

  setMatch() {
    this.state = STATE.MATCH;
    this.renderAnimationTransition(MATCH_ANIMATION);
  }

  setMismatch() {
    this.state = STATE.MISMATCH;
    this.renderAnimationTransition(MISMATCH_ANIMATION);
  }

  addClassAnimation(animationEffect, followupAnimationCallback) {
    $(this.cardContent).addClass(`${animationEffect} ${this.state.css}`)
      .one(END_ANIMATION_EVENTS, () => followupAnimationCallback(animationEffect));
  }

  removeClassAnimation(animationEffect) {
    const removeQuery = Object.values(STATE)
      .filter(iterState => !iterState.isStateEqual(this.state))
      .map(iterState => iterState.css)
      .join(' ');

    $(this.cardContent).removeClass(`${removeQuery} ${animationEffect}`);
  }
}
