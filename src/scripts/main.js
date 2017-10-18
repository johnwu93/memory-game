import $ from 'jquery';
import initialize from './controllers/initialize';
import { STATE } from './util/state';

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
  initialize(cardsinput);
});
