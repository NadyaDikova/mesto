import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const wrapper = document.querySelector('.elements'); //обертка всех карточек
const template = document.querySelector('.card'); // шаблон
const addButton = document.querySelector('.profile__button-add'); //кнопка "+"
const editButton = document.querySelector('.profile__button-edit'); //кнопка "изменить"
const name = document.querySelector('.profile__name'); // первоначальное имя в верстке
const description = document.querySelector('.profile__description'); // первоначальная профессия в верстке
const popup = document.querySelector('.popup'); // popup
const cardTemplate = document.querySelector('#card').content; // Template
const closeButtons = document.querySelectorAll('.popup__close'); // кнопка закрыть всех попапов

//popup edit
const popupEdits = document.querySelector('.popup_type_edit'); // форма popup edit
const formElementEdit = document.forms['form-edit']; // форма в popup edit
const nameInputEdit = formElementEdit.querySelector('.popup__input-name'); // input имя в popup edit
const jobInputEdit = formElementEdit.querySelector('.popup__input-description'); // input профессия в popup edit

//popup add
const popupAdds = document.querySelector('.popup_type_add'); // форма popup add
const formElementAdd = document.forms['form-add']; // форма в popup add
const addTitle = popupAdds.querySelector('.popup__input-name'); // input имя в popup add
const addDescription = popupAdds.querySelector('.popup__input-description'); // input url в popup add

//popup picture
const popupPicture = document.querySelector('.popup_type_picture'); // форма popup picture
const popupImg = popupPicture.querySelector('.popup__img'); //картинка в popup picture
const caption = popupPicture.querySelector('.popup__figure-caption'); //название картинки в popup picture

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

//для каждой проверяемой формы создаем экземпляр класса
const validationEdit = new FormValidator (validateSettings, formElementEdit);
const validationAdd = new FormValidator (validateSettings, formElementAdd);

//включает валидацию форм
validationEdit.enableValidation();
validationAdd.enableValidation();

const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  aboutSelfSelector: '.profile__description'
});

//попап с картинкой
const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

//попап с редактированием профиля
const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit:  (item) => {
    userInfo.setUserInfo(item);
  }}
);
popupEdit.setEventListeners();

editButton.addEventListener( 'click', () => {
  const user = userInfo.getUserInfo();
  nameInputEdit.value = user.name;
  jobInputEdit.value = user.aboutSelf;
  popupEdit.open();
});

//попап с добавленим картинки
const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
}
});
popupAdd.setEventListeners();

addButton.addEventListener('click', () => {
  popupAdd.open();
});

//функция создания новой карточки
function createCard (card) {
  const cardElement = new Card (card, '#card', handleCardClick).generateCard();
  return cardElement;
}

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}}, '.elements');

//отрисовка карточек
cardList.itemsRender();

//функция открытия картинки
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

