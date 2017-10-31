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

  it('should single card context -> have called two mismatched cards if image is not the same (discounting time)', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('bar', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    spyOn(window, 'setTimeout').and.returnValue();

    const gameEngine = new GameEngineImpl([], initialContext, 2);
    gameEngine.pickCard(faceDownCard);

    const expectedNoneSelectedContext = GAME_CONTEXT_FACTORY.noneSelected();
    expect(gameEngine.gameContext).toEqual(expectedNoneSelectedContext);
    expect(pickedCard).toEqual(new Card('bar', CARD_STATE.MISMATCH));
    expect(faceDownCard).toEqual(new Card('foo', CARD_STATE.MISMATCH));
  });

  it('should single card context -> have called two mismatched cards if image is not the same (including time)', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('bar', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    spyOn(window, 'setTimeout').and.callFake(() => {
      pickedCard.setState(CARD_STATE.FACEDOWN);
      faceDownCard.setState(CARD_STATE.FACEDOWN);
    });

    const gameEngine = new GameEngineImpl([], initialContext, 2);
    gameEngine.pickCard(faceDownCard);

    const expectedNoneSelectedContext = GAME_CONTEXT_FACTORY.noneSelected();
    expect(gameEngine.gameContext).toEqual(expectedNoneSelectedContext);
    expect(pickedCard).toEqual(new Card('bar', CARD_STATE.FACEDOWN));
    expect(faceDownCard).toEqual(new Card('foo', CARD_STATE.FACEDOWN));
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
