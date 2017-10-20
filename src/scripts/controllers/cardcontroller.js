// @flow

import { CARD_STATE, CardState } from '../util/cardstate';
import CardView from '../views/cardview';
import Card from '../models/card';

export default class CardController {
  cardView: CardView;
  cardModel: Card;

  constructor(cardView: CardView, cardModel: Card) {
    this.cardView = cardView;
    this.cardModel = cardModel;
  }

  bindEvents() {
    this.cardModel.bindChangeState(this.changeCardStateView.bind(this));
  }

  changeCardStateView(modelState: CardState) {
    // noinspection IfStatementWithTooManyBranchesJS
    if (modelState.isStateEqual(CARD_STATE.MATCH)) {
      this.cardView.setMatch();
    } else if (modelState.isStateEqual(CARD_STATE.MISMATCH)) {
      this.cardView.setMismatch();
    } else if (modelState.isStateEqual(CARD_STATE.FACEDOWN)) {
      this.cardView.setFacedown();
    } else if (modelState.isStateEqual(CARD_STATE.PICKED)) {
      this.cardView.setPicked();
    } else {
      throw new TypeError(`CardController cannot process state ${modelState.toString()} for CarView`);
    }
  }
}
