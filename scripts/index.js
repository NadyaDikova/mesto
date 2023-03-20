import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const popupEdit = document.querySelector('.popup_type_edit'); // форма popup edit
const formElementEdit = popupEdit.querySelector('.popup__form'); // форма в popup edit
const nameInputEdit = formElementEdit.querySelector('.popup__input-name'); // input имя в popup edit
const jobInputEdit = formElementEdit.querySelector('.popup__input-description'); // input профессия в popup edit

//popup add
const popupAdd = document.querySelector('.popup_type_add'); // форма popup add
const formElementAdd = popupAdd.querySelector('.popup__form'); // форма в popup add
const addTitle = popupAdd.querySelector('.popup__input-name'); // input имя в popup add
const addDescription = popupAdd.querySelector('.popup__input-description'); // input url в popup add

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

//функции открытия/закрытия popup's
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", handleEscClick);
  popup.addEventListener("mousedown", handleOverlyClick);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", handleEscClick);
  popup.removeEventListener("mousedown", handleOverlyClick);
}

//функция присваивания названия имени и профессии в верстке и popup edit
function handleEditButtonClick () {
  openPopup(popupEdit);
  jobInputEdit.value = description.innerText;
  nameInputEdit.value = name.innerText;
}

//функция изменения названия имени и профессии в верстке и popup edit
function handleFormEdit (evt) {
  evt.preventDefault();
  name.textContent = nameInputEdit.value;
  description.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

//функция создания новой карточки
function getCard (card) {
  const newCard = new Card (card, '#card').generateCard();
  return newCard;
}

// функция добавления новой карточки и сброс формы до изначального состояния
function getNewCard (evt) {
  evt.preventDefault();
  const card = getCard({name:addTitle.value, link:addDescription.value});
  wrapper.prepend(card);
  closePopup(popupAdd);
  formElementAdd.reset();
}

//функция закрытия попапа при клике на оверлей
function handleOverlyClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
}
}

//функция закрытия попапа при esc
function handleEscClick(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    return closePopup(popupOpened);
  }
}

//перебор кнопки "крестик" всех попапов и создание обработчиков закрытия на каждый
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//слушатели-обработчики
editButton.addEventListener('click', handleEditButtonClick );
addButton.addEventListener('click', function () {openPopup(popupAdd);});

formElementEdit.addEventListener('submit', handleFormEdit);
formElementAdd.addEventListener('submit', getNewCard);





