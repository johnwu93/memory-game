/* eslint-disable no-unused-vars */
import $ from 'jquery';

import CardView from '../views/cardview';
import Card from '../models/card';
import Game from '../models/game';
import GameController from './gamecontroller';
import GameView from '../views/gameview';
import computeRating from '../models/starcomputationutil';


export default function initialize(cardsInput) {
  const deck = $('.deck__layout .row');

  const cardViews = [];
  const cardModels = [];
  cardsInput.forEach((cardInput, id) => {
    const [image, state] = cardInput;
    const cardView = new CardView(image, state, id);
    const cardModel = new Card(image, state);

    cardViews.push(cardView);
    deck.append(cardView.cardSelector);

    cardModels.push(cardModel);
  });

  const gameModel = new Game(cardModels, computeRating);
  const gameView = new GameView(cardViews);
  // eslint-disable-next-line no-new
  new GameController(gameView, gameModel);
}

