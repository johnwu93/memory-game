// @flow

export class State {
  value: string;
  css: string;

  constructor(value: string, css: string) {
    this.value = value;
    this.css = css;
  }

  isStateEqual(thatState: State) {
    return this.value === thatState.value && this.css === thatState.css;
  }
}

const FACEDOWN = new State('FACEDOWN', 'mycard--face-down');
const PICKED = new State('PICKED', 'mycard--picked');
const MATCH = new State('MATCHED', 'mycard--match');
const MISMATCH = new State('MATCHED', 'mycard--mismatch');

const STATE = Object.freeze({
  FACEDOWN,
  PICKED,
  MATCH,
  MISMATCH,
});


export { STATE };
