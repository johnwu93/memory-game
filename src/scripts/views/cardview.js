import $ from 'jquery';
import { STATE, isStateEqual } from '../util/state';


const END_ANIMATION_EVENTS = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const MATCH_ANIMATION = 'rubberBand';
const MISMATCH_ANIMATION = 'shake';

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
            <div class="${this.state.css} animated mx-auto">
              <i class="fa ${this.image}"></i>
            </div>
          </div>
          `;
  }

  removeClasses() {
    const removeQuery = Object.values(STATE)
      .filter(iterState => !isStateEqual(iterState, this.state))
      .map(iterState => iterState.css)
      .join(' ');

    $(this.cardContent).removeClass(removeQuery);
  }

  addClasses(classAnimation) {
    $(this.cardContent).addClass(`${classAnimation} ${this.state.css}`);
  }

  // callback is a function that accepts an id value as input
  bindFaceDownClick(chooseCallback) {
    $(this.cardSelector).on('click', `.${STATE.FACEDOWN.css}`,
      () => chooseCallback(this.id)
    );
  }

  animateFlip(newState) {
    this.cardContent.addClass('flipOutY');
    this.cardContent.one(END_ANIMATION_EVENTS, () => {
      this.cardContent
        .removeClass(`${this.state.css} flipOutY`);
      this.state = newState;
      this.cardContent.addClass(`flipInY ${newState.css}`)
        .one(END_ANIMATION_EVENTS, () => {
          this.cardContent.removeClass('flipInY');
        });
    });
  }

  renderAnimationTransition(animationEffect) {
    this.addClasses(animationEffect);
    this.cardContent.removeClass(animationEffect);
  }

  setPicked() {
    this.animateFlip(STATE.PICKED);
  }

  setFacedown() {
    this.animateFlip(STATE.FACEDOWN);
  }

  setMatch() {
    this.state = STATE.MATCH;
    this.removeClasses();
    this.renderAnimationTransition(MATCH_ANIMATION);
  }

  setMismatch() {
    this.state = STATE.MISMATCH;
    this.removeClasses();
    this.renderAnimationTransition(MISMATCH_ANIMATION);
  }
}
