import Card from '../../src/scripts/models/card';
import { STATE } from '../../src/scripts/util/state';
import Game from '../../src/scripts/models/game';

const assertStateEquals = function assertStateEquals(currentlyPickedCard, state) {
  expect(currentlyPickedCard.getState()).toBe(state);
};

describe('Game Logic', () => {
  it('should turn a facedown card to a picked card if there are no cards currently picked', () => {
    const faceDownCard = new Card('foo', STATE.FACEDOWN);
    const game = new Game([faceDownCard]);

    game.pickCard(faceDownCard);
    assertStateEquals(faceDownCard, STATE.PICKED);
  });

  it('should turn a facedown card to a matched card if the other currently picked card matches with the facedown card',
    () => {
      const faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', STATE.PICKED);
      const game = new Game([faceDownCard, currentlyPickedCard]);

      game.pickCard(faceDownCard);
      assertStateEquals(faceDownCard, STATE.MATCH);
      assertStateEquals(currentlyPickedCard, STATE.MATCH);
    }
  );

  it('should turn a facedown card to a mismatched card if the other currently picked card does not match with the facedown card',
    () => {
      const faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('bar', STATE.PICKED);
      const game = new Game([faceDownCard, currentlyPickedCard]);

      game.pickCard(faceDownCard);
      assertStateEquals(faceDownCard, STATE.MISMATCH);
      assertStateEquals(currentlyPickedCard, STATE.MISMATCH);
    }
  );

  describe('turn mismatched cards into facedown cards', () => {
    beforeEach(() => {
      this.faceDownCard = new Card('foo', STATE.FACEDOWN);
    });

    const assertAllCardsState = function assertEveryCardState(cards, state) {
      cards.forEach((card) => {
        assertStateEquals(card, state);
      });
    };
    it('should flip two mismatched cards if a hidden card is picked', () => {
      const wrongMatchCards = ['foo', 'bar'].map(image => new Card(image, STATE.MISMATCH));
      const game = new Game([this.faceDownCard, ...wrongMatchCards]);
      game.pickCard(this.faceDownCard);

      assertAllCardsState(wrongMatchCards, STATE.FACEDOWN);
    });


    it('should flip two mismatched cards when playing the game', () => {
      const eventualWrongMatchCards = ['foo', 'bar'].map(image => new Card(image, STATE.FACEDOWN));
      const game = new Game([this.faceDownCard, ...eventualWrongMatchCards]);
      eventualWrongMatchCards.forEach(game.pickCard.bind(game));
      game.pickCard(this.faceDownCard);

      assertAllCardsState(eventualWrongMatchCards, STATE.FACEDOWN);
    });
  });

  describe('determine if game is completed', () => {
    let faceDownCard;
    let game;

    beforeEach(() => {
      faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', STATE.FACEDOWN);
      game = new Game([faceDownCard, currentlyPickedCard]);
      game.pickCard(currentlyPickedCard);
    });

    it('should complete game based on matching all cards', () => {
      game.pickCard(faceDownCard);
      expect(game.isWin()).toBe(true);
    });

    it('should continue game', () => {
      expect(game.isWin()).toBe(false);
    });
  });
});
