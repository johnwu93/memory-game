// @flow

/**
 * @description Type that represents the possible rating that a player could recieve
 */
export type Rating = 1 | 2 | 3;

/**
 * @description Based on the number of moves that have passed, computes the rating of a game
 */
export type RatingComputer = (numMoves: number) => Rating;

const createTotalCardsRatingComputer: (number) => RatingComputer =
  function createTotalCardsRatingComputer(totalCards: number) {
    return function computeRating(numMoves) {
      if (numMoves <= 0.75 * totalCards) {
        return 3;
      } else if (numMoves <= totalCards) {
        return 2;
      }
      return 1;
    };
  };

export default createTotalCardsRatingComputer;
