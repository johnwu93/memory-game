// @flow

import { STATE } from '../../src/scripts/util/state';
import Card from '../../src/scripts/models/card';


describe('Card', () => {
  beforeEach(function setup() {
    this.mismatchState = STATE.MISMATCH;
    this.changeState = (newState) => {
      this.mismatchState = newState;
    };

    this.card = new Card('foo', STATE.FACEDOWN);
    // noinspection JSCheckFunctionSignatures
    spyOn(this, 'changeState').and.callThrough();
    this.card.bindChangeState(this.changeState);
  });

  it('should invoke callback', function invokeCallback() {
    this.card.setState(STATE.MATCH);
    expect(this.changeState.calls.count()).toEqual(1);
    expect(this.mismatchState).toBe(STATE.MATCH);
  });
});
