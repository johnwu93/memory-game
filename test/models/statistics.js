// @flow

import Statistics from '../../src/scripts/models/statistics';

describe('statistics', () => {
  beforeEach(function setup() {
    this.statistics = new Statistics(moves => (moves <= 1 ? 3 : 2));
  });

  it('should invoke counter notifier', function testCounterNotifier() {
    let counterClone = this.statistics.moveCounter;
    this.statistics.setCounterNotifier((newCount) => {
      counterClone = newCount;
    });
    this.statistics.incrementMoveCounter();
    expect(counterClone).toBe(this.statistics.moveCounter);
  });

  it('should invoke rating notifier', function testRatingNotifier() {
    let ratingClone = this.statistics.computeRating();
    this.statistics.setRatingNotifier((newRating) => {
      ratingClone = newRating;
    });
    this.statistics.computeRating();
    expect(ratingClone).toBe(this.statistics.computeRating());
  });
});
