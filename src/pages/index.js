import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {
  validateSettings,
  addButton,
  editButton,
  avatarButton,
  formElementEdit,
  nameInputEdit,
  jobInputEdit,
  formElementAdd,
  formElementAvatar
} from "../utils/constants.js";

// переменная для хранения ID пользователя
let userId;

//экземпляр класса Api
const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-64',
  'e707bb6d-10e3-4b12-a702-f21c992d2e8f'
);

//экземпляры класса FormValidator
const validationEdit = new FormValidator(validateSettings, formElementEdit);
const validationAdd = new FormValidator(validateSettings, formElementAdd);
const validationAvatar = new FormValidator(validateSettings, formElementAvatar);

//экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

//экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(".popup_type_picture");

//экземпляры класса PopupWithForm
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: item => {
    popupEdit.loadingSave(true);
    api.createNewProfile(item)
      .then(res => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        popupEdit.loadingSave(false);
      });
  }
});

const popupAvatar = new PopupWithForm ({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (item) => {
    popupAvatar.loadingSave(true);
    api
    .createNewAvatar(item)
    .then(res => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAvatar.loadingSave(false);
    });
  }
});

const popupAdd = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: (item) => {
    popupAdd.loadingSave(true);
    api
    .createNewCard(item)
    .then (card => {
      cardList.addItem(createCard(card));
      popupAdd.close();
    })
    .catch (error => {
      console.log(error);
    })
    .finally(() => {
      popupAdd.loadingSave(false);
    });
  },
});

//экземпляр класса PopupWithConfirmation
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete');

//экземпляры класса Section
const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }},".elements"
);

// API добавление информации при загрузке страницы из сервера
Promise.all([api.getInitialCards(), api.getUser()])
  .then (([cards, user]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(cards);
  })
  .catch ((error) => {
    console.log(error);
  });

//функция создания новой карточки
function createCard(card) {
  const cardElement = new Card(card, userId, "#card", zoomImg,
  id => {
    popupDeleteCard.open();
    popupDeleteCard.changeSubmitHandler(() => {
      api
      .deleteCard(id)
      .then(() => {
        cardElement.deleteCard();
        popupDeleteCard.close();
      })
      .catch ((error) => {
        console.log(error);
      });
    });
  }, likeCard, deleteLikeCard);
  return cardElement.generateCard();
}

//функция открытия картинки
function zoomImg(name, link) {
  popupWithImage.open(name, link);
}

//функция лайка
function likeCard (id, cardElement) {
  api
  .addLike(id)
  .then ((res) => {
    cardElement.toggleLike(res);
  })
  .catch (error => {
    console.log(error);
  });
}

//функция удаления лайка
function deleteLikeCard (id, cardElement) {
  api
  .deleteLike(id)
  .then ((res) => {
    cardElement.toggleLike(res);
  })
  .catch (error => {
    console.log(error);
  });
}

//вкл валидацию форм
validationEdit.enableValidation();
validationAdd.enableValidation();
validationAvatar.enableValidation();

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();

editButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  nameInputEdit.value = user.name;
  jobInputEdit.value = user.about;
  popupEdit.open();
});

addButton.addEventListener("click", () => {
  popupAdd.open();
});

avatarButton.addEventListener ('click', () => {
  popupAvatar.open();
});


