// @flow

export type Rating = 1 | 2 | 3;
export type RatingComputer = (numMoves: number) => Rating;

const createTotalCardsRatingComputer: (number) => RatingComputer =
  function createTotalCardsRatingComputer(totalCards: number) {
    return function computeRating(numMoves) {
      if (numMoves <= 1.5 * totalCards) {
        return 3;
      } else if (numMoves <= 2 * totalCards) {
        return 2;
      }
      return 1;
    };
  };

export default createTotalCardsRatingComputer;
