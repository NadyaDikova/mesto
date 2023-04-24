import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCard) {
    super (popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__button');
    this._deleteCard = deleteCard;

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard();
    });
  }

  changeSubmitHandler(handler) {
    this._deleteCard = handler;
  }
}

