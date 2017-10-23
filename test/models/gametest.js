// @flow

import Card from '../../src/scripts/models/card';
import { CARD_STATE } from '../../src/scripts/util/cardstate';
import Game from '../../src/scripts/models/game';
import Statistics from '../../src/scripts/models/statistics';
import assertNotify from './util';
import createGameEngine from '../../src/scripts/models/engine/gameenginefactory';


const createGame = function createGame(cards: Array<Card>): Game {
  return new Game(
    cards,
    createGameEngine(cards),
    new Statistics(numMoves => (numMoves <= 1 ? 3 : 2)),
  );
};

describe('Game Logic', () => {
  describe('determine if game is completed', () => {
    let faceDownCard;
    let game;

    beforeEach(() => {
      faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', CARD_STATE.FACEDOWN);
      game = createGame([faceDownCard, currentlyPickedCard]);
      game.processInput(1);
    });

    it('should complete game based on matching all cards', () => {
      assertNotify((notifier) => {
        game.setWinNotification(notifier);
        game.processInput(0);
      });
    });
  });

  describe('statistics usage', () => {
    beforeEach(function setup() {
      this.faceDownCards = [new Card('foo', CARD_STATE.FACEDOWN), new Card('foo', CARD_STATE.FACEDOWN)];
      this.game = createGame(this.faceDownCards);
    });

    it('should compute number of moves correctly', function testNumMoves() {
      this.game.processInput(0);
      expect(this.game.statistics.moveCounter).toBe(1);

      this.game.processInput(1);
      expect(this.game.statistics.moveCounter).toBe(2);
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
      });
    });
  });
});
