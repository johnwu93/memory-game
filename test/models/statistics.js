// @flow

import Statistics from '../../src/scripts/models/statistics';
import assertNotify from './util';

describe('statistics notifiers', () => {
  beforeEach(function setup() {
    this.statistics = new Statistics(moves => (moves <= 1 ? 3 : 2));
  });

  it('should invoke counter notifier', function testCounterNotifier() {
    assertNotify.bind(this)((notifier) => {
      this.statistics.setCounterNotifier(notifier);
      this.statistics.incrementMoveCounter();
    });
  });

  it('should invoke rating notifier', function testRatingNotifier() {
    assertNotify.bind(this)((notifier) => {
      this.statistics.setRatingNotifier(notifier);
      this.statistics.computeRating();
    });
  });
});
