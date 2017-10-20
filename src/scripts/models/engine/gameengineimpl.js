// @flow

import type { GameEngine } from './gameengine';
import Card from '../card';
import type { GameContext } from '../gamecontext';
import { GAME_CONTEXT_FACTORY, GAME_CONTEXT_NAMES } from '../gamecontext';
import { CARD_STATE } from '../../util/cardstate';

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
  let newContext;
  if (faceDownCard.isMatchingCard(pickedCard)) {
    newContext = GAME_CONTEXT_FACTORY.noneSelected();
    matchedCards.push(faceDownCard, pickedCard);
    faceDownCard.setState(CARD_STATE.MATCH);
    pickedCard.setState(CARD_STATE.MATCH);
  } else {
    newContext = GAME_CONTEXT_FACTORY.mismatchedPair(pickedCard, faceDownCard);
    pickedCard.setState(CARD_STATE.MISMATCH);
    faceDownCard.setState(CARD_STATE.MISMATCH);
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

  constructor(matchedCards: Array<Card>) {
    this.matchedCards = matchedCards;
  }

  pickCard(card: Card, gameContext: GameContext): GameContext {
    if (gameContext.type === GAME_CONTEXT_NAMES.NONE_SELECTED) {
      return flipCardFaceup(card);
    } else if (gameContext.type === GAME_CONTEXT_NAMES.PICKED_SINGLE_CARD) {
      return computeMatch(card, gameContext.card, this.matchedCards);
    } else if (gameContext.type === GAME_CONTEXT_NAMES.MISMATCHED_PAIR) {
      return pickFacedownCardAfterMismatched(card, gameContext.first, gameContext.second);
    }
    throw new TypeError('Invalid state to be picked');
  }
}
