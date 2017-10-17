// @flow

const FACEDOWN = {value: 'FACEDOWN', css: 'mycard--face-down'};
const PICKED = {value: 'PICKED', css: 'mycard--picked'};
const MATCH = {value: 'MATCHED', css: 'mycard--match'};
const MISMATCH = {value: 'MATCHED', css: 'mycard--mismatch'};

export type State = typeof FACEDOWN | typeof PICKED | typeof MATCH | typeof MISMATCH;
const STATE = Object.freeze({
  FACEDOWN,
  PICKED,
  MATCH,
  MISMATCH,
});

const isStateEqual = function isState(thisState: State, thatState: State) {
  return thisState === thatState;
};


export { STATE, isStateEqual };
