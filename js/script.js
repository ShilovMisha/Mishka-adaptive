var navToggle = document.querySelector('.main-header__toggle');
var navMenu = document.querySelector('.main-header__list-container');
if (navToggle) {
    navToggle.addEventListener('click', function (evt) {
        evt.preventDefault();

        navToggle.classList.toggle("main-header__toggle--open");
        navMenu.classList.toggle("main-header__list-container--show");
    })
}


var popUpCart = document.querySelector('.modal-cart');
var popUpShowLinks = document.querySelectorAll('.show-add-cart');
var popUpMask = document.querySelector('.modal-cart__mask');
var popUpMessage = document.querySelector('.popup-message');
if (popUpCart) {
    var popUpCartSubmit = popUpCart.querySelector('.modal-cart__submit');
    var onPopUpSubmit = function (submitEvt) {
        if (submitEvt) {
            submitEvt.preventDefault();
            popUpCartSubmit.removeEventListener('click', onPopUpSubmit);
        }
        showMessage('addCartSuccess');
    }
    var onEscClose = function (evtKeyDown) {
        if (evtKeyDown) {
            if (evtKeyDown.keyCode === 27) {
                evtKeyDown.preventDefault();
                popUpCart.classList.remove('modal-cart--show');
                document.removeEventListener('keydown', onEscClose);
            }
            if (evtKeyDown.target === popUpMask) {
                evtKeyDown.preventDefault();
                popUpCart.classList.remove('modal-cart--show');
                document.removeEventListener('keydown', onEscClose);
            }
        } else {
            popUpCart.classList.remove('modal-cart--show');
            document.removeEventListener('keydown', onEscClose);
        }
    };
}

///Форма "в корзину"
var messageContent = {
    addCartSuccess: "Товар был добавлен в корзину",
    missing: "Простите, ресурс еще в разработке.",
    errorForm: "Пожалуйста заполните все обязательные поля.",
    successForm: "Спасибо за ваш заказ!"
}


var timeOut;
var showMessage = function (message, type) {
    if (timeOut) {
        window.clearTimeout(timeOut);
    }
    if (!popUpMessage.classList.contains('popup-message--show')) {
        popUpMessage.classList.add('popup-message--show');
        timeOut = window.setTimeout(showMessage, 2000);

        if (message) {
            popUpMessage.textContent = messageContent[message];
            if (type == 'error') {
                popUpMessage.classList.add('popup-message--error');
            } else popUpMessage.classList.remove('popup-message--error');
        } else popUpMessage.textContent = "Ok";

        if (onEscClose) {
            onEscClose();
        }
    } else popUpMessage.classList.remove('popup-message--show');
}

for (var i = 0; i < popUpShowLinks.length; i++) {
    popUpShowLinks[i].addEventListener('click', function (evt) {
        evt.preventDefault();

        popUpCart.classList.add('modal-cart--show');
        var popUpFirstLabel = popUpCart.querySelector('label:first-of-type');
        popUpFirstLabel.focus();
        document.addEventListener('keydown', onEscClose);
        popUpMask.addEventListener('click', onEscClose);
        ///Форма "в корзину"
        popUpCartSubmit.addEventListener('click', onPopUpSubmit);
    });
}
//Missing links
var missingHref = document.querySelectorAll("a[href='#']");
if (missingHref) {
    for (var m = 0; m < missingHref.length; m++) {
        missingHref[m].addEventListener('click', function (evt) {
            evt.preventDefault();
            showMessage('missing', 'error');
        });
    }
}
///////////////

//Form-order
var form = document.querySelector('.form-order');
var eventDebounce = false;
var onInputChange = function (evtChange) {

    evtChange.preventDefault();

    if (!evtChange.target.validity.valid) {
        if ((!eventDebounce) && (evtChange.type == "invalid")) {
            eventDebounce = true;
            showMessage('errorForm', 'error');
            setTimeout(function () {
                eventDebounce = false;
            }, 30);
        }


        evtChange.target.classList.add('form-order__input--invalid');
    } else evtChange.target.classList.remove('form-order__input--invalid');
}
if (form) {
    var formInputs = form.querySelectorAll('input');
    var requiredInputs = form.querySelectorAll('input[required]');

    for (var i = 0; i < requiredInputs.length; i++) {

        requiredInputs[i].addEventListener('change', onInputChange);
        requiredInputs[i].addEventListener('invalid', onInputChange);
    }
}
var onFormSubmit = function (evt) {
    evt.preventDefault();
    showMessage('successForm');
    for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].value = '';
    }
}
if (form) {
    form.addEventListener('submit', onFormSubmit);
}
///////////////

//itemslide/////////////////////////
var carousel;
$(document).ready(function () {
    carousel = $(".reviews__list");
    if (carousel.length) {
        carousel.itemslide();
        next = $(".reviews__slide-button--next");
        previous = $(".reviews__slide-button--previous");
        next.on('click', function () {
            carousel.next();
        });
        previous.on('click', function () {
            carousel.previous();
        });

        function setDisabled() {
            previous.removeAttr("disabled", "disabled");
            next.removeAttr("disabled", "disabled");
            if (carousel[0].children[carousel.getActiveIndex()] == carousel[0].lastElementChild) {
                next.attr("disabled", "disabled");
            }
            if (carousel[0].children[carousel.getActiveIndex()] == carousel[0].firstElementChild) {
                previous.attr("disabled", "disabled");
            }
        }
        carousel.on('changeActiveIndex', function (e) {
            setDisabled();
        });
        setDisabled();
    }

});

/////////////////////////////////////////////////////////////

//noscript extract
var noscript = document.querySelectorAll('noscript');

for (var i = 0; i < noscript.length; i++) {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = noscript[i].textContent || noscript[i].innerHTML;
    var tempPicture = tempElement.querySelector('picture');
    var tempSource = tempPicture.querySelectorAll('source');
    if (tempSource) {
        for (var j = 0; j < tempSource.length; j++) {
            tempSource[j].dataset.srcset = tempSource[j].getAttribute('srcset');
            tempSource[j].removeAttribute('srcset');
        }
    }
    var tempImage = tempPicture.querySelector('img');
    tempImage.dataset.srcset = tempImage.getAttribute('srcset');
    tempImage.dataset.src = tempImage.getAttribute('src');
    tempImage.removeAttribute('srcset');
    tempImage.removeAttribute('src');
    if (tempPicture) {
        noscript[i].parentNode.insertBefore(tempPicture, noscript[i]);
    }
}
/////////////////////////////////////////////////////////////


//ForEach для IE
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}

var lazyLoad = function () {
    if ('IntersectionObserver' in window) {

        function lazyLoadPicture(element) {
            element.forEach(function (change) {

                if (change.isIntersecting) {
                    //для всех элементов с dataset-src
                    if (change.target.dataset.src) {
                        change.target.src = change.target.dataset.src;
                        change.target.removeAttribute('data-src');
                    }
                    ////////////////////////
                    //для всех элементов с <img dataset-src='' dataset-srcset=''> внутри
                    var picture = change.target.querySelector('img');
                    if (picture) {
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
                    for (var j = 0; j < sources.length; j++) {
                        if (sources[j]) {
                            if (sources[j].dataset.srcset) {
                                sources[j].srcset = sources[j].dataset.srcset;
                                sources[j].removeAttribute('data-srcset');
                            }
                        }

                    }
                }
            });
        }

        var options = {
            threshold: [0],
            rootMargin: '100px'
        };

        var watchMe = new IntersectionObserver(lazyLoadPicture, options);
        //установить обсервер для picture
        var pictures = document.querySelectorAll('picture');
        for (var i = 0; i < pictures.length; i++) {
            var picImg = pictures[i].querySelector('img');
            if (picImg) {
                if (picImg.dataset) {
                    if (picImg.dataset.src) {
                        watchMe.observe(pictures[i]);
                    }
                }
            }
        }
        //установить обсервер для iframe
        var iframes = document.querySelectorAll('iframe:not([src])');
        if (iframes) {
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
if (!('IntersectionObserver' in window)) {
    var currentElement = scriptElement.cloneNode();
    currentElement.src = "js/intersection-observer.js";

    body.appendChild(currentElement);

    currentElement.onload = function () {
        setTimeout(lazyLoad, 10);
    };

} else lazyLoad();

var loadFallback = function () {
    if (html.classList.contains('no-picture')) {

        var currentElement = scriptElement.cloneNode();
        currentElement.src = "js/picturefill.min.js";

        body.appendChild(currentElement);
        var currentElement = scriptElement.cloneNode();
        currentElement.src = "js/pf.mutation.min.js";
        body.appendChild(currentElement);
    }
}

setTimeout(loadFallback, 100);

//textShadow
var text = document.querySelectorAll(".shadowtext");
window.onmousemove = function (e) {
    for (var i = 0; i < text.length; i++) {
        var box = text[i].getBoundingClientRect();
        var x = box.left + (box.right - box.left) / 2 - e.clientX,
            y = box.top + (box.bottom - box.top) / 2 - e.clientY;
        text[i].style.textShadow = x / 300 + "px " + y / 8000 + "px " + (2 + (Math.abs(x) + Math.abs(y)) / 80000) + "px #63d1bb," + x / 8000 + "px " + y / 300 + "px " + (2 + (Math.abs(x) + Math.abs(y)) / 80000) + "px #ff00bc ";
        text[i].style.transform = "rotateY(" + -x / 60 + "deg)" + "rotateX(" + y / 60 + "deg)";
    }
}