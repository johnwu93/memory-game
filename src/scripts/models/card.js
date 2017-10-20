// @flow

import { type CardState } from '../util/cardstate';


export default class Card {
  image: string;
  state: CardState;
  stateChangeCallback: (CardState) => void;

  constructor(image: string, state: CardState) {
    this.image = image;
    this.state = state;
  }

  setState(newState: CardState) {
    this.state = newState;
    if (typeof this.stateChangeCallback !== 'undefined') {
      this.stateChangeCallback(newState);
    }
  }

  getState() {
    return this.state;
  }

  isMatchingCard(otherCard: Card) {
    return this.image === otherCard.image;
  }

  toString() {
    return `{ image: ${this.image}, state: ${this.state.toString()}}`;
  }

  // stateChangeCallback accepts one parameter, which is the change state
  bindChangeState(stateChangeCallback: (CardState) => void): void {
    this.stateChangeCallback = stateChangeCallback;
  }
}
