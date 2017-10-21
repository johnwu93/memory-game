// @flow

import Card from '../card';

export interface GameEngine {
  pickCard(card: Card): void;
  isWin(): boolean;
}
