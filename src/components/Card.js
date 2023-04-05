export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //получаем разметку
  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return newCard;
  }

  //вставляем данные в разметку и подготовим карточку к публикации
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".element__img");
    this._cardName = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    return this._element;
  }

  //лайк карточки
  _toggleLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //удаление карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    //удаление карточки
    this._deleteButton.addEventListener("click", () => {
      this._removeCard();
    });

    //лайк карточки
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    //открытие попапа с картинкой
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
