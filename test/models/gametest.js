import Card from '../../src/scripts/models/card';
import STATE from '../../src/scripts/models/state';
import Game from '../../src/scripts/models/game';

describe('Game Logic', () => {
  it('should turn a facedown card to a picked card if there are no cards currently picked', () => {
    const faceDownCard = new Card('foo', STATE.FACEDOWN);
    const game = new Game([faceDownCard]);

    game.pickCard(faceDownCard);
    expect(faceDownCard.getState()).toBe(STATE.PICKED);
  });

  it('should turn a facedown card to a matched card if the other currently picked card matches with the facedown card',
    () => {
      const faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', STATE.FACEDOWN);
      const game = new Game([faceDownCard, currentlyPickedCard]);
      game.currentlyPickedCards = [currentlyPickedCard];

      game.pickCard(faceDownCard);
      expect(faceDownCard.getState()).toBe(STATE.MATCH);
      expect(currentlyPickedCard.getState()).toBe(STATE.MATCH);
    }
  );

  it('should turn a facedown card to a mismatched card if the other currently picked card does not match with the facedown card',
    () => {
      const faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('bar', STATE.FACEDOWN);
      const game = new Game([faceDownCard, currentlyPickedCard]);
      game.currentlyPickedCards = [currentlyPickedCard];

      game.pickCard(faceDownCard);
      expect(faceDownCard.getState()).toBe(STATE.MISMATCH);
      expect(currentlyPickedCard.getState()).toBe(STATE.MISMATCH);
    }
  );

  describe('determine if game is completed', () => {
    let faceDownCard;
    let game;

    beforeEach(() => {
      faceDownCard = new Card('foo', STATE.FACEDOWN);
      const currentlyPickedCard = new Card('foo', STATE.FACEDOWN);
      game = new Game([faceDownCard, currentlyPickedCard]);
      game.currentlyPickedCards = [currentlyPickedCard];
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
