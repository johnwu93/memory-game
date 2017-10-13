export default class GameView {
  get cards() {
    return this.cardViews;
  }

  constructor(cardViews) {
    this.cardViews = cardViews;
  }
}
