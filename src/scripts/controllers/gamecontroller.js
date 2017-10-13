import CardController from './cardcontroller';

export default class GameController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.cards.forEach(this.bindEvents.bind(this));
  }

  bindEvents(cardView, index) {
    cardView.bindFaceDownClick(this.pickFaceDownCard.bind(this));
    // eslint-disable-next-line no-new
    new CardController(cardView, this.model.cards[index]);
  }

  pickFaceDownCard(id) {
    this.model.processInput(id);
  }
}
