import { STATE, State } from '../util/state';

export default class CardController {
  constructor(cardView, cardModel) {
    this.cardView = cardView;
    this.cardModel = cardModel;
    this.cardModel.bindChangeState(this.changeCardStateView.bind(this));
  }

  // eslint-disable-next-line flowtype/no-types-missing-file-annotation
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
      throw new TypeError(`CardController cannot process state ${modelState} for CarView`);
    }
  }
}
