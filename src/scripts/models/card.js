export default class Card {
  constructor(image, state) {
    this.image = image;
    this.state = state;
  }

  setState(newState) {
    this.state = newState;
  }

  isMatchingCard(otherCard) {
    return this.image === otherCard.image;
  }

  toString() {
    return `{ image: ${this.image}, state: ${this.state}}`;
  }
}
