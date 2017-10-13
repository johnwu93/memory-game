import $ from 'jquery';
import initialize from './controllers/initialize';
import { STATE } from './util/state';


const cardsinput = [
  ['fa-diamond', STATE.FACEDOWN],
  ['fa-anchor', STATE.MISMATCH],
  ['fa-diamond', STATE.PICKED],
  ['fa-paper-plane-o', STATE.MATCH],
  ['fa-anchor', STATE.MATCH],
  ['fa-paper-plane-o', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
];

$(() => {
  initialize(cardsinput);
});
