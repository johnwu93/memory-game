import $ from 'jquery';
import 'bootstrap';
import initialize from './controllers/initialize';
import { CARD_STATE } from './util/cardstate';

const createInput = function createInput(image, state) {
  return {image, state};
};

const cardsinput = [
  createInput('fa-diamond', CARD_STATE.FACEDOWN),
  createInput('fa-anchor', CARD_STATE.FACEDOWN),
  createInput('fa-diamond', CARD_STATE.FACEDOWN),
  createInput('fa-paper-plane-o', CARD_STATE.FACEDOWN),
  createInput('fa-anchor', CARD_STATE.FACEDOWN),
  createInput('fa-paper-plane-o', CARD_STATE.FACEDOWN),
  createInput('fa-facebook', CARD_STATE.FACEDOWN),
  createInput('fa-facebook', CARD_STATE.FACEDOWN),
];

$(() => {
  initialize(cardsinput);
});
