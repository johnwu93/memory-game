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

const FACEDOWN = new CardState('FACEDOWN', 'card--face-down');
const PICKED = new CardState('PICKED', 'card--picked');
const MATCH = new CardState('MATCHED', 'card--match');
const MISMATCH = new CardState('MATCHED', 'card--mismatch');
type CardMap = { [key: string]: CardState };
const CARD_STATE: CardMap = Object.freeze({
  FACEDOWN,
  PICKED,
  MATCH,
  MISMATCH,
});


export { CARD_STATE };
