


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




//ForEach для IE
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}

var lazyLoad = function(){
	if ('IntersectionObserver' in window){
	
	function lazyLoadPicture(element){
		  element.forEach(function(change) {
		 	
		
		
    
    if(change.isIntersecting) {
      	//для всех элементов с dataset-src
		if (change.target.dataset.src) {
			change.target.src = change.target.dataset.src;
			change.target.removeAttribute('data-src');
		}
		////////////////////////
		//для всех элементов с <img dataset-src='' dataset-srcset=''> внутри
		var picture = change.target.querySelector('img');
		if (picture){
				if (picture.dataset.src) {
				picture.src = picture.dataset.src;
				picture.removeAttribute('data-src');
			}
			if (picture.dataset.srcset) {
				picture.srcset = picture.dataset.srcset;
				picture.removeAttribute('data-srcset');
			}
		}
		
		//для всех элементов с <source dataset-srcset=''> внутри
		var sources = change.target.querySelectorAll('source');
		for (var j = 0; j < sources.length; j++){
			if (sources[j]){
				if (sources[j].dataset.srcset) {
					sources[j].srcset = sources[j].dataset.srcset;
					sources[j].removeAttribute('data-srcset');
				}
			}
			
		}
    }
  });
	}

		let options = {
	  threshold: [0],
	   rootMargin: '100px'
	};

	let watchMe = new IntersectionObserver(lazyLoadPicture, options);
	//установить обсервер для picture
	var pictures = document.querySelectorAll('picture');
	for (var i = 0; i < pictures.length; i++) {
		var picImg = pictures[i].querySelector('img');
		if (picImg) {
			if (picImg.dataset){
				if (picImg.dataset.src){
					watchMe.observe(pictures[i]);
				}
			}
		}	
	}
	//установить обсервер для iframe
	var iframes = document.querySelectorAll('iframe:not([src])');
	if (iframes){
		for (var i = 0; i < iframes.length; i++) {

			watchMe.observe(iframes[i]);	
		}
	}
}
}



//Инклюды для IE
var body = document.querySelector("body");
var html = document.querySelector("html");
var scriptElement = document.createElement('script');
if (!('IntersectionObserver' in window)){
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/intersection-observer.js";
	
	body.appendChild(currentElement);

currentElement.onload = function() {
 	setTimeout(lazyLoad, 10);
};
	
} else lazyLoad();

var loadFallback = function () {
	if (html.classList.contains('no-picture')){
	console.log(1);
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/picturefill.min.js";
	
	body.appendChild(currentElement);
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/pf.mutation.min.js";
	body.appendChild(currentElement);
	}
}

setTimeout(loadFallback, 100);	
