export default class Card {
  constructor(image, state) {
    this.image = image;
    this.state = state;
  }

  setState(newState) {
    this.state = newState;
    if (typeof this.stateChangeCallback !== 'undefined') {
      this.stateChangeCallback(newState);
    }
  }

  getState() {
    return this.state;
  }

  isMatchingCard(otherCard) {
    return this.image === otherCard.image;
  }

  toString() {
    return `{ image: ${this.image}, state: ${this.state}}`;
  }

  // stateChangeCallback accepts one parameter, which is the change state
  bindChangeState(stateChangeCallback) {
    this.stateChangeCallback = stateChangeCallback;
  }
}
