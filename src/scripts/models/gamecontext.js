// @flow

import Card from './card';

type NoneSelectedContext = { type: 'NONE_SELECTED' };
type PickedSingleCardContext = { type: 'PICKED_SINGLE_CARD', card: Card }
type MismatchedPairContext = { type: 'MISMATCHED_PAIR', first: Card, second: Card };

/**
 * @enum
 * @description Representations of the states that can occur in the game. These are the states:
 * NoneSelectedContext - Player is selecting the first card of a pair
 * PickedSingleCardContext - Player is selecting the second card of a pair after selecting the first
 * MismatchedPairContext - Player has two mismatched cards
 */
export type GameContext = NoneSelectedContext | PickedSingleCardContext | MismatchedPairContext

const NONE_SELECTED = 'NONE_SELECTED';
const PICKED_SINGLE_CARD = 'PICKED_SINGLE_CARD';
const MISMATCHED_PAIR = 'MISMATCHED_PAIR';

const GAME_CONTEXT_NAMES = Object.freeze({
  NONE_SELECTED,
  PICKED_SINGLE_CARD,
  MISMATCHED_PAIR,
});

export default GAME_CONTEXT_NAMES;
