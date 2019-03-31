const ENTER = 13;
const ESCAPE = 27;

// Работаем с попапом обратной связи:

const feedbackLink = document.querySelector('.contacts__btn');
const feedbackPopup = document.querySelector('.popup-feedback');
const feedbackForm = feedbackPopup.querySelector('.popup-feedback__form');
const feedbackFormName = feedbackPopup.querySelector('[name=feedback-name]');
const feedbackFormEmail = feedbackPopup.querySelector('[name=feedback-email]');
const feedbackCloseButton = feedbackPopup.querySelector('.popup-feedback__btn-close');

const onButtonFeedbackOpen = (evt) => {
  if (evt.keyCode === ENTER || evt.type === 'click') {
    evt.preventDefault();
    feedbackPopup.classList.add('popup-feedback--show');
    feedbackFormName.focus();
    setFeedbackPopupListeners();
  }
}

const onButtonClose = (evt) => {
  if (evt.keyCode === ESCAPE || evt.type === 'click') {
    evt.preventDefault();
    if (feedbackPopup.classList.contains('popup-feedback--show')) {
      console.log('глобальное событие');
      feedbackPopup.classList.remove('popup-feedback--show');
      feedbackCloseButton.removeEventListener('click', onButtonClose);
      window.removeEventListener('keydown', onButtonClose);
      if (feedbackPopup.classList.contains('popup-feedback__error')) {
        feedbackPopup.classList.remove('popup-feedback__error');
      }
    }
  }
}

const onButtonSubmit = (evt) => {
  if (!feedbackFormName.value || !feedbackFormEmail.value) {
    evt.preventDefault();
    feedbackPopup.classList.add('popup-feedback__error');
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
  }
}

const onButtonCloseMap = (evt) => {
  evt.preventDefault();
  mapPopup.classList.remove('popup-map--show');
  mapCloseButton.removeEventListener('click', onButtonCloseMap);
}

mapLink.addEventListener('click', onLinkMap);
// mapLink.addEventListener('keydown', onLinkMap);
