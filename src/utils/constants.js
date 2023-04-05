export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const wrapper = document.querySelector(".elements"); //обертка всех карточек
export const addButton = document.querySelector(".profile__button-add"); //кнопка "+"
export const template = document.querySelector(".card"); // шаблон
export const editButton = document.querySelector(".profile__button-edit"); //кнопка "изменить"
export const name = document.querySelector(".profile__name"); // первоначальное имя в верстке
export const description = document.querySelector(".profile__description"); // первоначальная профессия в верстке
export const popup = document.querySelector(".popup"); // popup
export const cardTemplate = document.querySelector("#card").content; // Template
export const closeButtons = document.querySelectorAll(".popup__close"); // кнопка закрыть всех попапов

//popup edit
export const popupEdits = document.querySelector(".popup_type_edit"); // форма popup edit
export const formElementEdit = document.forms["form-edit"]; // форма в popup edit
export const nameInputEdit =
  formElementEdit.querySelector(".popup__input-name"); // input имя в popup edit
export const jobInputEdit = formElementEdit.querySelector(
  ".popup__input-description"
); // input профессия в popup edit

//popup add
export const popupAdds = document.querySelector(".popup_type_add"); // форма popup add
export const formElementAdd = document.forms["form-add"]; // форма в popup add
export const addTitle = popupAdds.querySelector(".popup__input-name"); // input имя в popup add
export const addDescription = popupAdds.querySelector(
  ".popup__input-description"
); // input url в popup add

//popup picture
export const popupPicture = document.querySelector(".popup_type_picture"); // форма popup picture
export const popupImg = popupPicture.querySelector(".popup__img"); //картинка в popup picture
export const caption = popupPicture.querySelector(".popup__figure-caption"); //название картинки в popup picture