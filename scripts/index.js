const initialCards = [
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

const wrapper = document.querySelector('.elements'); //обертка всех карточек
const template = document.getElementById('card'); // шаблон

//функция создания карточек
function getCard (element) {

  const newElement = template.content.cloneNode(true);
  const title = newElement.querySelector('.element__title');
  const img = newElement.querySelector('.element__img');

  const likeButton = newElement.querySelector('.element__like');
  const deleteButton = newElement.querySelector('.element__delete');

  title.textContent = element.name;
  img.src = element.link;
  img.alt = element.name;

  img.addEventListener ('click', getPopopImg); // popup img

  likeButton.addEventListener('click', getLike); // like

  deleteButton.addEventListener('click', getDelete); // delete

  return newElement;
}

//отрисовка карточек
function renderCard (wrap, element) {
  wrap.append(getCard(element));
}

//перебор массива (карточек) и его отрисовка
initialCards.forEach((element) => {
  renderCard(wrapper, element);
});


const addButton = document.querySelector('.profile__button-add'); //кнопка "+"
const editButton = document.querySelector('.profile__button-edit'); //кнопка "изменить"
const name = document.querySelector('.profile__name'); // первоначальное имя в верстке
const description = document.querySelector('.profile__description'); // первоначальная профессия в верстке

//popup edit
const popupEdit = document.querySelector('.popup_type_edit'); // форма popup edit
const closeButtonEdit = popupEdit.querySelector('.popup__close'); //кнопка закрыть в popup edit
const formElementEdit = popupEdit.querySelector('.popup__form'); // форма в popup edit
const nameInputEdit = formElementEdit.querySelector('.popup__input-name'); // input имя в popup edit
const jobInputEdit = formElementEdit.querySelector('.popup__input-description'); // input профессия в popup edit

//popup add
const popupAdd = document.querySelector('.popup_type_add'); // форма popup add
const formElementAdd = popupAdd.querySelector('.popup__form'); // форма в popup add
const closeButtonAdd = popupAdd.querySelector('.popup__close'); //кнопка закрыть в popup add
const addTitle = popupAdd.querySelector('.popup__input-name'); // input имя в popup add
const addDescription = popupAdd.querySelector('.popup__input-description'); // input url в popup add

//popup picture
const popupPicture = document.querySelector('.popup_type_picture'); // форма popup picture
const closeButtonPicture = popupPicture.querySelector('.popup__close'); //кнопка закрыть в popup picture
const popupImg = popupPicture.querySelector('.popup__img'); //картинка в popup picture
const caption = popupPicture.querySelector('.popup__figure-caption'); //название картинки в popup picture

//функции открытия/закрытия popup's
function toggleOpenPopupEdit () {
  popupEdit.classList.toggle('popup_opened');
}

function toggleOpenPopupPicture () {
  popupPicture.classList.toggle('popup_opened');
}

//при открытии/закрытии popup add очищает поля
function toggleOpenPopupAdd () {
  popupAdd.classList.toggle('popup_opened');
  addTitle.value = '';
  addDescription.value = '';
}

//функция присваивания названия имени и профессии в верстке и popup edit
function handleEditButtonClick () {
  toggleOpenPopupEdit ();
  jobInputEdit.value = description.innerText;
  nameInputEdit.value = name.innerText;
}

//функция изменения названия имени и профессии в верстке и popup edit
function handleFormSubmit (evt) {
  evt.preventDefault();
  name.textContent = nameInputEdit.value;
  description.textContent = jobInputEdit.value;
  toggleOpenPopupEdit ();
}

//добавление первой карточки
function prependRenderCard (wrap, element) {
  wrap.prepend(getCard(element));
}

//удаление последнего объекта (карточки) в массиве
function deleteLastCard () {
  const card = document.querySelectorAll('.element');
  card[card.length-1].remove();
}

// функция удаления карточки
function getDelete (evt) {
  evt.target.closest('.element').remove();
}

 //функция создания лайка
function getLike () {
  event.target.classList.toggle('element__like_active');
}

//функция появления и заполнения данными popup picture
function getPopopImg () {
  toggleOpenPopupPicture();
  popupImg.src = event.target.src;
  popupImg.alt = event.target.alt;
  caption.innerText = event.target.alt;
};

// добавление первой и удаление последней карточки
formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  initialCards.unshift ({name:addTitle.value, link:addDescription.value});
  toggleOpenPopupAdd ();
  prependRenderCard(wrapper, initialCards[0]);
  deleteLastCard();
  });

//слушатели
editButton.addEventListener('click', handleEditButtonClick );
addButton.addEventListener('click', toggleOpenPopupAdd);

closeButtonEdit.addEventListener('click', toggleOpenPopupEdit);
closeButtonAdd.addEventListener('click', toggleOpenPopupAdd);
closeButtonPicture.addEventListener('click', toggleOpenPopupPicture);

formElementEdit.addEventListener('submit', handleFormSubmit);






