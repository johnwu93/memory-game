// @flow

export class CardState {
  value: string;
  css: string;

  constructor(value: string, css: string) {
    this.value = value;
    this.css = css;
  }

  isStateEqual(thatState: CardState) {
    return this.value === thatState.value && this.css === thatState.css;
  }
}

const FACEDOWN = new CardState('FACEDOWN', 'mycard--face-down');
const PICKED = new CardState('PICKED', 'mycard--picked');
const MATCH = new CardState('MATCHED', 'mycard--match');
const MISMATCH = new CardState('MATCHED', 'mycard--mismatch');

const CARD_STATE = Object.freeze({
  FACEDOWN,
  PICKED,
  MATCH,
  MISMATCH,
});


export { CARD_STATE };
