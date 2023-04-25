import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //колбек сабмита формы
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popup.querySelectorAll(".popup__input");
    this._buttonSave = this._popup.querySelector('.popup__button');
    this._buttonSaveTextContent = this._buttonSave.textContent;
  }
  //собирает данные всех полей
  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  loadingSave (save) {
    if (save) {
      this._buttonSave.textContent = 'Сохранение...';
    } else {
      this._buttonSave.textContent = this._buttonSaveTextContent;
    }
  }
}

