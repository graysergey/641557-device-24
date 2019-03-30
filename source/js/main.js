const feedbackLink = document.querySelector('.contacts__btn');
const feedbackForm = document.querySelector('.popup-feedback');
const feedbackCloseButton = feedbackForm.querySelector('.popup-feedback__btn-close');

const onButtonFeedback = (evt) => {
  evt.preventDefault();
  feedbackForm.classList.add('popup-feedback--show');
  feedbackCloseButton.addEventListener('click', onButtonCloseFeedback);
}

const onButtonCloseFeedback = (evt) => {
  evt.preventDefault();
  feedbackForm.classList.remove('popup-feedback--show');
  feedbackCloseButton.removeEventListener('click', onButtonCloseFeedback);
}

feedbackLink.addEventListener('click', onButtonFeedback);


const mapLink = document.querySelector('.contacts__map');
const mapPopup = document.querySelector('.popup-map');
const mapCloseButton = mapPopup.querySelector('.popup-map__close');

const onLinkMap = (evt) => {
  evt.preventDefault();
  mapPopup.classList.add('popup-map--show');
  mapCloseButton.addEventListener('click', onButtonCloseMap);
}

const onButtonCloseMap = (evt) => {
  evt.preventDefault();
  mapPopup.classList.remove('popup-map--show');
  mapCloseButton.removeEventListener('click', onButtonCloseMap);
}

mapLink.addEventListener('click', onLinkMap);
