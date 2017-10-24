// @flow
import Card from './card';
import Statistics from './statistics';
import type { GameEngine } from './engine/gameengine';

/**
 * @description The entity that holds all the interactions of the game components.
 * Outside components would usually interact with this component
 * @param cards - the deck of cards that contains that are played in the game
 * @param gameEngine - process the logic of the game
 * @param statistics - holds statistics such as the number of moves that have passed and rating
 */
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
