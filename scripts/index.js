const editButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__save');

function toggleOpenPopup () {
  popup.classList.toggle('popup_opened');
}

function handleEditButtonClick () {
  toggleOpenPopup ();
}

function handleCloseButtonClick () {
  toggleOpenPopup ();
}

editButton.addEventListener('click', handleEditButtonClick );
closeButton.addEventListener('click', handleCloseButtonClick );

// Находим форму в DOM
let formElement = popup.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input-name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input-description');// Воспользуйтесь инструментом .querySelector()
// Находим элементы в DOM у которых будет меняться значение
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    toggleOpenPopup ();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
saveButton.addEventListener('click', handleFormSubmit );
