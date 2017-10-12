import $ from 'jquery';

export const STATE = {
  FACEDOWN: {value: 'FACEDOWN', css: 'mycard--face-down'},
  PICKED: {value: 'PICKED', css: 'mycard--picked'},
  MATCH: {value: 'MATCHED', css: 'mycard--match'},
  MISMATCH: {value: 'MATCHED', css: 'mycard--mismatch'}
};

const isStateEqual = function isState(thisState, thatState) {
  return thisState === thatState;
};


const END_ANIMATION_EVENTS = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

export class CardView {
  constructor(image, state) {
    this.image = image;
    this.state = state;
    this.cardSelector = $(this.render());
    // noinspection JSValidateTypes
    this.cardContent = $(this.cardSelector).children();
  }

  render() {
    return `
          <div class="mycard col-6 col-md-3 my-3">
            <div class="${this.state.css} animated mx-auto">
              <i class="fa ${this.image}"></i>
            </div>
          </div>
          `;
  }

  removeClasses() {
    const removeQuery = Object.entries(STATE)
      .filter(iterState => isStateEqual(iterState, this.state.css))
      .join(' '); // Todo find set difference method

    $(this.cardContent).removeClass(removeQuery);
  }

  addClasses(classAnimation) {
    $(this.cardContent).addClass(`${classAnimation} ${this.state.css}`);
  }

  bindFaceDownClick(chooseCallback) {
    $(this.cardSelector).on('click', `.${STATE.FACEDOWN.css}`, chooseCallback);
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

  setPicked() {
    this.animateFlip(STATE.PICKED);
  }

  // noinspection JSUnusedGlobalSymbols
  setFacedown() {
    this.animateFlip(STATE.FACEDOWN);
  }

  // noinspection JSUnusedGlobalSymbols
  setMatch() {
    this.removeClasses(); // these effects do happen, but it's very hard to see
    this.state = STATE.MATCH;
    this.addClasses('rubberBand');
    // this.cardContent.removeClasses('rubberBand');
  }

  setMismatch() {
    this.removeClasses();
    this.state = STATE.MISMATCH;
    this.addClasses('shake');
    // Put a handler to remove shake after the animation is done
  }
}
