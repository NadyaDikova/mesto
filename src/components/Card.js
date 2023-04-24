export default class Card {
  constructor(data, currentUserId, templateSelector, zoomImage, handleCardClick, likeCard, deleteLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;

    this._isOwner = data.owner._id === currentUserId;
    this._currentUserId = currentUserId;
    this._owner = data.owner._id;

    this._templateSelector = templateSelector;
    this._zoomImage = zoomImage;

    this._handleCardClick = handleCardClick;
    this._likeCard = likeCard;
    this._deleteLikeCard = deleteLikeCard;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__img");
    this._cardName = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeQuantity = this._element.querySelector('.element__like-quantity');
  }

  //добавляем лайк карточке
  _addLikeCard() {
    return this._likes.find((userLike) => userLike._id === this._currentUserId);
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
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeQuantity.textContent = this._likes.length;

    if (this._addLikeCard()){
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }

    if (!this._isOwner) {
      this._deleteButton.remove();
    }

    return this._element;
  }

  toggleLike(data) {
    this._likeQuantity.textContent = data.likes.length;
    this._likeButton.classList.toggle("element__like_active");
  }

  _setLikes (evt) {
    if (evt.target.classList.contains('element__like_active')) {
      this._deleteLikeCard(this._id, this);
    } else {
      this._likeCard(this._id, this);
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleCardClick(this._id);
    });

    this._likeButton.addEventListener("click", evt => {
      this._setLikes(evt);
    });

    this._cardImage.addEventListener("click", () => {
      this._zoomImage(this._name, this._link);
    });
  }
}
