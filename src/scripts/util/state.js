const STATE = Object.freeze({
  FACEDOWN: {value: 'FACEDOWN', css: 'mycard--face-down'},
  PICKED: {value: 'PICKED', css: 'mycard--picked'},
  MATCH: {value: 'MATCHED', css: 'mycard--match'},
  MISMATCH: {value: 'MATCHED', css: 'mycard--mismatch'}
});

const isStateEqual = function isState(thisState, thatState) {
  return thisState === thatState;
};


export { STATE, isStateEqual };
