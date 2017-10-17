// @flow

export type RatingComputer = (numMoves: number, totalCards: number) => 1 | 2 | 3;

const computeRating: RatingComputer = function computeRating(numMoves, totalCards) {
  if (numMoves <= 1.5 * totalCards) {
    return 3;
  } else if (numMoves <= 2 * totalCards) {
    return 2;
  }
  return 1;
};

export default computeRating;
