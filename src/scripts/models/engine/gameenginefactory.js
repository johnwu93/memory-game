import { createGameContext } from '../gamecontextfactory';
import { CARD_STATE } from '../../util/cardstate';
import GameEngineImpl from './gameengineimpl';

const createGameEngine = function createGameEngine(cardInput) {
  const gameContext = createGameContext(cardInput);
  const matchedCards = cardInput.filter(card => (
    card.getState().isStateEqual(CARD_STATE.MATCH)
  ));
  return new GameEngineImpl(matchedCards, gameContext, cardInput.length);
};

export default createGameEngine;
