const ENTER = 13;
const ESCAPE = 27;

// Работаем с попапом обратной связи:

const feedbackLink = document.querySelector('.contacts__btn');
const feedbackPopup = document.querySelector('.popup-feedback');
const feedbackForm = feedbackPopup.querySelector('.popup-feedback__form');
const feedbackName = feedbackPopup.querySelector('.popup-feedback__input-name');
const feedbackEmail = feedbackPopup.querySelector('.popup-feedback__input-email');
const feedbackMassage = feedbackPopup.querySelector('.popup-feedback__textarea');
const feedbackCloseButton = feedbackPopup.querySelector('.popup-feedback__btn-close');

let storageName = '';
let storageEmail = '';
let storageMassage = '';

const checkLocalStorage = () => {
  try {
    storageName = localStorage.getItem('login');
  } catch (err) {
    storageName = false;
  }

  try {
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    storageEmail = false;
  }

  try {
    storageMassage = localStorage.getItem('massage');
  } catch (err) {
    storageMassage = false;
  }
}

const onButtonFeedbackOpen = (evt) => {
  if (evt.keyCode === ENTER || evt.type === 'click') {
    evt.preventDefault();
    feedbackPopup.classList.add('popup-feedback--show');
    checkLocalStorage();

    if (storageName) {
      feedbackName.value = storageName;
      feedbackEmail.focus();
    } else {
      feedbackName.focus();
    }

    if (storageEmail) {
      feedbackEmail.value = storageEmail;
      if (feedbackEmail.value.length >= 5 && feedbackEmail.value.search('@') !== -1 && feedbackEmail.value.indexOf('.') !== -1) { // проверяет наличие @ и точки в input type="email" (минимальная валидность, для установки фокуса)
        if (!feedbackName.value) {
          feedbackName.focus();
        } else {
          feedbackMassage.focus();
        }
      }
    } else if (!feedbackName.value) {
      feedbackName.focus();
    } else {
      feedbackEmail.focus();
    }

    if (storageMassage) {
      feedbackMassage.value = storageMassage;
    }

    setFeedbackPopupListeners();
  }
}

const onButtonClose = (evt) => {
  if (evt.keyCode === ESCAPE || evt.type === 'click') {
    evt.preventDefault();

    if (feedbackPopup.classList.contains('popup-feedback--show')) {
      feedbackPopup.classList.remove('popup-feedback--show');
      feedbackCloseButton.removeEventListener('click', onButtonClose);
      window.removeEventListener('keydown', onButtonClose);
    }

    if (feedbackName.value.length >= 2) { // Минимальное количество символов в поле логина
      localStorage.setItem('login', feedbackName.value);
    } else {
      localStorage.removeItem('login');
      feedbackName.value = '';
    }

    if (feedbackEmail.value) {
      localStorage.setItem('email', feedbackEmail.value);
    }

    if (feedbackMassage.value) {
      localStorage.setItem('massage', feedbackMassage.value);
    }
  }
}

const onButtonSubmit = (evt) => {
  if (!feedbackName.value) {
    evt.preventDefault();
    feedbackName.classList.add('popup-feedback__error');
    setTimeout(() => {
      feedbackName.classList.remove('popup-feedback__error')
    }, 1000);
  } else if (feedbackName.value.length >= 2) {
    localStorage.setItem('login', feedbackName.value);
  } else if (feedbackName.value.length < 2) {
    localStorage.removeItem('login');
    feedbackName.value = '';
  }

  if (!feedbackEmail.value) {
    console.log('типа нету имени ', feedbackEmail.value)
    evt.preventDefault();
    feedbackEmail.classList.add('popup-feedback__error');
    setTimeout(() => {
      feedbackEmail.classList.remove('popup-feedback__error')
    }, 1000);
  }  else {
    localStorage.setItem('email', feedbackEmail.value);
  }

  if (!feedbackMassage.value) {
    evt.preventDefault();
    feedbackMassage.classList.add('popup-feedback__error');
    setTimeout(() => {
      feedbackMassage.classList.remove('popup-feedback__error')
    }, 1000);
  }  else {
    localStorage.setItem('massage', feedbackMassage.value);
  }
}

const setFeedbackPopupListeners = () => {
  feedbackCloseButton.addEventListener('click', onButtonClose);
  window.addEventListener('keydown', onButtonClose);
  feedbackForm.addEventListener('submit', onButtonSubmit);
}

feedbackLink.addEventListener('click', onButtonFeedbackOpen);
feedbackLink.addEventListener('keydown', onButtonFeedbackOpen);


// Работаем с попапом карты:

const mapLink = document.querySelector('.contacts__map');
const mapPopup = document.querySelector('.popup-map');
const mapCloseButton = mapPopup.querySelector('.popup-map__close');

const onLinkMap = (evt) => {
  if (evt.keyCode === ENTER || evt.type === 'click') {
    evt.preventDefault();
    mapPopup.classList.add('popup-map--show');
    mapCloseButton.addEventListener('click', onButtonCloseMap);
    window.addEventListener('keydown', onButtonCloseMap);
  }
}

const onButtonCloseMap = (evt) => {
  if (evt.keyCode === ESCAPE || evt.type === 'click') {
    evt.preventDefault();
    mapPopup.classList.remove('popup-map--show');
    mapCloseButton.removeEventListener('click', onButtonCloseMap);
    window.removeEventListener('click', onButtonCloseMap);
  }
}

mapLink.addEventListener('click', onLinkMap);
mapLink.addEventListener('keydown', onLinkMap);
