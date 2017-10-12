import $ from 'jquery';
import initialize from './cardfactory';
import { STATE } from './views/cardview';


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
  const cardViews = initialize(cardsinput);
  setTimeout(() => cardViews[2].setMismatch(), 1000);
  cardViews.forEach(
    (cardView) => {
      cardView.bindFaceDownClick.bind(cardView)(cardView.setPicked.bind(cardView));
    }
  );
});
