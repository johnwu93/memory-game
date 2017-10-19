// @flow

import { STATE } from '../../src/scripts/util/state';
import Card from '../../src/scripts/models/card';
import assertNotify from './util';

describe('Card', () => {
  beforeEach(function setup() {
    this.card = new Card('foo', STATE.FACEDOWN);
  });

  it('should invoke callback', function invokeCallback() {
    assertNotify(((notifier) => {
      this.card.bindChangeState(notifier);
      this.card.setState(STATE.MATCH);
    }));
  });
});
