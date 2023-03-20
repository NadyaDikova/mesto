import {openPopup, initialCards} from "./index.js";

export default class Card {
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
}

//получаем разметку
_getTemplate () {
  const newCard = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  return newCard;
}

//вставляем данные в разметку и подготовим карточку к публикации
generateCard () {
  this._element = this._getTemplate();
  this._setEventListeners();

  this._cardImage = this._element.querySelector('.element__img');
  this._cardName = this._element.querySelector('.element__title');
  this._likeButton = this._element.querySelector('.element__like');
  this._deleteButton = this._element.querySelector('.element__delete');

  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._cardName.textContent = this._name;

  return this._element;
}

//лайк карточки
_getLike() {
  this._likeButton.classList.toggle('element__like_active');
}

//удаление карточки
_getRemove() {
  this._element.remove();
  this._element = null;
}


_getPopopImg () {
  const popupPicture = document.querySelector('.popup_type_picture');
  const popupImg = popupPicture.querySelector('.popup__img');
  const caption = popupPicture.querySelector('.popup__figure-caption');

  openPopup(popupPicture);

  popupImg.src = this._element.querySelector('.element__img').src;
  popupImg.alt = this._element.querySelector('.element__img').alt;
  caption.innerText = this._element.querySelector('.element__img').alt;
}


_setEventListeners () {
  //удаление карточки
  this._element.querySelector('.element__delete').addEventListener('click', () => {
    this._getRemove();
  });

  //лайк карточки
  this._element.querySelector('.element__like').addEventListener('click', () => {
    this._getLike();
  });

  //открытие попапа с картинкой
  this._element.querySelector('.element__img').addEventListener('click', () => {
    this._getPopopImg();
  });

}
}

  //перебор массива (карточек) и его отрисовка
  initialCards.forEach ((item) => {
    const card = new Card(item, '#card');

    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
  });


