// @flow

import { type State } from '../util/state';


export default class Card {
  image: string;
  state: State;
  stateChangeCallback: (State) => void;

  constructor(image: string, state: State) {
    this.image = image;
    this.state = state;
  }

  setState(newState: State) {
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
  bindChangeState(stateChangeCallback: (State) => void): void {
    this.stateChangeCallback = stateChangeCallback;
  }
}
