// @flow

import GameController from './gamecontroller';
import { CardState } from '../util/cardstate';

export default function initialize(cardsInput: Array<{ image: string, state: CardState }>) {
  const gameController = new GameController(cardsInput);
  gameController.startRandomGame();
}

