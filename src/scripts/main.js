// @flow
import $ from 'jquery';
import 'bootstrap';
import { CARD_STATE, CardState } from './util/cardstate';
import GameController from './controllers/gamecontroller';

const createInput = function createInput(image: string, state: CardState) {
  return {image, state};
};

const createFaceDownCardInput = function createFaceDownCardInput(images: Array<string>) {
  const cards = images.map(image => (
    [createInput(image, CARD_STATE.FACEDOWN), createInput(image, CARD_STATE.FACEDOWN)]
  ));
  return cards.reduce((accumulationList, currList) => accumulationList.concat(currList), []);
};


$(() => {
  const cardsInput = createFaceDownCardInput([
    'fa-diamond',
    'fa-anchor',
    'fa-paper-plane-o',
    'fa-facebook',
    'fa-coffee',
    'fa-bolt',
    'fa-cube',
    'fa-bicycle',
  ]);

  const gameController = new GameController(cardsInput);
  gameController.startRandomGame();
});
