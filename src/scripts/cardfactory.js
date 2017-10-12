import $ from 'jquery';

import { CardView } from './views/cardview';


export default function initialize(cardsInput) {
  const cardViews =
    cardsInput.map(cardinput => new CardView(...cardinput));

  const deck = $('.deck__layout .row');
  cardViews.forEach((cardView) => {
    deck.append(cardView.cardSelector);
  });
  return cardViews;
}

