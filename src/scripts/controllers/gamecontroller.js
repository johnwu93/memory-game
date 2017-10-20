// @flow

import CardController from './cardcontroller';
import GameView from '../views/gameview';
import Game from '../models/game';
import CardView from '../views/cardview';
import StatisticsController from './statisticscontroller';

export default class GameController {
  gameView: GameView;
  gameModel: Game;

  constructor(gameView: GameView, gameModel: Game) {
    this.gameView = gameView;
    this.gameModel = gameModel;
  }

  bindEvents() {
    this.gameView.cards.forEach(this.bindCardEvents.bind(this));
    const statisticsController = new StatisticsController(
      this.gameView.statistics,
      this.gameModel.statistics,
    );
    statisticsController.bindEvents();
    statisticsController.setView();
    this.gameModel.setWinNotification(statisticsController.showWinModal.bind(statisticsController));
  }

  bindCardEvents(cardView: CardView, index: number) {
    cardView.bindFaceDownClick(this.pickFaceDownCard.bind(this));
    const cardController = new CardController(cardView, this.gameModel.cards[index]);
    cardController.bindEvents();
  }

  pickFaceDownCard(id: number) {
    this.gameModel.processInput(id);
  }
}
