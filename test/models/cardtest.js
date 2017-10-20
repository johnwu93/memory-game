// @flow

import { CARD_STATE } from '../../src/scripts/util/cardstate';
import Card from '../../src/scripts/models/card';
import assertNotify from './util';

describe('Card', () => {
  beforeEach(function setup() {
    this.card = new Card('foo', CARD_STATE.FACEDOWN);
  });

  it('should invoke callback', function invokeCallback() {
    assertNotify(((notifier) => {
      this.card.bindChangeState(notifier);
      this.card.setState(CARD_STATE.MATCH);
    }));
  });
});
