
var jsFlag = document.querySelector('.no-js');
jsFlag.classList.remove('no-js');
jsFlag.classList.add('js');

var navToggle = document.querySelector('.main-header__toggle');
var navMenu = document.querySelector('.main-header__list-container');

navToggle.addEventListener('click', function(evt){
	evt.preventDefault();

	navToggle.classList.toggle("main-header__toggle--open");
	navMenu.classList.toggle("main-header__list-container--show");
})

var popUpCart = document.querySelector('.modal-cart');
var popUpShowLinks = document.querySelectorAll('.show-add-cart');


var popUpMask = document.querySelector('.modal-cart__mask');
var onEscClose = function(evtKeyDown){
	evtKeyDown.preventDefault();
	if (evtKeyDown.keyCode === 27){
		popUpCart.classList.remove('modal-cart--show');
		document.removeEventListener('keydown' ,onEscClose);
	}
	if (evtKeyDown.target === popUpMask) {
		popUpCart.classList.remove('modal-cart--show');
		document.removeEventListener('keydown' ,onEscClose);
	}
};
for (var i=0; i < popUpShowLinks.length; i++) {
		popUpShowLinks[i].addEventListener('click', function(evt){
		evt.preventDefault();

		popUpCart.classList.add('modal-cart--show');

		document.addEventListener('keydown',onEscClose);
		popUpMask.addEventListener('click', onEscClose);

	});
}



var reviewItems = document.querySelectorAll('.reviews__item');
var buttonPrevious = document.querySelector('.reviews__slide-button--previous');
var buttonNext = document.querySelector('.reviews__slide-button--next');

var shift = function () {
	for (var i = 0; i < reviewItems.length; i++) {
		if (reviewItems[i].classList.contains('reviews__item--current')) {
			for (var j =0; j < reviewItems.length; j++) {
				reviewItems[j].style.transform="translateX(-"+i * 100+"%)";
				
			}

			if (i === 0) {
				buttonPrevious.classList.add('button--disabled');
			} 
			if (i === (reviewItems.length-1)) {
				
				buttonNext.classList.add('button--disabled');
			}
		}
	}
}
var translate = function(evtSlide){
	var isChanged = false;
	buttonNext.classList.remove('button--disabled');
	buttonPrevious.classList.remove('button--disabled');
	for (var i = 0; i < reviewItems.length; i++) {
	

	
	if (reviewItems[i].classList.contains('reviews__item--current')){

		if (evtSlide){
			
			if (evtSlide.target == buttonPrevious && !isChanged) {
				
				if (i !== 0) {
					reviewItems[i].classList.remove('reviews__item--current');
					reviewItems[i - 1].classList.add('reviews__item--current');
				
				}
			} else if (evtSlide.target == buttonNext && !isChanged) {
				
				if (i !== (reviewItems.length- 1)) {
					reviewItems[i].classList.remove('reviews__item--current');
			
					reviewItems[i + 1].classList.add('reviews__item--current');
					
				
		
				}
			}
		}
		isChanged = true;	
}
	shift();
	}
};

if (buttonNext && buttonPrevious) {
	translate();
	buttonNext.addEventListener('click', translate);
	buttonPrevious.addEventListener('click', translate);
}

// buttonPrevious.addEventListener('click', function(evt){
// 	evt.preventDefault();

// 		for (var i = 0; i < reviewItems.length; i++) {
		
// 		if (reviewItems[i].classList.contains('reviews__item--current') && i !== 0) {
// 			reviewItems[i].classList.remove('reviews__item--current');
// 			reviewItems[i - 1].classList.add('reviews__item--current');
// 		}
// 	}
// 	translate();
// });
// buttonNext.addEventListener('click', function(evt){
// 	evt.preventDefault();

// 		for (var i = 0; i < reviewItems.length-1; i++) {
		
// 		if (reviewItems[i].classList.contains('reviews__item--current')) {
// 			reviewItems[i].classList.remove('reviews__item--current');
// 			console.log(i);
// 			reviewItems[i + 1].classList.add('reviews__item--current');
// 			break;
// 		}
// 	}
// 	translate();
// });


//reviewsList.children[1].style.transform="translateX(100%)";
//console.log(reviewsList.children[1].style.transform);