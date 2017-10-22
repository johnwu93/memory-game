import $ from 'jquery';
import 'bootstrap';
import initialize from './controllers/initialize';
import { CARD_STATE } from './util/cardstate';
import ModalView from './views/modalview';

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
  const modalView = new ModalView();
  modalView.show(3, 2, 100);
  initialize(cardsinput);
});
