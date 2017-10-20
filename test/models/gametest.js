// @flow

import Card from '../../src/scripts/models/card';
import { CARD_STATE } from '../../src/scripts/util/cardstate';
import Game from '../../src/scripts/models/game';
import Statistics from '../../src/scripts/models/statistics';
import assertNotify from './util';


const assertStateEquals = function assertStateEquals(currentlyPickedCard, state) {
  expect(currentlyPickedCard.getState()).toBe(state);
};

const createGame = function createGame(cards: Array<Card>): Game {
  return new Game(cards, new Statistics(numMoves => (numMoves <= 1 ? 3 : 2)));
};

describe('Game Logic', () => {
  it('should turn a facedown card to a picked card if there are no cards currently picked', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const game = createGame([faceDownCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, CARD_STATE.PICKED);
  });

  it('should turn a facedown card to a matched card if the other currently picked card matches with the facedown card', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const currentlyPickedCard = new Card('foo', CARD_STATE.PICKED);
    const game = createGame([faceDownCard, currentlyPickedCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, CARD_STATE.MATCH);
    assertStateEquals(currentlyPickedCard, CARD_STATE.MATCH);
  });

  it('should turn a facedown card to a mismatched card if the other currently picked card does not match with the facedown card', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const currentlyPickedCard = new Card('bar', CARD_STATE.PICKED);
    const game = createGame([faceDownCard, currentlyPickedCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, CARD_STATE.MISMATCH);
    assertStateEquals(currentlyPickedCard, CARD_STATE.MISMATCH);
  });

  describe('turn mismatched cards into facedown cards', () => {
    beforeEach(function setUp() {
      this.faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    });

    const assertAllCardsState = function assertEveryCardState(cards, state) {
      cards.forEach((card) => {
        assertStateEquals(card, state);
      });
    };
    it('should flip two mismatched cards if a hidden card is picked', function testFacedown() {
      const wrongMatchCards = ['foo', 'bar'].map(image => new Card(image, CARD_STATE.MISMATCH));
      const game = createGame([this.faceDownCard, ...wrongMatchCards]);
      game.pickCard(this.faceDownCard);

      assertAllCardsState(wrongMatchCards, CARD_STATE.FACEDOWN);
    });


    it('should flip two mismatched cards when playing the game', function testFacedown() {
      const eventualWrongMatchCards = ['foo', 'bar'].map(image => new Card(image, CARD_STATE.FACEDOWN));
      const game = createGame([this.faceDownCard, ...eventualWrongMatchCards]);
      eventualWrongMatchCards.forEach(game.pickCard.bind(game));
      game.pickCard(this.faceDownCard);

      assertAllCardsState(eventualWrongMatchCards, CARD_STATE.FACEDOWN);
    });
  });

  describe('determine if game is completed', () => {
    let faceDownCard;
    let game;

    beforeEach(() => {
      faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', CARD_STATE.FACEDOWN);
      game = createGame([faceDownCard, currentlyPickedCard]);
      game.pickCard(currentlyPickedCard);
    });

    it('should complete game based on matching all cards', () => {
      assertNotify((notifier) => {
        game.setWinNotification(notifier);
        game.processInput(0);
        expect(game.isWin()).toBe(true);
      });
    });

    it('should continue game', () => {
      expect(game.isWin()).toBe(false);
    });
  });

  describe('statistics usage', () => {
    beforeEach(function setup() {
      this.faceDownCards = [new Card('foo', CARD_STATE.FACEDOWN), new Card('foo', CARD_STATE.FACEDOWN)];
      this.statistics = new Statistics(numMoves => (numMoves <= 1 ? 3 : 2));
      this.game = new Game(
        this.faceDownCards,
        this.statistics,
      );
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
  });
});
