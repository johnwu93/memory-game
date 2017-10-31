/* eslint-disable class-methods-use-this */
// @flow

import assertNotify from './util';
import TwiceIncrementer from './twiceincrementer';


describe('test executor', () => {
  it('should call notifier twice', () => {
    assertNotify((notifier) => {
      const executor = new TwiceIncrementer(notifier);
      executor.setup();
    }, 2);
  });
});
