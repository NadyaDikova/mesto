import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__figure-caption");
  }
  // вставляет в попап картинку и подпись
  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._caption.textContent = name;
  }
}
