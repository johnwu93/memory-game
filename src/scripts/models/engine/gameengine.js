// @flow

import type { GameContext } from '../gamecontext';
import Card from '../card';

export interface GameEngine {
  pickCard(card: Card, gameContext: GameContext): GameContext;
}
