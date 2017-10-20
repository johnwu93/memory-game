// @flow


import TimeIncrementer from '../../src/scripts/models/timeincrementer';

describe('Time Incrementer', () => {
  it('should have timer start and end', () => {
    const timeIncrementer = new TimeIncrementer(() => {
    });
    spyOn(window, 'setInterval').and.callThrough();
    spyOn(window, 'clearInterval').and.callThrough();
    timeIncrementer.setup();
    timeIncrementer.terminateTimer();
    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });
});
