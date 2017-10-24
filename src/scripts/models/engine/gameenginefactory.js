// @flow
import { createGameContext } from '../gamecontextfactory';
import { CARD_STATE } from '../../util/cardstate';
import GameEngineImpl from './gameengineimpl';
import Card from '../card';

/**
 * @description factory method that creates an instance of GameEngineImpl
 * @param cardInput
 * @returns {GameEngineImpl}
 */
const createGameEngine = function createGameEngine(cardInput: Array<Card>) {
  const gameContext = createGameContext(cardInput);
  const matchedCards = cardInput.filter(card => (
    card.getState().isStateEqual(CARD_STATE.MATCH)
  ));
  return new GameEngineImpl(matchedCards, gameContext, cardInput.length);
};

export default createGameEngine;
