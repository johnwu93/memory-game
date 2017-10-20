// @flow

const renderRating = function renderRating(rating: number) {
  return Array.from({length: rating}, () => '<li><i class="fa fa-star"></i></li>').join('\n');
};


export default renderRating;
