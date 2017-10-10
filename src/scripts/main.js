import $ from 'jquery';


const bindFlipEffect = function bindFlipEffect(cardSide) {
  $(cardSide).click(() =>
    $(cardSide).parent().toggleClass('flipped')
  );
};

function initializeAnimations() {
  $('.mycard__container').children().each((index, cardSide) =>
    bindFlipEffect(cardSide)
  );
}

$(initializeAnimations);
