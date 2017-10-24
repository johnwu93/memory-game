// @flow

import $ from 'jquery';
import { CARD_STATE, CardState } from '../util/cardstate';

const END_ANIMATION_EVENTS = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const MATCH_ANIMATION = 'rubberBand';
const MISMATCH_ANIMATION = 'shake';
const FLIP_IN_ANIMATION = 'flipInY';

export default class CardView {
  image: string;
  state: CardState;
  id: number;
  cardSelector: JQuery;
  cardContent: JQuery;

  constructor(image: string, state: CardState, id: number) {
    this.image = image;
    this.state = state;
    this.id = id;
    this.cardSelector = $(this.render());
    // noinspection JSValidateTypes
    this.cardContent = $(this.cardSelector).children();
  }

  render() {
    return `
          <section id="${this.id}" class="col-6 col-md-3 my-3">
            <div class="card__display animated ${this.state.css} mx-auto">
              <i class="fa ${this.image}"></i>
            </div>
          </section>
          `;
  }

  // callback is a function that accepts an id value as input
  bindFaceDownClick(chooseCallback: (number) => void) {
    $(this.cardSelector).on('click', `.${CARD_STATE.FACEDOWN.css}`, () => chooseCallback(this.id));
  }

  renderAnimationTransition(animationEffect: string) {
    this.addClassAnimation(animationEffect, this.removeClassAnimation.bind(this));
  }

  animateFlip(newState: CardState) {
    // todo fix bug when a bug when a card
    // is being flipped,
    // the animation does not appear changin to mismatched
    $(this.cardContent).removeClass(`${this.state.css}`);
    this.state = newState;
    this.renderAnimationTransition(FLIP_IN_ANIMATION);
  }

  setPicked() {
    this.animateFlip(CARD_STATE.PICKED);
  }

  setFacedown() {
    this.animateFlip(CARD_STATE.FACEDOWN);
  }

  setMatch() {
    this.state = CARD_STATE.MATCH;
    this.renderAnimationTransition(MATCH_ANIMATION);
  }

  setMismatch() {
    this.state = CARD_STATE.MISMATCH;
    this.renderAnimationTransition(MISMATCH_ANIMATION);
  }

  addClassAnimation(animationEffect: string, followupAnimationCallback: (string) => void) {
    $(this.cardContent).addClass(`${animationEffect} ${this.state.css}`)
      .one(END_ANIMATION_EVENTS, () => followupAnimationCallback(animationEffect));
  }

  removeClassAnimation(animationEffect: string) {
    const states: Array<CardState> = (Object.values(CARD_STATE): any);
    const removeQuery = states
      .filter(iterState => !iterState.isStateEqual(this.state))
      .map(iterState => iterState.css)
      .join(' ');

    $(this.cardContent).removeClass(`${removeQuery} ${animationEffect}`);
  }
}
