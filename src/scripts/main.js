import $ from 'jquery';
import initialize from './cardfactory';
import { STATE } from './cardview';


const cardsinput = [
  ['fa-diamond', STATE.MISMATCH],
  ['fa-anchor', STATE.MISMATCH],
  ['fa-diamond', STATE.PICKED],
  ['fa-paper-plane-o', STATE.MATCH],
  ['fa-anchor', STATE.MATCH],
  ['fa-paper-plane-o', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
  ['fa-facebook', STATE.FACEDOWN],
];

$(() => {
  const cardViews = initialize(cardsinput);
  cardViews[2].setMatch();
  cardViews[3].setMismatch();
});
