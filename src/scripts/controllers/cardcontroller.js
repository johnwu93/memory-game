// @flow

import { STATE, State } from '../util/state';
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

  changeCardStateView(modelState: State) {
    // noinspection IfStatementWithTooManyBranchesJS
    if (modelState.isStateEqual(STATE.MATCH)) {
      this.cardView.setMatch();
    } else if (modelState.isStateEqual(STATE.MISMATCH)) {
      this.cardView.setMismatch();
    } else if (modelState.isStateEqual(STATE.FACEDOWN)) {
      this.cardView.setFacedown();
    } else if (modelState.isStateEqual(STATE.PICKED)) {
      this.cardView.setPicked();
    } else {
      throw new TypeError(`CardController cannot process state ${modelState.toString()} for CarView`);
    }
  }
}
