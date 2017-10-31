/* eslint-disable class-methods-use-this */
// @flow

import type { Runnable } from '../../src/scripts/models/incrementer/eventincrementer';
import EventIncrementer from '../../src/scripts/models/incrementer/eventincrementer';


export default class TwiceIncrementer extends EventIncrementer {
  // noinspection JSUnusedGlobalSymbols
  planIncrementEvent(incrementTask: Runnable): void {
    incrementTask();
    incrementTask();
  }
}
