// @flow

import Card from '../../src/scripts/models/card';
import { CARD_STATE } from '../../src/scripts/util/cardstate';
import Game from '../../src/scripts/models/game';
import Statistics from '../../src/scripts/models/statistics';
import assertNotify from './util';
import createGameEngine from '../../src/scripts/models/engine/gameenginefactory';
import TwiceIncrementer from './twiceincrementer';
import EventIncrementer from '../../src/scripts/models/incrementer/eventincrementer';


const TWICE_INCREMENTER = new TwiceIncrementer(() => {
});

const createGame = function createGame(
  cards: Array<Card>,
  incrementer: EventIncrementer = TWICE_INCREMENTER,
): Game {
  return new Game(
    cards,
    createGameEngine(cards),
    new Statistics(numMoves => (numMoves <= 0 ? 3 : 2)),
    incrementer,
  );
};

describe('Game Logic', () => {
  describe('determine if game is completed', () => {
    beforeEach(function setup() {
      const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', CARD_STATE.FACEDOWN);
      this.game = createGame([faceDownCard, currentlyPickedCard]);
      this.game.processInput(1);
    });

    it('should complete game based on matching all cards', function testWinNotification() {
      assertNotify.bind(this)((notifier) => {
        this.game.setWinNotification(notifier);
        this.game.processInput(0);
      });
    });
  });

  describe('statistics usage', () => {
    beforeEach(function setup() {
      this.faceDownCards = [new Card('foo', CARD_STATE.FACEDOWN), new Card('foo', CARD_STATE.FACEDOWN)];
      this.game = createGame(this.faceDownCards);
    });

    it('should compute number of moves correctly', function testNumMoves() {
      expect(this.game.statistics.moveCounter).toBe(0);
      this.game.processInput(0);
      expect(this.game.statistics.moveCounter).toBe(0);

      this.game.processInput(1);
      expect(this.game.statistics.moveCounter).toBe(1);
    });

    it('should compute ratings correctly', function testRating() {
      this.game.processInput(0);
      expect(this.game.statistics.computeRating()).toBe(3);

      this.game.processInput(1);
      expect(this.game.statistics.computeRating()).toBe(2);
    });

    it('should invoke rating notifier', function testRatingNotifier() {
      assertNotify.bind(this)((notifier) => {
        this.game.statistics.setRatingNotifier(notifier);
        this.game.processInput(0);
        this.game.processInput(1);
      });
    });
  });

  describe('timeIncrementer setup', () => {
    beforeEach(function setup() {
      this.faceDownCards = [new Card('foo', CARD_STATE.FACEDOWN), new Card('foo', CARD_STATE.FACEDOWN)];
    });

    it('should not start time if its not setup', function testSetupTimer() {
      assertNotify.bind(this)((notifier) => {
        createGame(this.faceDownCards, new TwiceIncrementer(notifier));
      }, 0);
    });

    it('should start time if game is first played', function testSetupTimer() {
      assertNotify.bind(this)((notifier) => {
        const game = createGame(this.faceDownCards, new TwiceIncrementer(notifier));
        game.processInput(0);
      }, 2);
    });
  });
});
