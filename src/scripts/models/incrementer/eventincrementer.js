// @flow
export type Runnable = () => void;

/**
 * @description Increments a counter based on a scheduled event. This enable objects that are not
 * within the model component to control a counter, such as a timer. Clients must implement their
 * own implementation of planIncrementEvent to use this class
 * @abstract
 */
export default class EventIncrementer {
  counter: number;
  notify: (number) => void;
  +planIncrementEvent: (Runnable) => void;

  constructor(notify: (number) => void) {
    this.counter = 0;
    this.notify = notify;
  }

  setup() {
    this.planIncrementEvent(() => this.notify(this.incrementCounter()));
  }

  incrementCounter(): number {
    this.counter += 1;
    return this.counter;
  }
}
