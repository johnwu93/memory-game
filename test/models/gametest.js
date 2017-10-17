// @flow

import Card from '../../src/scripts/models/card';
import { STATE } from '../../src/scripts/util/state';
import Game from '../../src/scripts/models/game';


const assertStateEquals = function assertStateEquals(currentlyPickedCard, state) {
  expect(currentlyPickedCard.getState()).toBe(state);
};

const createGame = function createGame(cards: Array<Card>): Game {
  return new Game(cards, () => 1);
};

describe('Game Logic', () => {
  it('should turn a facedown card to a picked card if there are no cards currently picked', () => {
    const faceDownCard = new Card('foo', STATE.FACEDOWN);
    const game = createGame([faceDownCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, STATE.PICKED);
  });

  it('should turn a facedown card to a matched card if the other currently picked card matches with the facedown card', () => {
    const faceDownCard = new Card('foo', STATE.FACEDOWN);
    const currentlyPickedCard = new Card('foo', STATE.PICKED);
    const game = createGame([faceDownCard, currentlyPickedCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, STATE.MATCH);
    assertStateEquals(currentlyPickedCard, STATE.MATCH);
  });

  it('should turn a facedown card to a mismatched card if the other currently picked card does not match with the facedown card', () => {
    const faceDownCard = new Card('foo', STATE.FACEDOWN);
    const currentlyPickedCard = new Card('bar', STATE.PICKED);
    const game = createGame([faceDownCard, currentlyPickedCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, STATE.MISMATCH);
    assertStateEquals(currentlyPickedCard, STATE.MISMATCH);
  });

  describe('turn mismatched cards into facedown cards', () => {
    beforeEach(function setUp() {
      this.faceDownCard = new Card('foo', STATE.FACEDOWN);
    });

    const assertAllCardsState = function assertEveryCardState(cards, state) {
      cards.forEach((card) => {
        assertStateEquals(card, state);
      });
    };
    it('should flip two mismatched cards if a hidden card is picked', function testFacedown() {
      const wrongMatchCards = ['foo', 'bar'].map(image => new Card(image, STATE.MISMATCH));
      const game = createGame([this.faceDownCard, ...wrongMatchCards]);
      game.pickCard(this.faceDownCard);

      assertAllCardsState(wrongMatchCards, STATE.FACEDOWN);
    });


    it('should flip two mismatched cards when playing the game', function testFacedown() {
      const eventualWrongMatchCards = ['foo', 'bar'].map(image => new Card(image, STATE.FACEDOWN));
      const game = createGame([this.faceDownCard, ...eventualWrongMatchCards]);
      eventualWrongMatchCards.forEach(game.pickCard.bind(game));
      game.pickCard(this.faceDownCard);

      assertAllCardsState(eventualWrongMatchCards, STATE.FACEDOWN);
    });
  });

  describe('determine if game is completed', () => {
    let faceDownCard;
    let game;

    beforeEach(() => {
      faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', STATE.FACEDOWN);
      game = createGame([faceDownCard, currentlyPickedCard]);
      game.pickCard(currentlyPickedCard);
    });

    it('should complete game based on matching all cards', () => {
      game.pickCard(faceDownCard);
      expect(game.isWin()).toBe(true);
    });

    it('should continue game', () => {
      expect(game.isWin()).toBe(false);
    });
  });

  describe('statistics', () => {
    beforeEach(function setup() {
      this.faceDownCards = [new Card('foo', STATE.FACEDOWN), new Card('foo', STATE.FACEDOWN)];
      this.game = new Game(this.faceDownCards, numMoves => (numMoves === 1 ? 3 : 2));
    });

    it('should compute number of moves correctly', function testNumMoves() {
      this.game.processInput(0);
      expect(this.game.statistics.getNumberMoves()).toBe(1);

      this.game.processInput(1);
      expect(this.game.statistics.getNumberMoves()).toBe(2);
    });

    it('should compute ratings correctly', function testNumMoves() {
      this.game.processInput(0);
      expect(this.game.statistics.computeStarRating()).toBe(3);

      this.game.processInput(1);
      expect(this.game.statistics.computeStarRating()).toBe(2);
    });
  });
});
