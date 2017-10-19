/* eslint-disable class-methods-use-this */
// @flow

import EventIncrementer from './eventincrementer';
import type { Runnable } from './eventincrementer';

export default class TimeIncrementer extends EventIncrementer {
  // noinspection JSUnusedGlobalSymbols
  planIncrementEvent(incrementTask: Runnable): void {
    setInterval(() => {
      incrementTask();
    }, 1000);
  }
}
