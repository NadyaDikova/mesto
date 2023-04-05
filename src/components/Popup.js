export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClick = this._handleEscClick.bind(this);
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClick);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClick);
  }

  _handleEscClick (evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
// добавляет слушать на иконку закрытия попапа, также закрывается на оверлей
  setEventListeners () {
    this._popup.addEventListener ('click', evt => {
      if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))) {
        this.close();
      }
    });
  }
}
