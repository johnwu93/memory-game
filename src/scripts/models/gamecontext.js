// @flow

import Card from './card';

type NoneSelectedContext = { type: 'NONE_SELECTED' };
type PickedSingleCardContext = { type: 'PICKED_SINGLE_CARD', card: Card }
type MismatchedPairContext = { type: 'MISMATCHED_PAIR', first: Card, second: Card };

export type GameContext = NoneSelectedContext | PickedSingleCardContext | MismatchedPairContext


const GAME_CONTEXT_FACTORY = Object.freeze({
  noneSelected(): GameContext {
    return {type: 'NONE_SELECTED'};
  },

  pickedSingleCard(card: Card): GameContext {
    return {type: 'PICKED_SINGLE_CARD', card};
  },

  mismatchedPair(firstCard: Card, secondCard: Card): GameContext {
    return {type: 'MISMATCHED_PAIR', first: firstCard, second: secondCard};
  },
});

const NONE_SELECTED = 'NONE_SELECTED';
const PICKED_SINGLE_CARD = 'PICKED_SINGLE_CARD';
const MISMATCHED_PAIR = 'MISMATCHED_PAIR';


const GAME_CONTEXT_NAMES = Object.freeze({
  NONE_SELECTED,
  PICKED_SINGLE_CARD,
  MISMATCHED_PAIR,
});

export { GAME_CONTEXT_FACTORY, GAME_CONTEXT_NAMES };
