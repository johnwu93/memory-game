/* eslint-disable class-methods-use-this */
// @flow

import EventIncrementer from '../../src/scripts/models/eventincrementer';
import type { Runnable } from '../../src/scripts/models/eventincrementer';

class TwiceIncrementer extends EventIncrementer {
  // noinspection JSUnusedGlobalSymbols
  planIncrementEvent(incrementTask: Runnable): void {
    incrementTask();
    incrementTask();
  }
}


describe('test executor', () => {
  beforeAll(function setup() {
    this.incrementedValues = [];
    this.notify = function notify(value: number) {
      this.incrementedValues = this.incrementedValues.concat(value);
    };
    spyOn(this, 'notify').and.callThrough();
  });
  it('should call notifier twice', function testNotifyTwice() {
    const executor = new TwiceIncrementer(this.notify.bind(this));
    executor.setup();
    expect(this.notify.calls.count()).toEqual(2);
    expect(this.incrementedValues).toEqual([1, 2]);
  });
});
