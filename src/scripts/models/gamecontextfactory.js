// @flow

import Card from './card';
import type { GameContext } from './gamecontext';
import { CARD_STATE } from '../util/cardstate';

/**
 * @description Utility factory methods to create the states of GameContext
 */
const GAME_CONTEXT_FACTORY = Object.freeze({
  noneSelected(): GameContext {
    return {type: 'NONE_SELECTED'};
  },

  pickedSingleCard(card: Card): GameContext {
    return {type: 'PICKED_SINGLE_CARD', card};
  },
});

/**
 * @description Computes the current context/state of a game based on the current state of the cards
 * in the deck
 * @param cardsInput
 * @returns {*|GameContext}
 */
const createGameContext = function createGameContext(cardsInput: Array<Card>) {
  const currentlyPickedCards = cardsInput.filter(card => (
    card.getState().isStateEqual(CARD_STATE.PICKED)
  ));
  const mismatchedCards = cardsInput.filter(card => (
    card.getState().isStateEqual(CARD_STATE.MISMATCH)
  ));

  if (currentlyPickedCards.length === 0 && mismatchedCards.length === 0) {
    return GAME_CONTEXT_FACTORY.noneSelected();
  } else if (currentlyPickedCards.length === 1 && mismatchedCards.length === 0) {
    return GAME_CONTEXT_FACTORY.pickedSingleCard(currentlyPickedCards[0]);
  }
  throw TypeError('Cannot create a game context with given cards');
};
export { GAME_CONTEXT_FACTORY, createGameContext };
