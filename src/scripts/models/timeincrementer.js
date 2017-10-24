/* eslint-disable class-methods-use-this */
// @flow

import type { Runnable } from './eventincrementer';
import EventIncrementer from './eventincrementer';

const myTimerID = new WeakMap();

/**
 * @description Increments a counter using a timer
 */
export default class TimeIncrementer extends EventIncrementer {
  terminateTimer() {
    clearInterval(myTimerID.get(this));
  }

  // noinspection JSUnusedGlobalSymbols
  planIncrementEvent(incrementTask: Runnable): void {
    const id = setInterval(() => {
      incrementTask();
    }, 1000);

    myTimerID.set(this, id);
  }
}
