import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validateSettings,
  addButton,
  editButton,
  formElementEdit,
  nameInputEdit,
  jobInputEdit,
  formElementAdd,
} from "../utils/constants.js";

//для каждой проверяемой формы создаем экземпляр класса
const validationEdit = new FormValidator(validateSettings, formElementEdit);
const validationAdd = new FormValidator(validateSettings, formElementAdd);

//включает валидацию форм
validationEdit.enableValidation();
validationAdd.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelfSelector: ".profile__description",
});

//попап с картинкой
const popupWithImage = new PopupWithImage(".popup_type_picture");
popupWithImage.setEventListeners();

//попап с редактированием профиля
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
  },
});
popupEdit.setEventListeners();

editButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  nameInputEdit.value = user.name;
  jobInputEdit.value = user.aboutSelf;
  popupEdit.open();
});

//попап с добавленим картинки
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  },
});
popupAdd.setEventListeners();

addButton.addEventListener("click", () => {
  popupAdd.open();
});

//функция создания новой карточки
function createCard(card) {
  const cardElement = new Card(card, "#card", handleCardClick).generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

//отрисовка карточек
cardList.renderItems();

//функция открытия картинки
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
