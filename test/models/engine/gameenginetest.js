// @flow

import Card from '../../../src/scripts/models/card';
import { CARD_STATE } from '../../../src/scripts/util/cardstate';
import GameEngineImpl from '../../../src/scripts/models/engine/gameengineimpl';
import { GAME_CONTEXT_FACTORY } from '../../../src/scripts/models/gamecontext';

describe('game engine', () => {
  it('should none selected context -> picked single card context', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const initialContext = GAME_CONTEXT_FACTORY.noneSelected();
    const gameEngine = new GameEngineImpl([faceDownCard]);

    const newContext = gameEngine.pickCard(faceDownCard, initialContext);

    const expectedGameContext = GAME_CONTEXT_FACTORY.pickedSingleCard(faceDownCard);
    expect(newContext).toEqual(expectedGameContext);
    expect(faceDownCard).toEqual(new Card('foo', CARD_STATE.PICKED));
  });

  it('should picked single card context -> none selected context if image is the same', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('foo', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    const pickedCardsDeck = [];
    const gameEngine = new GameEngineImpl(pickedCardsDeck);
    const expectedGameContext = GAME_CONTEXT_FACTORY.noneSelected();

    const newContext = gameEngine.pickCard(faceDownCard, initialContext);
    expect(newContext).toEqual(expectedGameContext);
    const expectedCard = new Card('foo', CARD_STATE.MATCH);
    expect(faceDownCard).toEqual(expectedCard);
    expect(pickedCard).toEqual(expectedCard);
    expect(pickedCardsDeck.length).toBe(2);
  });

  it('should single card context -> mismatched context if image is not the same', () => {
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const pickedCard = new Card('bar', CARD_STATE.PICKED);
    const initialContext = GAME_CONTEXT_FACTORY.pickedSingleCard(pickedCard);

    const gameEngine = new GameEngineImpl([]);
    const newContext = gameEngine.pickCard(faceDownCard, initialContext);

    const expectedMismatchedContext = GAME_CONTEXT_FACTORY.mismatchedPair(
      pickedCard,
      faceDownCard,
    );
    expect(newContext).toEqual(expectedMismatchedContext);
    expect(faceDownCard).toEqual(new Card('foo', CARD_STATE.MISMATCH));
    expect(pickedCard).toEqual(new Card('bar', CARD_STATE.MISMATCH));
  });

  it('should mismatched context -> picked context', () => {
    const mismatchedCards = ['foo', 'bar'].map(image => new Card(image, CARD_STATE.MISMATCH));
    const faceDownCard = new Card('foo', CARD_STATE.FACEDOWN);
    const initialContext = GAME_CONTEXT_FACTORY.mismatchedPair(
      mismatchedCards[0],
      mismatchedCards[1],
    );

    const gameEngine = new GameEngineImpl([]);
    const newContext = gameEngine.pickCard(faceDownCard, (initialContext));

    const expectedGameContext = GAME_CONTEXT_FACTORY.pickedSingleCard(faceDownCard);
    expect(newContext).toEqual(expectedGameContext);
    expect(faceDownCard).toEqual(new Card('foo', CARD_STATE.PICKED));
    mismatchedCards.forEach((card) => {
      expect(card).toEqual(new Card(card.image, CARD_STATE.FACEDOWN));
    });
  });
});
