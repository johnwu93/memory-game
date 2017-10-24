// @flow

import Card from '../card';

/**
 * @description - Based on a card, it will process the card based on it's subclass implementation
 * @abstract
 */
export interface GameEngine {
  pickCard(card: Card): void;
  isWin(): boolean;
}
