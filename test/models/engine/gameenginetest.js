// @flow

import Card from '../../../src/scripts/models/card';
import { CARD_STATE } from '../../../src/scripts/util/cardstate';
import GameEngineImpl from '../../../src/scripts/models/engine/gameengineimpl';
import { GAME_CONTEXT_FACTORY } from '../../../src/scripts/models/gamecontextfactory';

describe('game engine', () => {
  it('should none selected context -> picked single card context', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const initialContext = GAME_CONTEXT_FACTORY.noneSelected();
    const gameEngine = new GameEngineImpl([], initialContext, 1);

    gameEngine.pickCard(faceDownCard);

    const expectedGameContext = GAME_CONTEXT_FACTORY.pickedSingleCard(new Card('foo', CARD_STATE.PICKED));
    expect(gameEngine.gameContext).toEqual(expectedGameContext);
  });

  it('should picked single card context -> none selected context if image is the same', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('foo', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    const pickedCardsDeck = [];
    const gameEngine = new GameEngineImpl(pickedCardsDeck, initialContext, 2);
    const expectedGameContext = GAME_CONTEXT_FACTORY.noneSelected();

    gameEngine.pickCard(faceDownCard);
    expect(gameEngine.gameContext).toEqual(expectedGameContext);
    const expectedCard = new Card('foo', CARD_STATE.MATCH);
    expect(faceDownCard).toEqual(expectedCard);
    expect(pickedCard).toEqual(expectedCard);
    expect(pickedCardsDeck.length).toBe(2);
  });

  it('should single card context -> mismatched context if image is not the same', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('bar', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    const gameEngine = new GameEngineImpl([], initialContext, 2);
    gameEngine.pickCard(faceDownCard);

    const expectedMismatchedContext = GAME_CONTEXT_FACTORY.mismatchedPair(
      new Card('bar', CARD_STATE.MISMATCH),
      new Card('foo', CARD_STATE.MISMATCH),
    );
    expect(gameEngine.gameContext).toEqual(expectedMismatchedContext);
  });

  it('should none selected context -> single card context -> mismatched context if image is not the same', () => {
    const firstFaceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const secondFaceDownCard = new Card('bar', CARD_STATE.FACEDOWN);
    const gameContext = GAME_CONTEXT_FACTORY.noneSelected();

    const gameEngine = new GameEngineImpl([], gameContext, 2);
    gameEngine.pickCard(secondFaceDownCard);
    gameEngine.pickCard(firstFaceDownCard);

    const expectedMismatchedContext = GAME_CONTEXT_FACTORY.mismatchedPair(
      new Card('bar', CARD_STATE.MISMATCH),
      new Card('foo', CARD_STATE.MISMATCH),
    );
    expect(gameEngine.gameContext).toEqual(expectedMismatchedContext);
  });

  it('should mismatched context -> picked context', () => {
    const mismatchedCards = ['foo', 'bar'].map(image => new Card(image, CARD_STATE.MISMATCH));
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const initialContext = GAME_CONTEXT_FACTORY.mismatchedPair(
      mismatchedCards[0],
      mismatchedCards[1],
    );

    const gameEngine = new GameEngineImpl([], initialContext, 3);
    gameEngine.pickCard(faceDownCard);

    const expectedGameContext = GAME_CONTEXT_FACTORY.pickedSingleCard(new Card('foo', CARD_STATE.PICKED));
    expect(gameEngine.gameContext).toEqual(expectedGameContext);
    mismatchedCards.forEach((card) => {
      expect(card).toEqual(new Card(card.image, CARD_STATE.FACEDOWN));
    });
  });

  describe('determine if game is completed', () => {
    beforeEach(function setup() {
      this.faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', CARD_STATE.FACEDOWN);

      const gameContext = GAME_CONTEXT_FACTORY.noneSelected();
      this.gameEngine = new GameEngineImpl([], gameContext, 2);
      this.gameEngine.pickCard(currentlyPickedCard);
    });

    it('should complete game based on matching all cards', function testGameCompleted() {
      this.gameEngine.pickCard(this.faceDownCard);
      expect(this.gameEngine.isWin()).toBe(true);
    });

    it('should continue game', function testGameContinuing() {
      expect(this.gameEngine.isWin()).toBe(false);
    });
  });
});
