// @flow

import $ from 'jquery';

import CardView from '../views/cardview';
import Card from '../models/card';
import Game from '../models/game';
import GameController from './gamecontroller';
import GameView from '../views/gameview';
import createTotalCardsRatingComputer from '../models/ratingcomputer';
import Statistics from '../models/statistics';
import { CardState } from '../util/cardstate';
import StatisticsView from '../views/statisticsview';


export default function initialize(cardsInput: Array<{ image: string, state: CardState }>) {
  const deck = $('.deck__layout .row');

  const cardViews = [];
  const cardModels = [];
  cardsInput.forEach((cardInput, id) => {
    const [image, state] = [cardInput.image, cardInput.state];
    const cardView = new CardView(image, state, id);
    const cardModel = new Card(image, state);

    cardViews.push(cardView);
    deck.append(cardView.cardSelector);
    cardModels.push(cardModel);
  });

  const gameStatistics = new Statistics(createTotalCardsRatingComputer(cardsInput.length));
  const gameModel = new Game(cardModels, gameStatistics);

  const gameView = new GameView(cardViews, new StatisticsView());
  const gameController = new GameController(gameView, gameModel);
  gameController.bindEvents();
}

