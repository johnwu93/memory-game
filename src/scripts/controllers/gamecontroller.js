// @flow

import CardController from './cardcontroller';
import GameView from '../views/gameview';
import Game from '../models/game';
import CardView from '../views/cardview';
import StatisticsController from './statisticscontroller';
import { CardState } from '../util/cardstate';
import Card from '../models/card';
import Statistics from '../models/statistics';
import createTotalCardsRatingComputer from '../models/ratingcomputer';
import createGameEngine from '../models/engine/gameenginefactory';
import StatisticsView from '../views/statisticsview';
import TimeIncrementer from '../models/incrementer/timeincrementer';

type CardsInput = Array<{ image: string, state: CardState }>;

// eslint-disable-next-line no-shadow
const shuffle = function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const temporaryValue = array[currentIndex];
    // eslint-disable-next-line no-param-reassign
    array[currentIndex] = array[randomIndex];
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = temporaryValue;
  }

  return array;
};


const createCardModels = function createCardModels(cardsInput: CardsInput): Array<Card> {
  return cardsInput.map((cardInput) => {
    const [image, state] = [cardInput.image, cardInput.state];
    return new Card(image, state);
  });
};

/**
 * @description Binds events for the view and model component to talk to each other. It also creates
 * the initial state of the game
 */
export default class GameController {
  gameView: GameView;
  gameModel: Game;
  cardsInput: CardsInput;

  constructor(cardsInput: CardsInput) {
    this.cardsInput = cardsInput;
  }

  startRandomGame() {
    const cardModels = shuffle(createCardModels(this.cardsInput));
    const gameStatistics = new Statistics(createTotalCardsRatingComputer(this.cardsInput.length));
    const timeIncrementer = new TimeIncrementer(this.updateTimer.bind(this));
    this.gameModel = new Game(
      cardModels,
      createGameEngine(cardModels),
      gameStatistics,
      timeIncrementer,
    );
    const cardViews = cardModels.map((card, id) =>
      new CardView(card.image, id));
    this.gameView = new GameView(cardViews, new StatisticsView());
    this.setupCards();
    this.setupStatistics();
  }

  resetGame() {
    const timeIncrementer = ((this.gameModel.incrementer: any): TimeIncrementer);
    timeIncrementer.terminateTimer();
    this.startRandomGame();
  }

  updateTimer(time: number) {
    this.gameView.statistics.updateTimer(time);
  }

  setupCards() {
    this.gameView.resetCardView();
    this.gameView.cards.forEach(this.bindCardEvents.bind(this));
  }

  setupStatistics() {
    const timeIncrementer = ((this.gameModel.incrementer: any): TimeIncrementer);
    const statisticsController = new StatisticsController(
      this.gameView.statistics,
      this.gameModel.statistics,
      timeIncrementer,
    );
    statisticsController.bindEvents();
    statisticsController.setView();
    this.gameModel.setWinNotification(statisticsController.showWinModal.bind(statisticsController));
    statisticsController.view.bindRestartClick(this.resetGame.bind(this));
    statisticsController.modalView.bindResetEvent(this.resetGame.bind(this));
  }

  bindCardEvents(cardView: CardView, index: number) {
    cardView.bindFaceDownClick(this.pickFaceDownCard.bind(this));
    const cardController = new CardController(cardView, this.gameModel.cards[index]);
    cardController.changeCardStateView(this.gameModel.cards[index].state);
    cardController.bindEvents();
  }

  pickFaceDownCard(id: number) {
    this.gameModel.processInput(id);
  }
}
