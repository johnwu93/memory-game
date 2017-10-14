import $ from 'jquery';
import initialize from './controllers/initialize';
import { STATE } from './util/state';


const cardsinput = [
  ['fa-diamond', STATE.FACEDOWN],
  ['fa-anchor', STATE.FACEDOWN],
  ['fa-diamond', STATE.FACEDOWN],
  ['fa-paper-plane-o', STATE.FACEDOWN],
  ['fa-anchor', STATE.FACEDOWN],
  ['fa-paper-plane-o', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
];

$(() => {
  initialize(cardsinput);
});
