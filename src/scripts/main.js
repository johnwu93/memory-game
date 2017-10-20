import $ from 'jquery';
import 'bootstrap';
import initialize from './controllers/initialize';
import { STATE } from './util/state';
import ModalView from './views/modalview';

const createInput = function createInput(image, state) {
  return {image, state};
};

const cardsinput = [
  createInput('fa-diamond', STATE.FACEDOWN),
  createInput('fa-anchor', STATE.FACEDOWN),
  createInput('fa-diamond', STATE.FACEDOWN),
  createInput('fa-paper-plane-o', STATE.FACEDOWN),
  createInput('fa-anchor', STATE.FACEDOWN),
  createInput('fa-paper-plane-o', STATE.FACEDOWN),
  createInput('fa-facebook', STATE.FACEDOWN),
  createInput('fa-facebook', STATE.FACEDOWN),
];

$(() => {
  const modalView = new ModalView();
  modalView.show(3, 2, 100);
  initialize(cardsinput);
});
