// @flow
import Card from './card';
import Statistics from './statistics';
import type { GameEngine } from './engine/gameengine';


export default class Game {
  cards: Array<Card>;
  statistics: Statistics;
  notifyWin: () => void;
  gameEngine: GameEngine;

  constructor(cards: Array<Card>, gameEngine: GameEngine, statistics: Statistics) {
    this.cards = cards;
    this.statistics = statistics;
    this.gameEngine = gameEngine;
  }

  setWinNotification(notifyWin: () => void) {
    this.notifyWin = notifyWin;
  }

  processInput(index: number) {
    this.gameEngine.pickCard(this.cards[index]);
    if (this.gameEngine.isWin()) {
      if (typeof this.notifyWin !== 'undefined') {
        this.notifyWin();
      }
    }
    this.statistics.computeRating();
    this.statistics.incrementMoveCounter();
  }
}
