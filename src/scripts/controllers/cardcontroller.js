import { isStateEqual, STATE } from '../util/state';

export default class CardController {
  constructor(cardView, cardModel) {
    this.cardView = cardView;
    this.cardModel = cardModel;
    this.cardModel.bindChangeState(this.changeCardStateView.bind(this));
  }

  changeCardStateView(modelState) {
    // noinspection IfStatementWithTooManyBranchesJS
    if (isStateEqual(modelState, STATE.MATCH)) {
      this.cardView.setMatch();
    } else if (isStateEqual(modelState, STATE.MISMATCH)) {
      this.cardView.setMismatch();
    } else if (isStateEqual(modelState, STATE.FACEDOWN)) {
      this.cardView.setFacedown();
    } else if (isStateEqual(modelState, STATE.PICKED)) {
      this.cardView.setPicked();
    } else {
      throw new TypeError(`CardController cannot process state ${modelState} for CarView`);
    }
  }
}
