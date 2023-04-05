import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super (popupSelector);
    this._handleFormSubmit = handleFormSubmit; //колбек сабмита формы
    this._popupForm = this._popup.querySelector('.popup__form');

  }
//собирает данные всех полей
  _getInputValues () {
    this._inputsList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputsList.forEach(input => {
       this._formValues[input.name] = input.value;
    });
    return this._formValues;

  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener ('submit', evt => {
      evt.preventDefault ();
      this._handleFormSubmit (this._getInputValues());
      this.close();
    });
  }

  close () {
    super.close();
    this._popupForm.reset();
  }
}
