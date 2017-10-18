// @flow

import CardView from './cardview';
import StatisticsView from './statisticsview';

export default class GameView {
  cards: Array<CardView>;
  statistics: StatisticsView;

  constructor(cardViews: Array<CardView>, statisticsView: StatisticsView) {
    this.cards = cardViews;
    this.statistics = statisticsView;
  }
}
