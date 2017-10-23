// @flow
import $ from 'jquery';
import CardView from './cardview';
import StatisticsView from './statisticsview';

export default class GameView {
  cards: Array<CardView>;
  statistics: StatisticsView;
  deck: JQuery;

  constructor(cardViews: Array<CardView>, statisticsView: StatisticsView) {
    this.cards = cardViews;
    this.statistics = statisticsView;
    this.deck = $('.deck__layout');
  }

  clearCardView() {
    $(this.deck).empty();
  }

  renderCards() {
    this.cards.forEach(card => $(this.deck).append(card.cardSelector));
  }

  resetCardView() {
    this.clearCardView();
    this.renderCards();
  }
}
