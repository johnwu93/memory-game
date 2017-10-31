// @flow

import type { GameEngine } from './gameengine';
import Card from '../card';
import type { GameContext } from '../gamecontext';
import GAME_CONTEXT_NAMES from '../gamecontext';
import { CARD_STATE } from '../../util/cardstate';
import { GAME_CONTEXT_FACTORY } from '../gamecontextfactory';

/**
 * @description Private methods that implements transitions based on the states of
 * {@link GameContext}
 */
const flipCardFaceup = function flipCardFaceup(card: Card) {
  const newContext = GAME_CONTEXT_FACTORY.pickedSingleCard(card);
  card.setState(CARD_STATE.PICKED);
  return newContext;
};

const computeMatch = function computeMatch(
  faceDownCard: Card,
  pickedCard: Card,
  matchedCards: Array<Card>,
) {
  const newContext = GAME_CONTEXT_FACTORY.noneSelected();
  if (faceDownCard.isMatchingCard(pickedCard)) {
    matchedCards.push(faceDownCard, pickedCard);
    faceDownCard.setState(CARD_STATE.MATCH);
    pickedCard.setState(CARD_STATE.MATCH);
  } else {
    pickedCard.setState(CARD_STATE.MISMATCH);
    faceDownCard.setState(CARD_STATE.MISMATCH);
    setTimeout(() => {
      pickedCard.setState(CARD_STATE.FACEDOWN);
      faceDownCard.setState(CARD_STATE.FACEDOWN);
    }, 1500);
  }
  return newContext;
};

const pickFacedownCardAfterMismatched = function pickFacedownCardAfterMismatched(
  faceDownCard: Card,
  firstMismatchedCard: Card,
  secondMismatchedCard: Card,
) {
  const newContext = GAME_CONTEXT_FACTORY.pickedSingleCard(faceDownCard);
  faceDownCard.setState(CARD_STATE.PICKED);
  firstMismatchedCard.setState(CARD_STATE.FACEDOWN);
  secondMismatchedCard.setState(CARD_STATE.FACEDOWN);
  return newContext;
};

export default class GameEngineImpl implements GameEngine {
  matchedCards: Array<Card>;
  numCards: number;
  gameContext: GameContext;

  constructor(matchedCards: Array<Card>, gameContext: GameContext, numCards: number) {
    this.matchedCards = matchedCards;
    this.numCards = numCards;
    this.gameContext = gameContext;
  }

  pickCard(card: Card): void {
    // noinspection IfStatementWithTooManyBranchesJS
    if (this.gameContext.type === GAME_CONTEXT_NAMES.NONE_SELECTED) {
      this.gameContext = flipCardFaceup(card);
    } else if (this.gameContext.type === GAME_CONTEXT_NAMES.PICKED_SINGLE_CARD) {
      this.gameContext = computeMatch(card, this.gameContext.card, this.matchedCards);
    } else if (this.gameContext.type === GAME_CONTEXT_NAMES.MISMATCHED_PAIR) {
      this.gameContext =
        pickFacedownCardAfterMismatched(card, this.gameContext.first, this.gameContext.second);
    } else {
      throw new TypeError('Invalid gameContext State');
    }
  }

  isWin(): boolean {
    return this.matchedCards.length === this.numCards;
  }
}
