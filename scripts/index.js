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

//popup picture
const popupPicture = document.querySelector('.popup_type_picture'); // форма popup picture
const popupImg = popupPicture.querySelector('.popup__img'); //картинка в popup picture
const caption = popupPicture.querySelector('.popup__figure-caption'); //название картинки в popup picture

//функция создания карточек
function getCard (element) {

  const newElement = cardTemplate.querySelector('.element').cloneNode(true);
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
  wrap.prepend(getCard(element));
}

//перебор массива (карточек) и его отрисовка
initialCards.forEach((element) => {
  renderCard(wrapper, element);
});

//функции открытия/закрытия popup's
function openPopup (popup) {
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

// функция удаления карточки
function getDelete (evt) {
  evt.target.closest('.element').remove();
}

 //функция создания лайка
function getLike (evt) {
  evt.target.classList.toggle('element__like_active');
}

//функция появления и заполнения данными popup picture
function getPopopImg (evt) {
  openPopup(popupPicture);
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  caption.innerText = evt.target.alt;
};

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





