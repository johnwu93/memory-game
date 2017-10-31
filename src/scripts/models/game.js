// @flow
import Card from './card';
import GameEngineImpl from './engine/gameengineimpl';
import EventIncrementer from './incrementer/eventincrementer';
import Statistics from './statistics';
import GAME_CONTEXT_NAMES from './gamecontext';


const myIsGameStarted = new WeakMap();
/**
 * @description The entity that holds all the interactions of the game components.
 * Outside components, such as the view, would usually interact with this component
 * @param cards - the deck of cards that contains that are played in the game
 * @param gameEngine - process the logic of the game
 * @param statistics - Adjust the statistics of the game
 * @param incrementer - starts the time incrementer when a move is first played
 */
export default class Game {
  cards: Array<Card>;
  notifyWin: () => void;
  gameEngine: GameEngineImpl;
  statistics: Statistics;
  incrementer: EventIncrementer;

  constructor(
    cards: Array<Card>,
    gameEngine: GameEngineImpl,
    statistics: Statistics,
    incrementer: EventIncrementer,
  ) {
    this.cards = cards;
    this.gameEngine = gameEngine;
    this.statistics = statistics;
    this.incrementer = incrementer;
    myIsGameStarted.set(this, false);
  }

  setWinNotification(notifyWin: () => void) {
    this.notifyWin = notifyWin;
  }

  processInput(index: number) {
    if (!myIsGameStarted.get(this)) {
      this.incrementer.setup();
      myIsGameStarted.set(this, true);
    }
    if (this.gameEngine.gameContext.type === GAME_CONTEXT_NAMES.PICKED_SINGLE_CARD) {
      this.statistics.incrementMoveCounter();
      this.statistics.computeRating();
    }

    this.gameEngine.pickCard(this.cards[index]);

    if (this.gameEngine.isWin() && typeof this.notifyWin !== 'undefined') {
      this.notifyWin();
    }
  }
}
