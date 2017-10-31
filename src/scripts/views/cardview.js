// @flow

import $ from 'jquery';
import { CARD_STATE, CardState } from '../util/cardstate';

const END_ANIMATION_EVENTS = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const MATCH_ANIMATION = 'rubberBand';
const MISMATCH_ANIMATION = 'shake';
const FLIP_IN_ANIMATION = 'flipInY';

const getStatesCSS = function getStatesCSS(): string {
  const states: Array<CardState> = (Object.values(CARD_STATE): any);
  return states
    .map(iterState => iterState.css)
    .join(' ');
};

/**
 * @description - renders the view for cards in the game, particularly the transitions from one
 * state to another
 */
export default class CardView {
  image: string;
  id: number;
  cardSelector: JQuery;
  cardContent: JQuery;

  constructor(image: string, id: number) {
    this.image = image;
    this.id = id;
    this.cardSelector = $(this.render());
    // noinspection JSValidateTypes
    this.cardContent = $(this.cardSelector).find('.card__display');
  }

  render() {
    return `
          <section id="${this.id}" class="col-6 col-md-3 my-3">
            <div class="card__display animated mx-auto">
              <i class="fa ${this.image}"></i>
            </div>
          </section>
          `;
  }

  /**
   * @description sends a notification whenever a card is clicked
   */
  bindFaceDownClick(chooseCallback: (number) => void) {
    $(this.cardSelector).on('click', `.${CARD_STATE.FACEDOWN.css}`, () => chooseCallback(this.id));
  }

  /**
   * @description Rendering for card transitions is done using animate.css. When you add a class
   * from animate.css, an animation will render for x seconds. Therefore, the animations are first
   * done adding the new state of the class and the animation corresponding to the state.
   * After the animation is finished, the animation is removed any other state that is attached to
   * the class
   */
  renderAnimationTransition(animationEffect: string, newState: CardState) {
    this.addClassAnimation(animationEffect, newState)
      .one(END_ANIMATION_EVENTS, () => this.removeClassAnimation(animationEffect, newState));
  }

  animateFlip(newState: CardState) {
    $(this.cardContent).removeClass(getStatesCSS()); // remove old states
    this.renderAnimationTransition(FLIP_IN_ANIMATION, newState);
  }

  setPicked() {
    this.animateFlip(CARD_STATE.PICKED);
  }

  setFacedown() {
    this.animateFlip(CARD_STATE.FACEDOWN);
  }

  setMatch() {
    this.renderAnimationTransition(MATCH_ANIMATION, CARD_STATE.MATCH);
  }

  setMismatch() {
    this.renderAnimationTransition(MISMATCH_ANIMATION, CARD_STATE.MISMATCH);
  }

  addClassAnimation(animationEffect: string, newState: CardState) {
    return $(this.cardContent).stop(true, true)
      .addClass(`${animationEffect} ${newState.css}`);
  }

  removeClassAnimation(animationEffect: string, excludeState: CardState) {
    const removeQuery = getStatesCSS();
    $(this.cardContent).removeClass(`${removeQuery} ${animationEffect}`);
    $(this.cardContent).addClass(excludeState.css);
  }
}
